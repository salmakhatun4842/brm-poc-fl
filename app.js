'use strict';

const Hapi = require('@hapi/hapi');
const Config = require('./config');
const mongoose = require('mongoose');
require('dotenv').config();
const Routes = require('./routes');

mongoose.connect(Config.database.uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', function callback() {
  console.log('Connected to DB.');
  init();
});

db.on('error', function () {
  console.log('Connection to DB failed!');
  process.exit(0);
});

db.on('disconnected', function (err) {
  console.log('Connection teminated to DB ', err);
  process.exit(0);
});

const init = async () => {

  const server = Hapi.server({
    host: Config.server.host,
    port: Config.server.port,
    routes: {
      cors: true,
      validate: {
        // If any Joi validations fail, it will send the proper error message to the user
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);

  server.route(Routes);
  server.ext('onPostAuth', async (req, h) => {
    return h.continue;
  });
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

//init();
