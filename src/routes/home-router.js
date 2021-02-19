/**
 * Home routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new HomeController()
const userController = new UserController()

router.get('/', userController.redirectLogin, controller.index)
router.post('/', controller.indexPost)
