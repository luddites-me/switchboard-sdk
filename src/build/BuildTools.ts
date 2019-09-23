const minimist = require('minimist');
const sortJson = require('sort-json');
const glob = require('glob');

const args = minimist(process.argv.slice(2));
const { env } = args;

const globOptions: any = {
  ignore: '**/node_modules/**',
  realPath: true
}

/**
 * Collection of utilities for use in the build of a project
 */
export class BuildTools {
  public static runTasks = (callback: (env: string) => void): void => {
    callback(env);
  };

  public static sortJsonFiles = (): void => {
    glob('**/*.json', globOptions, (er, files) => {
      if (er) {
        console.error(er);
      }
      files.forEach((fileName, index) => {
        try {
          sortJson.overwrite(fileName);
        } catch (err) {
          console.error(err);
        }
      });
    });
  };
}