import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { loadEnv } from '@ns8/protect-tools-js';
import { slsDeploy } from './slsDeploy';

const env = loadEnv();

const awsServiceName = env.AWS_SERVICE_NAME;
if (!awsServiceName) throw new Error(`A valid environment variable value for "AWS_SERVICE_NAME" must be set. "${awsServiceName}" is not valid.`);

const commonYmlPath = env.AWS_SERVERLESS_YML || 'node_modules/@ns8/protect-sdk-switchboard/serverless.common.yml';
const deployYmlPath = path.relative(process.cwd(), 'sls.deploy.yml');

let serverlessYml = `service: '${awsServiceName}'\r\n`;
const commonYml = readFileSync(commonYmlPath, 'utf8');
serverlessYml += commonYml;
writeFileSync(deployYmlPath, serverlessYml);

slsDeploy(`--config sls.deploy.yml`);
