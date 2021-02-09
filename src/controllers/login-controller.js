/**
 * Login Controller.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class LoginController {
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
    console.log('Login')
  }

  /**
   * Tries to register.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    console.log('Register')
  }
}
