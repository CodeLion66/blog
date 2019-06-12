import mongoose from 'mongoose'
import memberSchema from '../schemas/member'

module.exports = mongoose.model("Member", memberSchema);