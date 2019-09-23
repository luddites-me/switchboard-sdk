import { Switchboard, Switch } from 'ns8-switchboard-interfaces';
import { readFileSync, writeFileSync } from 'fs';
import { SwitchboardOptions } from '.';

export class SwitchboardTools {

  /**
   * Converts a JSON file from disk into an instance of a Serverless object
   */
  static jsonToSwitchboard = (path: string): Switchboard => {
    var json = JSON.parse(readFileSync(path, 'utf8'));
    return json as Switchboard;
  }

  /**
   * Writes an instance of the Serverless object to disk
   */
  static writeJson = (switchboard: Switchboard, path: string): void => {
    writeFileSync(path, switchboard);
  }

  static getDefaults = (): Switchboard => {
    return SwitchboardTools.jsonToSwitchboard('../models/json/switchboard.json');
  }

  static setIntegration = (switchboard: Switchboard, opts: SwitchboardOptions): Switchboard => {
    switchboard.id = opts.id;
    switchboard.modules[0].name = opts.repoName;
    switchboard.modules[0].version = opts.version;
    switchboard.switches.forEach((s) => {
      s.sources.forEach((src) => {
        src.moduleName = opts.repoName;
      });
    });
    return switchboard;
  }
}
