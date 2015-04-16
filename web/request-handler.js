var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require(path.join(__dirname, 'http-helpers'));
var fs = require('fs');
var statusCode = helpers.statusCode;
var respond = helpers.respond;
var sendFile = helpers.sendFile;
var archivedSites = archive.paths.archivedSites;
var loadingSite = path.join(archive.paths.siteAssets, 'loading.html');


var routes = {
  '/': path.join(__dirname, 'public/index.html'),
  '/loading.html':path.join(__dirname,'public/loading.html'),
  '/styles.css': path.join(__dirname, 'public/styles.css'),
  '/favicon.ico': path.join(__dirname, 'public/favicon.ico'),
  '/app.js':path.join(__dirname, 'public/app.js')
};

exports.handleRequest = function (request, response) {
  console.log('method',request.method,'url',request.url);

  if(request.method === "GET"){
    var route = routes[request.url];
    var sitepath = path.join(archivedSites, request.url);

    if(route){
      sendFile(route, request, response);
    } else {
      sendFile(sitepath, request, response, statusCode.ok);
    }
  }
  if(request.method === "POST"){
    archive.addUrlToList(request, response);
    console.log(loadingSite);
    respond(request, response, 'loading.html', statusCode.found);
  }
};
