import { Ticket } from "../../models/ticket.js"

export class TicketController {
    /**
     * Provide req.image to the route if :id is present.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @param {string} id - The value of the id for the image to load.
     */
    async index (req, res) {
        try {
            res.status(200).json({ message: 'Hello there.' })
        } catch (error) {
            res.json({ message: error.message })
        }
    }

    async postTicketById(req, res) {
        try {
            console.log(`Slider value: ${req.body.sliderValue}`)
            console.log(`Message: ${req.body.message}`)

            res.status(200).json({ message: 'Form submited successfully.' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getTicketById(req, res) {
        try {
            console.log('API CALLED')
            const { id } = req.params
            const ticket = await Ticket.getById(id)

            if (ticket === null) {
                throw new Error('Det verkar inte finnas ett sådant ärende nummer.')
            }

            res.status(200).json(ticket)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getAllTickets(req, res) {
        try {
            const tickets = await Ticket.find({})

            res.status(200).json(tickets)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}