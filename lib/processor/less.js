module.exports = makeLess;

var fs      = require('fs')
    , less  = require('less')
    , path  = require('path');

// Replace the format of full path from .css to .less
// Example:
//   toLessPath("/assets/foo.css") => "/assets/foo.less"
var toLessPath = function(fullPath) {
  return fullPath.replace(/\.css$/, '.less');
};

function makeLess(root) {
  return function(request, response, next) {
    if(path.extname(request.url) != '.css') {
      next();
      return;
    }

    var fullPath = root + request.url
        , config = {encoding: 'utf8'};  // Should specify encoding in order to get data as string

    fs.readFile(fullPath, config, function(error, data) {
      if(error) {
        fs.readFile(toLessPath(fullPath), config, function(error, data) {
          if(error) {
            next();
            return;
          }

          less.render(data, function(err, css){
            response.setHeader("Content-Length", css.length);
            response.setHeader("Content-Type","text/css; charset=UTF-8");
            response.statusCode = 200;
            response.end(css);
          });
        });
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Length", data.length);
        response.setHeader("Content-Type","text/css; charset=UTF-8");
        response.end(data);
      }
    });
  };
}
