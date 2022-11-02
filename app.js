require('dotenv').config();
const {dbConnection} = require('./db/config');
const EnVivo = require('./models/enVivo');
const mongo = require('./services/mongo_operation');
const Noticias = require("./models/noticias");
const Podcasts = require("./models/podcasts");
const Playlists = require("./models/playlist");
const VOD = require("./models/vod");

class Client {
  constructor() {
    dbConnection();
  }

  async getClient() {
    const clientType = process.env.CLIENT_TYPE;
    let objectClient = null;
    if (clientType === 'envivo') {
      objectClient = new EnVivo();
    }
    if (clientType === 'podcasts') {
      objectClient = new Podcasts();
    }
    if (clientType === 'vod') {
      objectClient = new VOD();
    }
    if (clientType === 'playlists') {
      objectClient = new Playlists();
    }
    if (clientType === 'noticias') {
      objectClient = new Noticias();
    }
    await mongo.newMongoRegister(objectClient)
    process.exit(0);
  }
}
//new Client()
new Client().getClient();