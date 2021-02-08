/**
 * The routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as snippetRouter } from './snippets-router.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetRouter)
