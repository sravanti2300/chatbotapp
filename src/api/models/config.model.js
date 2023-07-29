const mongoose = require('mongoose');
const _ = require('lodash');

const configSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  collection: 'config',
  timestamps: true,
});

configSchema.statics = {
  async constants() {
    const configresponse = await this.find();
    const response = _.chain(configresponse).keyBy('key').mapValues('value').value();
    return response;
  },
};

module.exports = mongoose.model('Config', configSchema);
