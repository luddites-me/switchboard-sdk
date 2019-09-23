const util = require('util');
const exec = util.promisify(require('child_process').exec);

const logAndExit = (error): void => {
  console.error(error);
  process.exit(1);
};

const installModules = async (switchboard): Promise<void> => {
  for (const module of switchboard.modules) {
    if (module.version === 'link') {
      const dependency = module.name;
      console.log(`running yarn link ${dependency}`);
      await exec(`yarn link ${dependency}`).catch(logAndExit);
    } else {
      const dependency = module.name + "@" + module.version;
      console.log(`running yarn add ${dependency}`);
      await exec(`yarn add ${dependency}`).catch(logAndExit);
    }
  }
};

export {
  installModules
}