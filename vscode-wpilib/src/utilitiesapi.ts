'use strict';

import * as os from 'os';
import * as path from 'path';
import { IUtilitiesAPI } from 'vscode-wpilibapi';
import { getIsWindows } from './utilities';

export class UtilitiesAPI implements IUtilitiesAPI {
  private wpilibHome: string | undefined;

  public getFrcYear(): string {
    return '2019';
  }
  public getWPILibHomeDir(): string {
    if (this.wpilibHome) {
      return this.wpilibHome;
    }
    const year = this.getFrcYear();
    if (getIsWindows()) {
      let publicFolder = process.env.PUBLIC;
      if (!publicFolder) {
        publicFolder = 'C:\\Users\\Public';
      }
      this.wpilibHome = path.join(publicFolder, `frc${year}`);
    } else {
      const dir = os.homedir();
      this.wpilibHome = path.join(dir, `frc${year}`);
    }
    return this.wpilibHome;
  }
}
