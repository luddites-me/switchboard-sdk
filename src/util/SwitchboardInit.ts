import { Switchboard, Source, Switch } from 'ns8-switchboard-interfaces';
import operatorModule from '@ns8/ns8-switchboard-operator';
import { Logger } from '.';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * A collection of utility methods for initializing the modules in a switchboard project
 */
export class SwitchboardInit {

  /**
   * Dynamically instantiates the handler for a switch function
   */
  public static instantiateHandler = (switchboard: Switchboard, name: string) => {
    const switchboardSwitch: Switch | null = switchboard.switches
      .find((currSwitch: Switch) => currSwitch.name === name) || null;

    if (null == switchboardSwitch) throw new Error(`No switch found for ${name}`);

    if (null == switchboardSwitch.sources) throw new Error('No sources defined on Switchboard');

    const switches = switchboardSwitch.sources
      .map((source: Source) => {
        const module = require(source.moduleName);
        return new module[source.fileName]();
      });

    if (null == switchboardSwitch.operator) throw new Error('No operator defined on Switchboard');

    const operator = new operatorModule[switchboardSwitch.operator](switches);
    return operator.handle;
  };

  private static logAndExit = (error): void => {
    Logger.error('Failed', error);
    process.exit(1);
  };

  /**
   * Dynamically install modules
   */
  public static installModules = async (switchboard: Switchboard): Promise<void> => {
    if (null == switchboard.modules) throw new Error('No modules defined on Switchboard');

    for (const mdl of switchboard.modules) {
      if (mdl.version === 'link') {
        const dependency = mdl.name;
        Logger.log(`running yarn link ${dependency}`);
        await exec(`yarn link ${dependency}`).catch(SwitchboardInit.logAndExit);
      } else {
        const dependency = mdl.name + "@" + mdl.version;
        Logger.log(`running yarn add ${dependency}`);
        await exec(`yarn add ${dependency}`).catch(SwitchboardInit.logAndExit);
      }
    }
  };
}