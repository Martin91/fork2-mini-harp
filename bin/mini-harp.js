#! /usr/bin/env node

var parseArgs         = require("minimist")
    , createMiniHarp  = require("mini-harp");

// get specified port and root path, and then create the connect
var argv    = parseArgs(process.argv)
    , port  = argv.port || 4000
    , root  = argv._[2] || process.cwd()
    , app   = createMiniHarp(root);

app.listen(port);

console.log("Starting mini-harp on http://localhost:" + port);
