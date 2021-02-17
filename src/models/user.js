/**
 * Mongoose model User.
 *
 * @author Rickard Jarnling
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: 1
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

// Hashing the password before saving the user.
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Tries to authenticate the users username & password..
 *
 * @param {string} username - The users username.
 * @param {string} password - The users password..
 * @returns {User} Returns a user if one could be found with a matching password.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Login failed, please try again.')
  }

  return user
}

// Create a model using the schema.
export const User = mongoose.model('User', userSchema)
