require('dotenv').config();
const SchemaModel = require('../models/SchemaModel');

class EnVivo extends SchemaModel {
  constructor() {
    super();
    this.url = process.env.URL_EN_VIVO;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = EnVivo