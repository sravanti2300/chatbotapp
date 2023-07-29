const mongoose = require('mongoose');

/**
 * Client Schema
 * @private
 */
const sessionSchema = new mongoose.Schema({

  usernumber: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  convlog: {
    type: Object,
  },
  userInfo: {
    type: Object,
  },
  status: {
    type: String,
    default: 'created',
  },
  type: {
    type: String,
    default: 'whatsappNotification',
  },
}, {
  collection: 'session',
  timestamps: true,
});

/**
 * Virtuals
 */
// sessionSchema.virtual('convlog', {
//   ref: 'convlog', // The model to use
//   localField: '_id', // Find people where `localField`
//   foreignField: 'session', // is equal to `foreignField`
// });

/**
 * @typedef Session
 */
module.exports = mongoose.model('Session', sessionSchema);
