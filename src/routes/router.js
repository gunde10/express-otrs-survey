/**
 * The routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'

export const router = express.Router()

router.use('/', homeRouter)
