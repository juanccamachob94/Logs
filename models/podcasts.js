require('dotenv').config();
const SchemaModel = require('../models/SchemaModel');

class Podcasts extends SchemaModel {
  constructor() {
    super();
    this.url = process.env.URL_PODCASTS;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = Podcasts;