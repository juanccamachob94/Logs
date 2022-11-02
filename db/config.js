const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = {
  dbConnection : async() => {

    try {

      //production implementation
      //await mongoose.connect( process.env.DB_CNN, {sslCA: `rds-combined-ca-bundle-DBDev.pem`})

      //test implementation
      await mongoose.connect( process.env.DB_CNN)


      console.log('DB Online');

    } catch (error) {
      console.log(error);
      throw new Error('Error a la hora de iniciar la BD ver logs');
    }
  }
}