const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  bnetId: {
    type: Number,
    required: true,
    unique: true,
  },
  battleTag: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
