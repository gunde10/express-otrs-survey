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
router.get('/new', controller.newUser)
router.post('/register', controller.register)

// Render the login page.
router.get('/', controller.index)
router.post('/login', controller.login)

router.post('/signout', controller.logout)

router.post('/guest', controller.guest)
