const { dtsPlugin } = require('esbuild-plugin-d.ts')
const { pugCompiler } = require('./plugin.pug-compiler.cjs')
const { postcssPlugin } = require('./plugin.postcss.cjs')

module.exports = {
    bundle: true,
    color: true,
    entryNames: '[name]',
    entryPoints: [{
        in: 'source/index.ts',
        out: 'index'
    }, {
        in: 'source/component/Avatar/index.ts',
        out: 'component.avatar'
    }, {
        in: 'source/component/Select/index.ts',
        out: 'component.select'
    }, {
        in: 'source/element/Arrow/index.ts',
        out: 'element.arrow'
    }, {
        in: 'source/element/Listbox/index.ts',
        out: 'element.listbox'
    }, {
        in: 'source/element/Option.ts',
        out: 'element.option'
    }],
    format: 'esm',
    lineLimit: 120,
    logLevel: 'info',
    mainFields: ['browser', 'main', 'module'],
    metafile: true,
    minify: true,
    outdir: 'assets',
    plugins: [postcssPlugin(), pugCompiler(), dtsPlugin()],
    sourcemap: true,
    target: ['esnext', 'safari18'],
    tsconfig: 'tsconfig.json'
}