const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

const files = glob
  .sync('**/*.ts', {
    dot: true,
    ignore: 'node_modules/**/*.ts'
  })
  .map((file) => path.resolve(__dirname, file));

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '.'),
  entry: files,
  target: 'web',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.mjs', '.json']
  },
  output: {
    clean: true,
    filename: '[name].mjs',
    path: path.resolve(__dirname, 'assets')
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
