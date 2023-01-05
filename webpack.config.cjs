const path = require('path');
const glob = require('glob');
const ESLintPlugin = require('eslint-webpack-plugin');
const tsConfig = require('./tsconfig.json');

const files = glob.sync(tsConfig.include[0], {
  dot: true,
  ignore: tsConfig.exclude[0],
}).map(file => path.resolve(__dirname, file));

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
    	loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
	clean: true,
    filename: '[name].mjs',
    path: path.resolve(__dirname, 'assets'),
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
	new ESLintPlugin({
		files
	})
  ],
};


