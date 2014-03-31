module.exports = function(root) {
  var connect = require('connect');
  var serveStatic = require('serve-static');

  return app = connect().use(serveStatic(root));
}
