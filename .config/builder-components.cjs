const path = require('path');
const glob = require('glob');
const { kebabCase } = require('lodash');
const TerserPlugin = require('terser-webpack-plugin');

const ROOT = process.cwd();
const OUTPUT = path.resolve(ROOT, 'esm');

const ENTRIES = Object.fromEntries(
  glob
    .sync('src/**/*.ts', {
      dot: true,
      ignore: ['**/*.d.ts', '**/__*__/**']
    })
    .map((relative) => {
      const file = path.resolve(ROOT, relative);
      const fileProps = path.parse(relative.replace('src/', ''));

      let name = kebabCase(fileProps.name);
      if (fileProps.dir !== 'lib') {
        name += '-' + kebabCase(fileProps.dir);
      }

      return [name, file];
    })
);

module.exports = {
  mode: 'development',
  entry: ENTRIES,
  target: 'web',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json'
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          exportType: 'css-style-sheet',
          modules: {
            mode: 'global',
            exportGlobals: true
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@uikit': path.resolve(ROOT, 'node_modules/@bpanchenko/uikit/assets')
    },
    extensions: ['.ts']
  },
  output: {
    clean: true,
    filename: '[name].mjs',
    path: OUTPUT
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {}
      })
    ],
    usedExports: true
  }
};
