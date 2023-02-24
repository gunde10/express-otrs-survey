/**
 * The starting point of the application.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function of the application.
 */
const main = async () => {
  await connectDB()

  const app = express()

  app.use(cors({
    origin: '*',
    methods: 'GET,POST',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Access'  
  }))

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  // Populates the request object with a body object (req.body).
  app.use(express.json({ limit: '500kb' }))

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    if (err.status === 401) {
      return res
        .status(401)
    }

    if (err.status === 403) {
      return res
        .status(403)
    }

    if (err.status === 404) {
      return res
        .status(404)
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(500)
    }

    res
      .status(err.status || 500)
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
