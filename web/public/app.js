$(document).ready(function(){
  var $query;

  $("input").keypress(function(event) {
      if (event.which == 13) {
        //event.preventDefault();
        console.log('test');
        $query = $(this).val();
        console.log($query);
        //archiveURL($query, 'POST');
      }
  });

  var retrieveURL = function(url){
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'text/html',
      success: function(html){
        console.log('Loading page!');
      },
      complete: function(){
        console.log('Loading page loaded.');
      },
      error: function(err){
        console.log('error',err);
      }
    });
  };

  var archiveURL = function(url){
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(url),
      contentType: 'application/json',
      success: function(json){
        console.log('Yay! your page is getting archived!');
      },
      complete: function(){
        console.log('your page has been archived');
      },
      error: function(err){
        if(err.status === 302){
          retrieveURL(err.responseText);
        }
        console.log('error',err);
      }
    });
  };





});

