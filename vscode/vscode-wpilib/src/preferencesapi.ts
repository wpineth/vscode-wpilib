'use strict';
import { IPreferencesAPI, IPreferencesChangedPair, IPreferences } from './shared/externalapi';
import * as vscode from 'vscode';
import { Preferences } from './preferences';

export class PreferencesAPI extends IPreferencesAPI {
  private preferences: Preferences[] = [];
  private preferencesEmitter: vscode.EventEmitter<IPreferencesChangedPair[]> = new vscode.EventEmitter<IPreferencesChangedPair[]>();
  private disposables: vscode.Disposable[] = [];
  public onDidPreferencesFolderChanged: vscode.Event<IPreferencesChangedPair[]>;


  constructor() {
    super();
    this.onDidPreferencesFolderChanged = this.preferencesEmitter.event;

    const workspaces = vscode.workspace.workspaceFolders;
    if (workspaces !== undefined) {
      for (const w of workspaces) {
        this.preferences.push(new Preferences(w));
      }
    }
    this.disposables.push(this.preferencesEmitter);

    this.disposables.push(vscode.workspace.onDidChangeWorkspaceFolders(() => {
      // Nuke and reset
      // TODO: Remove existing preferences from the extension context
      for (const p of this.preferences) {
        p.dispose();
      }

      const wp = vscode.workspace.workspaceFolders;

      if (wp === undefined) {
        return;
      }

      const pairArr: IPreferencesChangedPair[] = [];
      this.preferences = [];

      for (const w of wp) {
        const p = new Preferences(w);
        this.preferences.push(p);
        const pair: IPreferencesChangedPair = {
          workspace: w,
          preference: p
        };
        pairArr.push(pair);
      }

      this.preferencesEmitter.fire(pairArr);

      this.disposables.push(...this.preferences);
    }));
    this.disposables.push(...this.preferences);

  }

  public getPreferences(workspace: vscode.WorkspaceFolder): IPreferences | undefined {
    for (const p of this.preferences) {
      if (p.workspace.uri === workspace.uri) {
        return p;
      }
    }
    return undefined;
  }

  public async getFirstOrSelectedWorkspace(): Promise<vscode.WorkspaceFolder | undefined> {
    const wp = vscode.workspace.workspaceFolders;
    if (wp === undefined) {
      return undefined;
    }

    if (wp.length > 1) {
      const res = await vscode.window.showWorkspaceFolderPick();
      if (res !== undefined) {
        return res;
      }
      return undefined;
    } else if (wp.length === 1) {
      return wp[0];
    } else {
      return undefined;
    }
  }

  public dispose() {
    for (const d of this.disposables) {
      d.dispose();
    }
  }
}
