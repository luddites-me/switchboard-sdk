import { Switchboard, Source, Switch } from 'ns8-switchboard-interfaces';
import operatorModule from '@ns8/ns8-switchboard-operator';

const instantiateHandler = (switchboard: Switchboard, name: string) => {
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

export {
    instantiateHandler
};
