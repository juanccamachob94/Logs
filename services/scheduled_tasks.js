
const mongo = require('../services/mongo_operation');
const EnVivo = require('../models/enVivo');
var CronJob = require('cron').CronJob;
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
const task = new CronJob('*/10 * * * *', () => {
  mongo.newMongoRegister(EnVivo);
  console.log('New event added');
}
, () => {
    console.log('failed new event');
}, true);

module.exports = task;