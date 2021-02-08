/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import hbs from 'express-hbs'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const app = express()
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// View engine setup.
app.engine('hbs', hbs.express4({
  defaultLayout: join(directoryFullName, 'views', 'layouts', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', join(directoryFullName, 'views'))

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Serve static files.
app.use(express.static(join(directoryFullName, '..', 'public')))

// Register routes.
app.use('/', router)

// Error handler.
app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send(err.message || 'Internal Server Error')
})

// Starts the HTTP server listening for connections.
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
