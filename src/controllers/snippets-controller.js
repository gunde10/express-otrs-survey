/**
 * Module for the SnippetsController.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class SnippetsController {
  /**
   * Displays a list of tasks.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find({}))
          .map(snippet => ({
            id: snippet._id,
            title: snippet.description,
            text: snippet.text
          }))
      }
      res.render('tasks/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async new (req, res) {
    const viewData = {
      title: '',
      text: ''
    }
    res.render('tasks/new', { viewData })
  }

  /**
   * Creates a new task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    try {
      const snippet = new Snippet({
        title: req.body.title,
        text: req.body.text
      })

      await snippet.save()

      req.session.flash = { type: 'success', message: 'The task was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('./new')
    }
  }

  /**
   * Returns a HTML form for editing a task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async edit (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        title: snippet.title,
        text: snippet.text
      }
      res.render('tasks/edit', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specific task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      const result = await Snippet.updateOne({ _id: req.body.id }, {
        title: req.body.title,
        text: req.body.text === 'on'
      })

      if (result.nModified === 1) {
        req.session.flash = { type: 'success', text: 'The task was updated successfully.' }
      } else {
        req.session.flash = {
          type: 'danger',
          message: 'The task you attempted to update was removed by another user after you got the original values.'
        }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('./edit')
    }
  }

  /**
   * Returns a HTML form for removing a task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async remove (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        title: snippet.title,
        text: snippet.text
      }
      res.render('tasks/remove', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified task.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      await Snippet.deleteOne({ _id: req.body.id })

      req.session.flash = { type: 'success', message: 'The task was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', message: error.message }
      res.redirect('./remove')
    }
  }
}
