var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.respond = respond = function(request, response, body){
  headers['Content-Type'] = map[path.extname(request.url)];
  response.writeHead(statusCode.ok, headers);
  response.write(body);
  response.end();
};

exports.sendFile = sendFile = function(route, request, response){
  fs.readFile(route, function(err, file){
    respond(request, response, file);
    if(err){
      console.log('error thrown');
      // TODO - throw 404 error
    }
  });
};

exports.map = map = {
  '.ico' : 'image/x-icon',
  '.html': 'text/html',
  '.js'  : 'text/javascript',
  '.json': 'application/json',
  '.css' : 'text/css',
  '.png' : 'image/png'
};

exports.statusCode = statusCode = {
  'ok' : 200
}

// As you progress, keep thinking about what helper functions you can put here!
