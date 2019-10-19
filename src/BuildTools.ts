import * as sortJson from 'sort-json';
import glob from 'glob';

/**
 * Collection of utilities for use in the build of a project
 */
export class BuildTools {
  /**
   * Sorts all properties of JSON files by key
   */
  public static sortJsonFiles = (): void => {

    const globOptions: any = {
      ignore: '**/node_modules/**',
      realPath: true
    }

    glob('**/*.json', globOptions, (er, files: string[]) => {
      if (er) {
        console.error(er);
      }
      files.forEach((fileName, index: number) => {
        try {
          sortJson.overwrite(fileName);
        } catch (err) {
          console.error(err);
        }
      })
    })
  }
}