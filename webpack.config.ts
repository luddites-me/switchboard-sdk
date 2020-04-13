import {
  BundleMode,
  BundleTarget,
  getWebpackConfig
} from '@ns8/protect-tools-bundle';

const config = getWebpackConfig({
  bundleTarget: BundleTarget.NODE,
  distDirectory: './dist',
  fileName: 'index.js',
  libraryName: 'index',
  sourceDirectory: './src',
});



export default config;
