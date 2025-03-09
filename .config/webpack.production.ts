import path from 'node:path'
import type { Configuration } from 'webpack'

import devConfig from './webpack.development.ts'

const config: Configuration = {
	...devConfig,
	devtool: false,
	mode: 'production',
	output: {
		...devConfig.output,
		path: path.resolve(process.cwd(), 'bundle'),
	},
}

export default config
