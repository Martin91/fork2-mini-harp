#! /usr/bin/env node

var parseArgs = require("minimist")
    , createMiniHarp = require("mini-harp")
    , app = createMiniHarp();

// use a current time middleware
app.use(function(request, response, next) {
  request.url == "/current-time" ? response.end((new Date()).toISOString()) : next();
});

var argv = parseArgs(process.argv);
var port = argv.port || 4000;

app.listen(port);

console.log("Starting mini-harp on http://localhost:" + port);
