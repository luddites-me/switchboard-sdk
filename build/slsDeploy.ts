/* eslint-disable no-console */
import { execSync } from 'child_process';
import { loadEnv } from '@ns8/protect-tools-js';
import { Environment, Method } from './deployEnums';
const prompts = require('prompts');

/**
 * Executes a deploy or undeploy to AWS
 * @param params Optional list of command line params to add to the deploy
 */
export const slsDeploy = async (params?: string): Promise<void> => {

  const env = loadEnv();

  // Get any command line arguments that might have been passed
  const args = process.argv.slice(2);

  // Define the stage
  let stage: string | Environment | undefined;

  // If we passed in a stage, use it and ignore the environment variables
  const stageArg = args?.find((a) => a.startsWith('--stage='));
  if (stageArg) {
    stage = stageArg.split('=')?.[1];
  }

  // If CircleCI asks for prod, map it correctly
  if (stage?.toLowerCase().startsWith(Environment.PROD) && process.env.CI) {
    stage = Environment.PROD;
  }

  // If we don't yet have a stage, get it from our environment variables
  // If the env variables specify PROD, ignore them
  if(!stage) {
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
    let confirmMessage = `You are about to run ${method} against stage '${stage}'. Are you sure? Y/n`;
    if (stage === Environment.PROD) {
      confirmMessage = `You are about to run ${method} against PRODUCTION! Are you sure? Y/n`;
    }
    const confirm = await prompts({
      type: 'confirm',
      name: 'yesno',
      message: confirmMessage,
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
