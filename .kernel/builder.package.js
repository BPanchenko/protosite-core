import fs from 'fs'

const pkgStr = fs.readFileSync(
	new URL('../package.json', import.meta.url),
	'utf-8',
)
const pkg = JSON.parse(pkgStr.replace(/\.\/\.bundle\//g, './'))

const copyFileSync = (source, dest) => {
	const content = fs.readFileSync(source, 'utf-8')
	fs.writeFileSync(dest, content)
}

delete pkg.devDependencies
delete pkg.exports
delete pkg.imports
delete pkg.private
delete pkg.scripts
fs.writeFileSync('.bundle/package.json', JSON.stringify(pkg, null, 2))

copyFileSync('README.md', '.bundle/README.md')
copyFileSync('LICENSE', '.bundle/LICENSE')
