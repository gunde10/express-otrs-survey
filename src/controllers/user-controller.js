/**
 * User Controller.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Displays a login page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      res.render('user/index')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Tries to log in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)

      req.session.regenerate(() => {
        req.session.loggedIn = true
        req.session.username = user.username

        res.redirect('./')
      })
    } catch (error) {
      error.status = 401
      next(error)
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('./')
    }
  }

  /**
   * Returns a HTML form for creating a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async newUser (req, res) {
    try {
      res.render('user/new')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('.')
    }
  }

  /**
   * Tries to register.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    try {
      if (await User.findOne({ username: req.body.username })) {
        throw new Error('Username "' + req.body.username + '" is already taken. Please choose another.')
      }

      const user = new User({
        username: req.body.username,
        password: req.body.password
      })

      await user.save()

      req.session.flash = { type: 'success', message: 'You were succesfully registred! Please log in below.' }
      res.redirect('./')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('../user/register')
    }
  }

  /**
   * Renders a HTML form to confirm logout.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    try {
      res.render('user/logout')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('.')
    }
  }

  /**
   * Logs the user out of the application.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logoutConfirmed (req, res) {
    try {
      if (req.session) {
        req.session.destroy()
        res.clearCookie(process.env.SESSION_NAME)
        res.redirect('./')
      }
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('.')
    }
  }

  /**
   * Provides a protetion layer and redirects the user to a login page if the user isn't authenticated.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  redirectLogin (req, res, next) {
    if (!req.session.username) {
      res.redirect('./user')
    } else {
      next()
    }
  }

  /**
   * Redirects the user to the home page if the user is authenticated.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  redirectHome (req, res, next) {
    if (req.session.username) {
      res.redirect('./')
    } else {
      next()
    }
  }
}
