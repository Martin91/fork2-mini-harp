module.exports = rejectStupid;

var path = require('path');

function rejectStupid(request, response, next) {
  if(['.jade', '.less'].indexOf(path.extname(request.url)) >= 0) {
    response.statusCode = 404;
    response.end();
  } else {
    next();
  }
}
