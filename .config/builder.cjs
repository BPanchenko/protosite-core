const { ROOT, OUTPUT, types, getFileEntryByRelativePath } = require('./helpers.cjs');

const { isString } = require('lodash');
const glob = require('glob');
const logger = require('node-color-log');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  if (isString(env.type) && types.selectByProperty('dashed', env.type) === false) {
    logger.error(
      `Parameter "env.type" can have only one of thees values: "${types.CE.dashed}", "${types.WC.dashed}"`
    );
    process.exit(5);
  }

  const type = Object.assign({}, types.selected);

  const source = env.source || type.source;
  const suffix = type.dashed || '';

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
    plugins: [
      new webpack.DefinePlugin({
        USE_SHADOW_DOM: Boolean(type.useShadowDOM)
      })
    ],
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
