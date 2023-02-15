import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import path from 'path'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

/**
 * The main function of the application.
 */
const main = async () => {
  const app = express()
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Use helmet for security purposes
  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", 'cdn.jsdelivr.net']
      }
    })
  )

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  // Serve views/index.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(directoryFullName, "views/index.html"))
  })

  // Serve static files.
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
