'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

//creating the server
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 9000
});

//register plugin to server instance
server.register({
  register: require('./simple-plugin.js')
});

// Add the route
server.route({
  method: 'GET',
  path: '/say/{message}',
  handler: function (request, reply) {
    let data = {
      message: request.params.message
    }

    reply(data);
  }
});

server.route({
  method: 'GET',
  path: '/message',
  handler: function (request, reply) {
    reply("you requested message with ID: " + request.query.id);
  },
  config: {
    validate: {
      query: {
        id: Joi.number().integer().min(1)
      }
    }
  }
});

//start the server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at: ', server.info.uri);
});
