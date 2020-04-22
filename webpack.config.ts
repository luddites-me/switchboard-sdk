import {
  BundleMode,
  BundleTarget,
  getWebpackConfig
} from '@ns8/protect-tools-js';

const config = getWebpackConfig({
  devtool: 'inline-source-map',
  bundleTarget: BundleTarget.NODE,
  distDirectory: './dist',
  fileName: 'index.js',
  // Globals hack to address https://github.com/node-formidable/formidable/issues/337#issuecomment-183388869
  globals: [{ name: 'GENTLY', value: false }],
  libraryName: 'index',
  mode: BundleMode.DEVELOPMENT,
  sourceDirectory: './.tmp',
});

export default config;
