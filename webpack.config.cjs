const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

const ROOT = process.cwd();
const OUTPUT = path.resolve(ROOT, 'esm');

const FILES = glob
  .sync('src/**/*.ts', {
    dot: true
  })
  .map((file) => path.resolve(ROOT, file));

module.exports = {
  mode: 'production',
  context: path.resolve(ROOT, 'src'),
  entry: FILES,
  target: 'web',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            options: {
              esModule: true,
              modules: {
                namedExport: true
              }
            }
          }
        ]
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {}
      })
    ],
    usedExports: true
  }
};
