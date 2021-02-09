/**
 * Login routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import { LoginController } from '../controllers/login-controller.js'

export const router = express.Router()

const controller = new LoginController()

router.get('/', controller.index)

router.post('/login', controller.login)
router.post('/register', controller.register)
