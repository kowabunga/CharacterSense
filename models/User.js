const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  battleTag: {
    type: String,
    required: true,
  },
  registeredOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
