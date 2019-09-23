import { Switchboard, Source, Switch } from 'ns8-switchboard-interfaces';
import operatorModule from '@ns8/ns8-switchboard-operator';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * A collection of utility methods for initializing the modules in a switchboard project
 */
export class SwitchboardInit {

  /**
   *
   */
  public static instantiateHandler = (switchboard: Switchboard, name: string) => {
    const switchboardSwitch: Switch = switchboard.switches
      .find((currSwitch: Switch) => currSwitch.name === name);

    const switches = switchboardSwitch.sources
      .map((source: Source) => {
        const module = require(source.moduleName);
        return new module[source.fileName]();
      });

    const operator = new operatorModule[switchboardSwitch.operator](switches);
    return operator.handle;
  };

  private static logAndExit = (error): void => {
    console.error(error);
    process.exit(1);
  };

  /**
   * Dynamically install modules
   */
  public static installModules = async (switchboard: Switchboard): Promise<void> => {
    for (const mdl of switchboard.modules) {
      if (mdl.version === 'link') {
        const dependency = mdl.name;
        console.log(`running yarn link ${dependency}`);
        await exec(`yarn link ${dependency}`).catch(SwitchboardInit.logAndExit);
      } else {
        const dependency = mdl.name + "@" + mdl.version;
        console.log(`running yarn add ${dependency}`);
        await exec(`yarn add ${dependency}`).catch(SwitchboardInit.logAndExit);
      }
    }
  };
}