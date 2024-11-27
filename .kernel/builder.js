import fs from 'node:fs'
import path from 'node:path'
import * as makeDir from 'make-dir'
import { rollup } from 'rollup'

import config from '../.config/rollup.config.js'
import { logger } from './logger.cjs'

const root = process.cwd()
const dist = path.join(root, 'assets')
const savedFiles = []

makeDir.sync(dist)
build()

async function build() {
	logger.info('Start building Web Components')
	let bundle
	let buildFailed = false
	try {
		bundle = await rollup(config)
		await generateOutputs(bundle)
	} catch (err) {
		buildFailed = true
		logger.error(err)
	}
	if (bundle) {
		await bundle.close()
		logger.logSummaryFiles(savedFiles)
	}
	process.exit(buildFailed ? 1 : 0)
}

async function generateOutputs(bundle) {
	const { output } = await bundle.generate(config.output)

	for (const chunkOrAsset of output) {
		const { type, fileName, code, source } = chunkOrAsset
		const file = path.join(dist, fileName)
		const content = type === 'asset' ? source : code
		saveFile(file, content)
	}
}

function saveFile(file, content) {
	fs.writeFileSync(file, content)
	logger.logSavedFile(file)
	savedFiles.push(file)
}
