// config/server.config.js
require('dotenv').config();

const serverConfig = {
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || 'localhost'
};

module.exports = serverConfig;
