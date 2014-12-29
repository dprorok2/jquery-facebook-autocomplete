;(function($) {
  "use strict";

  var friendsList = [];
  $.autoComplete = function(e1, options){
    var base = this;
    var element = e1;
    var id = element.attr('id');


    var init = function(){
      base.initFriendsList();
      base.initKeyboardControls();
      base.initDiv();
    }

    base.initFriendsList = function(){
      /* With current permissions we will only get friends that have also authorized this app */
      FB.api( "/me/friends?fields=name,picture", function (response) {
        if(response && response.data && !response.error){
          for(var i = 0; i < response.data.length; i++){
            var data = {
              name: response.data[i].name,
              picture: response.data[i].picture.data.url
            };
            friendsList[i] = data;
            base.addUser(friendsList[i]);
          }
        }
      })
      FB.api( "/me?fields=name,picture", function (response) {
        if(response && !response.error){
          var data = {
            name: response.name,
            picture: response.picture.data.url
          };
          friendsList[0] = data;
          base.addUser(friendsList[0]);
        }
      });
    };

    base.initKeyboardControls = function(){
      $(element).keyup(function(event){
        if(event.which == 13){
          base.submit();
        }
        if(event.which == 38){
          base.moveUp();
        }
        if(event.which == 40){
          base.moveDown();
        }
      });
    }

    base.submit = function(){
    }

    base.moveUp = function(){
    }

    base.moveDown = function(){
    }

    base.initDiv = function(){
      var div = "<div class='autocomplete' id='" + id +"-autocomplete'><ul class='autocomplete-list' id ='" + id + "-autocomplete-list'></ul></div>";
      element.after(div);
      $("#" + id + "-autocomplete").width(element.outerWidth());
      var left = element.offset().left - element.position().left;
      $("#" + id + "-autocomplete").css('left', left);
      $("#" + id + "-autocomplete").css('position', 'relative');
    }

    base.addUser = function(user){
      var name = user.name;
      var picture = user.picture;
      var li = "<li class='autocomplete-user' title='" + name + "' role='option' aria-selected='false'>";
      li += "<img class='autocomplete-image' src='" + picture + "'>";
      li += "<span class='autocomplete-name'>" + name + "</span>";
      li += "</li>";
      $("#" + id + "-autocomplete-list").append(li);

      $(".autocomplete-user").hover(function(){
        $(this).addClass("autocomplete-user-selected");
      }, function(){
        $(this).removeClass("autocomplete-user-selected");
      });
    }

    init();

  };
}(jQuery));