const { isString } = require('lodash');
const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const logger = require('node-color-log');
const { ROOT, OUTPUT, types, getFileEntryByRelativePath } = require('./helpers.cjs');

module.exports = (env) => {
  if (isString(env.type) && types.selectByProperty('dashed', env.type) === false) {
    logger.error(
      `Parameter "env.type" can have only one of thees values: "${types.CE.dashed}", "${types.WC.dashed}"`
    );
    process.exit(5);
  }

  const source = env.source || types.selected.source;
  const suffix = types.selected ? types.selected.dashed : '';

  const ENTRIES = Object.fromEntries(
    glob
      .sync(`src/${source}/*.ts`, {
        dot: true,
        ignore: ['**/*.d.ts', '**/__*__/**']
      })
      .map((relative) => getFileEntryByRelativePath(relative, suffix))
  );

  return {
    mode: env.mode || 'development',
    entry: ENTRIES,
    target: 'web',
    devtool: false,
    stats: 'verbose',
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
};
