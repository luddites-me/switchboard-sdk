import minimist from 'minimist';
import sortJson from 'sort-json';
import glob from 'glob';

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