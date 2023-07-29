const { pick } = require('lodash');
const mongoose = require('mongoose');
const mustache = require('mustache');

/**
 * DifferentialScheme Schema
 * @private
 */
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  content: {
    type: Buffer,
    required: true,
    get: (data) => Buffer.from(data).toString('utf8'),
  },
  sender: {
    type: String,
    required: true,
  },
  customdata: {
    type: Object,
    required: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  archivedAt: {
    type: Date,
  },
}, { timestamps: true });

/**
 * @typedef templateSchema
 */

templateSchema.method(
  {
    async render(data) {
      const msg = mustache.render(Buffer.from(this.content).toString('utf8'), data);
      return msg;
    },
  },
);

templateSchema.set('toJSON', {
  virtuals: true,
  transform: (doc) => pick(doc, ['id', 'name', 'description', 'type', 'sender', 'content', 'customdata']),
});
module.exports = mongoose.model('Template', templateSchema);
