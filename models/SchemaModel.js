const { Schema } = require('mongoose')

class SchemaModel {

  getSchema() {
    const schema =  new Schema({
      date: {
        type: String,
        default: ""
      },
      captureData: {
        type: Object,
        default: ""
      }
    }, { collection: process.env.COLLECTION_DB, versionKey: false  });
    return schema;
  }
}

module.exports = SchemaModel