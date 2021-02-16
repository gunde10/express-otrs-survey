/**
 * Home controller.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    console.log(req.session.cookie)
    res.render('home/index')
  }

  /**
   * Renders a view, based on posted data, and sends
   * the rendered HTML string as an HTTP response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  indexPost (req, res, next) {
    res.render('home/index')
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
