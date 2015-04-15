var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require(path.join(__dirname, 'http-helpers'));
var fs = require('fs');
var statusCode = helpers.statusCode;
var respond = helpers.respond;
var sendFile = helpers.sendFile;


var routes = {
  '/': path.join(__dirname, 'public/index.html'),
  '/styles.css': path.join(__dirname, 'public/styles.css'),
  '/favicon.ico': path.join(__dirname, 'public/favicon.ico'),
  '/app.js':path.join(__dirname, 'public/app.js')
};



exports.handleRequest = function (request, response) {
  console.log('method',request.method,'url',request.url);

  var data = '';

  if(request.method === "GET"){
    var route = routes[request.url];
    if(route){
      sendFile(route, request, response);
    }
  }
  if(request.method === "POST"){

    request.on('data', function(chunk){
      console.log('GETting data');
      data += chunk;
    });

    request.on('end', function(){
      console.log(data);
      // TODO: append only if it's not in the file
      fs.writeFile(archive.paths.list, data, function(err){
        if(!err){
          console.log('URL archived');
        }
        else {
          console.log('Error');
        }
        // THROW 404
      });
    });
  }
  //GET
    //initialization
      //index.html
        //dependencies css, js, images etc



  //POST


  //response.end(archive.paths.list);
};
