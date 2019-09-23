
import { readFileSync, writeFileSync } from 'fs';
import { Serverless } from '..';
const YAML = require('yamljs');

/**
 * A collection of utility methods to work with generating/updating the serverless.yaml file required for AWS
 */
export class ServerlessTools {

  /**
   * Converts an instance of the Serverless object to YAML
   */
  static serverlessToYaml = (serverless: Serverless): string => {
    return YAML.stringify(serverless);
  }

  /**
   * Converts a JSON file from disk into an instance of a Serverless object
   */
  static jsonToServerless = (path: string): Serverless => {
    var json = JSON.parse(readFileSync(path, 'utf8'));
    return json as Serverless;
  }

  /**
   * Converts a JSON file from disk into a YAML string
   */
  static jsonToYaml = (path: string): string => {
    const yaml = ServerlessTools.serverlessToYaml(ServerlessTools.jsonToServerless(path));
    return yaml;
  }

  /**
   * Writes an instance of the Serverless object to disk
   */
  static writeYaml = (serverless: Serverless, path: string): void => {
    writeFileSync(path, serverless);
  }

  static getDefaults = (): Serverless => {
    return ServerlessTools.jsonToServerless('../models/json/serverless.json');
  }
}