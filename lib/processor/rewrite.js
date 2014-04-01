module.exports = rewrite;

var path = require('path');

function rewrite(request, response, next) {
  if(request.url === '/') {
    request.url = "/index.html";
  }
  next();
}
