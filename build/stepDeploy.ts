#!/usr/bin/env node
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { loadEnv } from '@luddites-me/ts-tools';
import { slsDeploy } from './slsDeploy';

const env = loadEnv();

const awsServiceName = env.AWS_SERVICE_NAME;
if (!awsServiceName)
  throw new Error(
    `A valid environment variable value for "AWS_SERVICE_NAME" must be set. "${awsServiceName}" is not valid.`
  );

const platformYmlPath =
  env.AWS_SERVERLESS_YML ||
  'node_modules/@luddites-me/protect-sdk-switchboard/serverless.platform.yml';
const deployYmlPath = path.relative(process.cwd(), 'sls.deploy.yml');

let serverlessYml = `service: '${awsServiceName}'\r\n`;
const platformYml = readFileSync(platformYmlPath, 'utf8');
serverlessYml += platformYml;
writeFileSync(deployYmlPath, serverlessYml);

slsDeploy('--config sls.deploy.yml');
