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
   * Tries to log in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    try {
      // try to login
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
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
      // try to register
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
    }
  }
}
