/**
 * Snippets routes.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'
import { HomeController } from '../controllers/home-controller.js'

export const router = express.Router()

const controller = new SnippetsController()
const homeController = new HomeController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)

router.get('/new', homeController.redirectLogin, controller.new)
router.post('/create', homeController.redirectLogin, controller.create)

router.get('/:id/edit', controller.authorize, controller.edit)
router.post('/:id/update', controller.authorize, controller.update)

router.get('/:id/remove', controller.authorize, controller.remove)
router.post('/:id/delete', controller.authorize, controller.delete)
