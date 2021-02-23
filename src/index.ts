import { resolve } from 'path'

import dotenv from 'dotenv'
import 'reflect-metadata'

import { startServer } from './server'

dotenv.config({ path: resolve(__dirname, '../.env') })

startServer()
