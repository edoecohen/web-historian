$(document).ready(function(){
  var $query;

  $("input").keypress(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        console.log('test');
        $query = $(this).val();
        console.log($query);
        archiveURL($query);
      }
  });

  var archiveURL = function(url){
    $.ajax({
      type: 'POST',
      data: JSON.stringify(url),
      contentType: 'application/json',
      success: function(json){
        console.log('Yay! your page is getting archived!');
      },
      complete: function(){
        console.log('your page has been archived');
      },
      error: function(err){
        console.log('error',err);
      }
    });
  };



});

