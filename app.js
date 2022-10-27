require('dotenv').config();

const Server = require('./models/server');
const task = require('./services/scheduled_tasks');

const server = new Server();
server.listen();

task.start();
