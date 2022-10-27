const { Schema, model} = require('mongoose')

const EnVivoSchema = new Schema({
  date: {
    type: String,
    default: ""
  },
  captureDate: {
    type: Object,
    default: ""
  }
}, { collection: 'envivo' });

module.exports = model('Person', EnVivoSchema);