/**
 * Tasks routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import { TasksController } from '../controllers/tasks-controller.js'

export const router = express.Router()

const controller = new TasksController()

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)

router.get('/new', controller.new)
router.post('/create', controller.create)

router.get('/:id/edit', controller.edit)
router.post('/:id/update', controller.update)

router.get('/:id/remove', controller.remove)
router.post('/:id/delete', controller.delete)
