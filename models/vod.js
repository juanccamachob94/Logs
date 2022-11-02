require('dotenv').config();
const SchemaModel = require('../models/SchemaModel');

class VOD extends SchemaModel {
  constructor() {
    super();
    this.url = process.env.URL_VOD;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = VOD;