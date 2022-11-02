require('dotenv').config();
const SchemaModel = require('../models/SchemaModel');

class Playlist extends SchemaModel {
  constructor() {
    super();
    this.url = process.env.URL_PLAYLIST;
  }

  getUrl() {
    return this.url;
  }
}

module.exports = Playlist;