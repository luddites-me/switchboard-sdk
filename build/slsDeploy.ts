/* eslint-disable
  no-console,
  sonarjs/cognitive-complexity,
*/
import { execSync } from 'child_process';
import { loadEnv } from '@luddites-me/ts-tools';
import { Environment, Method } from './deployEnums';

const prompts = require('prompts');

/**
 * Executes a deploy or undeploy to AWS
 * @param params Optional list of command line params to add to the deploy
 * @internal
 */
export const slsDeploy = async (params?: string): Promise<void> => {
  const env = loadEnv();

  // Get any command line arguments that might have been passed
  const args = process.argv.slice(2);

  // Define the stage
  let stage: string | Environment | undefined;

  // If we passed in a stage, use it and attempt to ignore the environment variables
  const stageArg = args?.find((a) => a.startsWith('--stage='));
  if (stageArg) {
    stage = stageArg.split('=')?.[1];
  }

  if (stage?.toLowerCase().startsWith(Environment.PROD)) {
    // If CircleCI asks for prod, map it correctly
    if (process.env.CI) {
      stage = Environment.PROD;
    } else {
      stage = undefined;
      console.log('Attempted to deploy to prod outside of CI. Ignoring `stage` param.');
    }
  }

  // If we don't yet have a stage, get it from our environment variables
  if (!stage) {
    if (env.DEV_SUFFIX) {
      stage = env.DEV_SUFFIX;
    } else if (env.NODE_ENV?.toLowerCase().startsWith(Environment.TEST)) {
      stage = Environment.TEST;
    } else {
      stage = Environment.DEV;
    }
  }

  const method = (env.METHOD || Method.DEPLOY).trim().toLowerCase();
  if (method !== Method.DEPLOY && method !== Method.REMOVE) throw new Error(`Method ${method} is not supported`);

  const processCommand = () => {
    let ciInfo = '';
    if (process.env.CI) {
      ciInfo = ' through CircleCI.';
    }
    let command = `sls ${method} --stage=${stage}`;
    if (params) {
      command += ` ${params}`;
    }
    const cwd = `${process.cwd()}`;
    console.info(`Running ${command} in ${cwd}${ciInfo}`);

    try {
      execSync(command, { cwd, stdio: 'inherit' });
    } catch (error) {
      console.error(error);
      console.info(env);
    }
  };

  // If we're not in CI, allow the user to confirm before they deploy
  if (!process.env.CI) {
    const confirm = await prompts({
      type: 'confirm',
      name: 'yesno',
      message: `You are about to run ${method} against stage '${stage}'. Are you sure? Y/n`,
    });
    if (confirm.yesno) {
      processCommand();
    } else {
      console.log('User cancelled operation');
    }
  } else {
    processCommand();
  }
};
