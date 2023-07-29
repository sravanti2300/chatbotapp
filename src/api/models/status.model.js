const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  collection: 'status',
  timestamps: true,
});

module.exports = mongoose.model('Status', statusSchema);
