const minimist = require('minimist');
const sortJson = require('sort-json');
const glob = require('glob');

const args = minimist(process.argv.slice(2));
const { env } = args;

const runTasks = (callback: (env: string) => void): void => {
  callback(env);
};
const globOptions: any = {
  ignore: '**/node_modules/**',
  realPath: true
}
const sortJsonFiles = (): void => {
  glob('**/*.json', globOptions, (er, files) => {
    if (er) {
      console.error(er);
    }
    files.forEach((fileName, index) => {
      console.log(fileName);
      try {
        sortJson.overwrite(fileName);
      } catch (err) {
        console.error(err);
      }
    });

  });
};

export {
  runTasks, sortJsonFiles
}