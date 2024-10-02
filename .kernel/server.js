import express from 'express'
import getPort, { portNumbers } from 'get-port'
import nocache from 'nocache'
import path from 'node:path'

import { root } from './lib.cjs'
import { success } from './logger.cjs'

const PORT = await getPort({ port: portNumbers(53000, 53100) })
const BASE_DIR = path.join(root, 'assets')
const BASE_URL = new URL(`http://localhost:${PORT}`)

const server = express()

server.use(nocache())
server.use(express.static(BASE_DIR))
server.listen(PORT, serverReady)

function serverReady() {
	success(`TEST Server started at ${BASE_URL}`)
}
