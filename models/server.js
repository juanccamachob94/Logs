const express = require('express')
const cors = require('cors')
const {dbConnection} = require("../db/config");


require('dotenv').config();

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    //Ejecutar siempre antes del enrutador
    this.middlewares()
    this.coneccionDB()
    this.routes()
  }

  async coneccionDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/logs/enVivo', require('../routes/enVivoRoutes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server