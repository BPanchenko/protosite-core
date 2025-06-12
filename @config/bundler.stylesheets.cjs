const { postcssPlugin } = require('./plugin.postcss.cjs')

module.exports = {
    bundle: true,
    color: true,
    entryPoints: [{
        in: 'source/component/Avatar/stylesheet.main.css',
        out: 'stylesheet.avatar-component'
    }, {
        in: 'source/component/Select/stylesheet.main.css',
        out: 'stylesheet.select-component'
    }, {
        in: 'source/element/Arrow/stylesheet.main.css',
        out: 'stylesheet.arrow-element'
    }, {
        in: 'source/element/Arrow/stylesheet.arrow-glyphs.css',
        out: 'stylesheet.arrow-glyphs'
    }, {
        in: 'source/element/File/stylesheet.main.css',
        out: 'stylesheet.file-element'
    }, {
        in: 'source/element/File/stylesheet.file-glyphs.css',
        out: 'stylesheet.file-glyphs'
    }],
    lineLimit: 80,
    logLevel: 'info',
    metafile: true,
    minify: true,
    outdir: 'assets',
    plugins: [postcssPlugin()]
}