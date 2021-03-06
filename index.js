module.exports = function(root) {
  var connect        = require('connect')
      , serveStatic  = require('serve-static')
      , makeJade     = require('./lib/processor/jade')
      , makeLess     = require('./lib/processor/less')
      , rewrite      = require('./lib/processor/rewrite')
      , rejectStupid = require('./lib/processor/rejectStupid');

  app = connect()
          .use(rejectStupid)
          .use(serveStatic(root))
          .use(function(request, response, next) {
            request.url == "/current-time" ? response.end((new Date()).toISOString()) : next();
          })
          .use(rewrite)
          .use(makeJade(root))
          .use(makeLess(root));

  return app;
}
