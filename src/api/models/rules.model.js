const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  definition: {
    type: Object,
    required: true,
  },
  ruletype: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
  },
  enabled: {
    type: Boolean,
  },
}, {
  collection: 'rules',
  timestamps: true,
});

module.exports = mongoose.model('Rules', ruleSchema);
