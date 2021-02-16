/**
 * Login routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import { HomeController } from '../controllers/home-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()
const homeController = new HomeController()

// Render the register form.
router.get('/new', homeController.redirectHome, controller.newUser)
router.post('/register', homeController.redirectHome, controller.register)

// Render the login page.
router.get('/', homeController.redirectHome, controller.index)
router.post('/login', homeController.redirectHome, controller.login)

// Render a logout confirmation.
router.get('/logout', homeController.redirectLogin, controller.logout)
router.post('/logout/ok', homeController.redirectLogin, controller.logoutConfirmed)

router.post('/guest', controller.guest)
