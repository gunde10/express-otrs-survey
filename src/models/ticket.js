import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    minlength: 1,
  },
  agent_name: {
    type: String,
    minlength: 1,
  },
  case_date: {
    type: String,
    minlength: 1,
    trim: 1
  },
  email: {
    type: String,
    minlength: 1,
    trim: 1
  },
  code: {
    type:String,
    minlength: 1,
    trim: 1
  },
  status: {
    type: Number,
    minlength: 1,
    trim: 1
  }
}, {
  timestamps: true,
  versionKey: false
})

ticketSchema.statics.getById = async function (id) {
    const ticket = await this.findOne({ ticket_id: id });
    
    return ticket;
  }

// Create a model using the schema.
export const Ticket = mongoose.model('Ticket', ticketSchema)
