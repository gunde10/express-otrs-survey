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
    required: true,
    unique: true,
    trim: 1
  },
  passphrase: {
    type: String,
    minlength: [10, 'The passphrase must be of minimum length 10 characters.'],
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})
// Create a model using the schema.
export const Snippet = mongoose.model('User', schema)
