/**
 * Login Controller.
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
   * Displays a list of snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      res.render('login/index')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Tries to log in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (user) {
        console.log('user exists')
      } else {
        throw new Error('no user')
      }
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('/user')
    }
  }

  /**
   * Returns a HTML form for creating a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async newUser (req, res) {
    const viewData = {
      username: '',
      password: ''
    }
    res.render('login/new', { viewData })
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
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('/user/new')
    }
  }

  /**
   * Tries to sign out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    console.log('Sign out')
  }

  /**
   * Guest function.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async guest (req, res) {
    console.log('Guest')
  }
}
