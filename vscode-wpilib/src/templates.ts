'use strict';
import * as fs from 'fs';
import * as jsonc from 'jsonc-parser';
import * as path from 'path';
import * as vscode from 'vscode';
import { IExampleTemplateAPI, IExampleTemplateCreator } from 'vscode-wpilibapi';
import { logger } from './logger';
import { generateCopyCpp, generateCopyJava } from './shared/generator';

export interface ITemplateJsonLayout {
  name: string;
  description: string;
  tags: string[];
  foldername: string;
  gradlebase: string;
}

export class Templates {
  private readonly exampleResourceName = 'templates.json';

  constructor(resourceRoot: string, java: boolean, core: IExampleTemplateAPI) {
    const templatesFolder = path.join(resourceRoot, 'src', 'templates');
    const resourceFile = path.join(templatesFolder, this.exampleResourceName);
    const gradleBasePath = path.join(path.dirname(resourceRoot), 'gradle');
    fs.readFile(resourceFile, 'utf8', (err, data) => {
      if (err) {
        logger.log(JSON.stringify(err, null, 4));
        return;
      }
      const templates: ITemplateJsonLayout[] = jsonc.parse(data) as ITemplateJsonLayout[];
      for (const e of templates) {
        const provider: IExampleTemplateCreator = {
          getLanguage(): string {
            return java ? 'java' : 'cpp';
          },
          getDescription(): string {
            return e.description;
          },
          getDisplayName(): string {
            return e.name;
          },
          async generate(folderInto: vscode.Uri): Promise<boolean> {
            try {
              if (java) {
                if (!await generateCopyJava(path.join(templatesFolder, e.foldername),
                  path.join(gradleBasePath, e.gradlebase), folderInto.fsPath, 'frc.robot.Robot', path.join('frc', 'robot'))) {
                  await vscode.window.showErrorMessage('Cannot create into non empty folder');
                  return false;
                }
              } else {
                if (!await generateCopyCpp(path.join(templatesFolder, e.foldername),
                  path.join(gradleBasePath, e.gradlebase), folderInto.fsPath, false)) {
                  await vscode.window.showErrorMessage('Cannot create into non empty folder');
                  return false;
                }
              }
            } catch (err) {
              logger.log(JSON.stringify(err, null, 4));
              return false;
            }
            return true;
          },
        };
        core.addTemplateProvider(provider);
      }
    });
  }

  // tslint:disable-next-line:no-empty
  public dispose() {

  }
}
