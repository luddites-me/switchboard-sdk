/* eslint-disable
  @typescript-eslint/no-var-requires,
  import/extensions,
  import/no-unresolved,
  no-console,
*/
import { ReleaseType, inc } from 'semver';
import { writeFileSync } from 'fs';
import { env } from './loadEnv';
import rootPackage from '../package.json';

/**
 * Increments all of the project's version numbers according to semver patch rules.
 * If `DEV_SUFFIX` defined on the env and if the `PATCH_MODE` is "dev", we can incrementally patch by suffix
 * e.g. `2.0.1` would increment to `2.0.2-abc.0`
 * `2.0.2-abc.0` would increment to `2.0.2-abc.1`
 */
const incrementVersion = (): void => {
  const devSuffix: string = process.env.DEV_SUFFIX ? process.env.DEV_SUFFIX.trim().toLowerCase() : 'none';
  const patchMode: string = process.env.PATCH_MODE ? process.env.PATCH_MODE.trim().toLowerCase() : 'patch';
  const releaseType: ReleaseType = devSuffix !== 'none' && patchMode === 'dev' ? 'prerelease' : 'patch';
  const currentVersion: string = rootPackage.version;
  const nextPackageVersion: string | undefined = inc(currentVersion, releaseType, false, devSuffix);
  if (!nextPackageVersion) throw new Error('Could not increment package version');
  // This is a temporary workaround for working with prerelease versions in order to comply with the Magento version standards
  const nextMagentoVersion: string | undefined = inc(currentVersion, 'patch', false);
  if (!nextMagentoVersion) throw new Error('Could not increment magento version');

  rootPackage.version = nextPackageVersion;
  writeFileSync('package.json', JSON.stringify(rootPackage, undefined, 2));
  console.log(`Updated project ${currentVersion} to ${nextPackageVersion}`);
};

try {
  incrementVersion();
} catch (error) {
  console.error(error);
  console.info(env);
}
