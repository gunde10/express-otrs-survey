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

router.get('/', controller.index)
router.get('/new', controller.newUser)

router.post('/signup', controller.register)
router.post('/signin', controller.login)
router.post('/signout', controller.logout)
router.post('/guest', controller.guest)
