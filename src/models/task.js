/**
 * Mongoose model Task.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const Task = mongoose.model('Task', schema)
