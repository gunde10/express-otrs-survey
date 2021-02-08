/**
 * Home routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', controller.index)
router.post('/', controller.indexPost)
// router.get('/', (req, res) => res.send('Hej hopp! (home-router.js)'))
