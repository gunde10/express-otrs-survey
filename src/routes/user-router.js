/**
 * Login routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

// Render the register form.
router.get('/register', controller.redirectHome, controller.newUser)
router.post('/register', controller.redirectHome, controller.register)

// Render the login page.
router.get('/', controller.redirectHome, controller.index)
router.post('/', controller.redirectHome, controller.login)

// Render a logout confirmation.
router.get('/logout', controller.redirectLogin, controller.logout)
router.post('/logout', controller.redirectLogin, controller.logoutConfirmed)
