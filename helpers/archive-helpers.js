var http = require('http-request');
var fs = require('fs');
var path = require('path');
var url = require('url');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var results = [];
  fs.readFile(paths.list, 'utf8', function(err, file){
    results = file.split('\n');
    callback(results);
  });
};

exports.isUrlInList = function(query, callback){

  var results = [];
  var inList = false;

  fs.readFile(paths.list, 'utf8', function(err, file){
    results = file.split('\n');
    if(results.indexOf(query) > -1){
      inList = true;
    }
    callback(inList);
  });

};

exports.addUrlToList = function(request, response, callback){
  var data = '';
  request.on('data', function(chunk){
      data += chunk;
  });

  request.on('end', function(){
    data = data.split('url=').join('');
    var inList;

    exports.isUrlInList(data, function(status){
      inList = status;
      if(!inList){
        fs.appendFile(paths.list, data + "\n", function(err){
          if(!err){
            callback('/loading.html', statusCode.found);
            exports.downloadUrls(data, function(){ });
          }
          else {
            // TODO: throw 404
            console.log('Error');
          }
        });
      } else {
        var urlArchived = exports.isURLArchived(path.join(paths.archivedSites+'/'+data));
        if(urlArchived){
          console.log('we will show you the site now');
          callback(data, statusCode.found);
        }
        else {
          // send them to loading
          callback('/loading.html', statusCode.found);
        }
      }
    });
  });
};

exports.isURLArchived = function(path){

  var descriptor = fs.existsSync(path);
  console.log('descriptor',descriptor);
  return descriptor;
};

exports.downloadUrls = function(data, callback){
  http.get({url:data}, paths.archivedSites + '/' + data, function(err, response){
    if (err){
      console.log(err);
      return;
    }
    console.log('Archived.');
    callback;
  });
};
