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

exports.map = map = {
  '.ico' : 'image/x-icon',
  '.html': 'text/html',
  '.js'  : 'text/javascript',
  '.json': 'application/json',
  '.css' : 'text/css',
  '.png' : 'image/png'
};

exports.statusCode = statusCode = {
  'ok' : 200,
  'found': 302,
  'notFound': 404
}

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.respond = respond = function(request, response, body, statusCode){
  statusCode = statusCode || 200;
  headers['Content-Type'] = map[path.extname(request.url)];
  response.writeHead(statusCode, headers);
  response.write(body);
  response.end();
};

exports.sendFile = sendFile = function(route, request, response, statusCode){
  fs.readFile(route, function(err, file){
    if(err){
      respond(request, response, '', statusCode.notFound);
    }
    else if(statusCode === exports.statusCode.found){
      respond(request, response, 'loading.html', exports.statusCode.found);
    }
    else {
     respond(request, response, file, exports.statusCode.ok);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
