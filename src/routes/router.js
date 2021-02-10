/**
 * The routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

import { router as homeRouter } from './home-router.js'
import { router as snippetRouter } from './snippets-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetRouter)
router.use('/user', userRouter)

router.use('*', (req, res, next) => next(createError(404)))
