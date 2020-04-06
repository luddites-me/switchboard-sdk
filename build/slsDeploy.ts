/* eslint-disable no-console */
import { execSync } from 'child_process';
import { loadEnv } from '@ns8/protect-tools-js';
import { Environment, Method } from './deployEnums';

/**
 * Executes a deploy or undeploy to AWS
 * @param params Optional list of command line params to add to the deploy
 */
export const slsDeploy = (params?: string): void => {

  const env = loadEnv();

  let stage: string | Environment = Environment.TEST;
  if (env.NODE_ENV?.toLowerCase().startsWith(Environment.PROD)) {
    stage = Environment.PROD;
  } else if (env.NODE_ENV?.toLowerCase().startsWith(Environment.TEST)) {
    stage = Environment.TEST;
  } else if (env.DEV_SUFFIX) {
    stage = env.DEV_SUFFIX;
  } else {
    stage = Environment.DEV;
  }

  const method = (env.METHOD || Method.DEPLOY).trim().toLowerCase();
  if (method !== Method.DEPLOY && method !== Method.REMOVE) throw new Error(`Method ${method} is not supported`);

  let command = `sls ${method} --stage=${stage}`;
  if (params) {
    command += ` ${params}`;
  }
  const cwd = `${process.cwd()}`;
  console.info(`Running ${command} in ${cwd}`);

  try {
    execSync(command, { cwd, stdio: 'inherit' });
  } catch (error) {
    console.error(error);
    console.info(env);
  }
};
