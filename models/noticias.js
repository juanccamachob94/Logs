require('dotenv').config();
const SchemaModel = require('../models/SchemaModel');

class Noticias extends SchemaModel {
  constructor() {
    super();
    this.url = process.env.URL_NOTICIAS;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = Noticias;