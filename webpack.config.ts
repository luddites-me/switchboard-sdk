import {
  BundleMode,
  BundleTarget,
  getWebpackConfig
} from '@ns8/protect-tools-bundle';

const config = getWebpackConfig({
  bundleTarget: BundleTarget.NODE,
  distDirectory: './dist',
    // Globals hack to address https://github.com/node-formidable/formidable/issues/337#issuecomment-183388869
  globals: [{ name: 'GENTLY', value: false }],
  libraryName: 'index',
  mode: BundleMode.DEVELOPMENT,
  sourceDirectory: './src',
});



export default config;
