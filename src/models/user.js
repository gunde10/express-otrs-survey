/**
 * Mongoose model User.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Create a schema.
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'The email field is required.'],
    unique: true,
    trim: 1
  },
  password: {
    type: String,
    minlength: [10, 'The password must be of minimum length 10 characters.'],
    required: [true, 'The password field is required.']
  }
}, {
  timestamps: true,
  versionKey: false
})

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})
// Create a model using the schema.
export const User = mongoose.model('User', schema)
