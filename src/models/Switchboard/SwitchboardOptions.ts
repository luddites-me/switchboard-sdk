/**
 * Thin convenience class for defining the settings that need to be configurable for platform-specific switchboard definitions
 */
export class SwitchboardOptions {
  constructor(partial?: Partial<SwitchboardOptions>) {
    Object.assign(this, partial || {});
  }
  public id: string;
  public version: string;
  public repoName: string;
}