/**
 * Mongoose model Snippet.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const Snippet = mongoose.model('Snippet', schema)
