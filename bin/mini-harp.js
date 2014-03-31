#! /usr/bin/env node

var parseArgs = require("minimist")
    , createMiniHarp = require("mini-harp")
    , app = createMiniHarp();

var argv = parseArgs(process.argv);

var port = argv.port || 4000;

app.listen(port);

console.log("Starting mini-harp on http://localhost:" + port);
