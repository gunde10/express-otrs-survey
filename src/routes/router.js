import express from 'express'
import { TicketController } from '../controllers/api/ticket-controller.js'

export const router = express.Router()
const controller = new TicketController()

router.get('/api/v1', controller.index)

router.get('/api/v1/all', controller.getAllTickets)

router.get('/api/v1/:id', controller.getTicketById)
router.post('/api/v1/:id', controller.postTicketById)