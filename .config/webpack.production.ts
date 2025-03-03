import devConfig from './webpack.development.ts'
import type { Configuration } from 'webpack'

const config: Configuration = {
	...devConfig,
	devtool: false,
	mode: 'production',
}

export default config
