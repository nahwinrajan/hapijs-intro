var simplePlugin = {
  register: function(server, options, next) {
    // log all request to console; type and it's path by hooking on the request lifecylce
    server.ext('onRequest', function(request, reply){
      console.log('type: ' + request.method + '; path: ' + request.url.path);
      // continue the request lifecylce
      reply.continue();
    });

    // tell hapi that our plugin is done and continue with next steps
    next();
  }
}

simplePlugin.register.attributes = {
  name: 'simple-plugin',
  version: '1.0.0'
}

module.exports = simplePlugin
