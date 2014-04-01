module.exports = makeJade;

var fs      = require('fs')
    , jade  = require('jade')
    , path  = require('path');

// Replace the format of full path from .html to .jade
// Example:
//   toJadePath("/assets/foo.html") => "/assets/foo.jade"
var toJadePath = function(fullPath) {
  return fullPath.replace(/\.html$/, '.jade');
};

function makeJade(root) {
  return function(request, response, next) {
    if(path.extname(request.url) != '.html') {
      next();
      return;
    }

    var fullPath = root + request.url;
    fs.readFile(fullPath, function(error, data) {
      if (error) {
        fs.readFile(toJadePath(fullPath), function(error, data) {
          if(error) {
            next();
            return;
          }

          response.statusCode = 200;
          var template = jade.render(data);
          response.end(template);
        });
      } else {
        response.statusCode = 200;
        response.end(data);
      }
    });
  };
}
