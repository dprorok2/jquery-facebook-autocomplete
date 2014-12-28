(function($) {
  "use strict";

  var friendsList = [];
  $.fn.autoComplete = function(element, options){
    initFriendsList();
  };

  function initFriendsList(){
    /* With current permissions we will only get friends that have also authorized this app */
    FB.api( "/me/friends?fields=name,picture", function (response) {
      if(response && response.data && !response.error){
        for(var i = 0; i < response.data.length; i++){
          var data = {
            name: response.data[i].name,
            picture: response.data[i].picture.data.url
          };
          friendsList[i] = data;
        }
      }
    });
  };
}(jQuery));