import {
  BundleMode,
  BundleTarget,
  getWebpackConfig
} from '@ns8/protect-tools-bundle';

const config = getWebpackConfig({
  bundleTarget: BundleTarget.NODE,
  distDirectory: './dist',
  sourceDirectory: './src',
  libraryName: 'switchboard-sdk',
});



export default config;
