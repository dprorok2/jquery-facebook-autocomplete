;(function($) {
  "use strict";

  $.autoComplete = function(e1, options){
    var friendsList = [];
    var base = this;
    var element = e1;
    var id = element.attr('id');


    var init = function(){
      base.initFriendsList();
      base.initKeyboardControls();
      base.initDiv();
    }

    base.initFriendsList = function(){
      FB.api("/me/taggable_friends?fields=name,picture", function (response) {
        if(response && response.data && !response.error){
          for(var i = 1; i < response.data.length + 1; i++){
            var data = {
              name: response.data[i-1].name,
              picture: response.data[i-1].picture.data.url
            };
            friendsList[i] = data;
          }
        }
      })
      FB.api("/me?fields=name,picture", function (response) {
        if(response && !response.error){
          var data = {
            name: response.name,
            picture: response.picture.data.url
          };
          friendsList[0] = data;
        }
      });
    };

    base.initKeyboardControls = function(){
      $(element).keyup(function(event){
        if(event.which == 13){ //Enter
          base.submit();
        } else if(event.which == 38){ //Up Arrow
          base.moveUp();
        } else if(event.which == 40){ //Down Array
          base.moveDown();
        } else if(event.which == 27){ //Esc
          base.hideFriends();
        }else{
          base.search();
        }
      });
    }

    base.search = function(){
      base.showFriends();
      var matches = [];
      var num_matches = 0;
      for(var i = 0; i < friendsList.length && num_matches < 10; i++){
        var match = false;
        match = friendsList[i].name.toLowerCase().indexOf(element.val().toLowerCase()) >= 0;
        if(match){
          matches.push(friendsList[i]);
          num_matches ++;
        }
      }
      base.drawFriends(matches);
    }

    base.submit = function(){
      //TODO
    }

    base.moveUp = function(){
      //TODO
    }

    base.moveDown = function(){
      //TODO
    }

    base.initDiv = function(){
      var div = "<div class='autocomplete' id='" + id +"-autocomplete'><ul class='autocomplete-list' id ='" + id + "-autocomplete-list'></ul></div>";
      element.after(div);
      $("#" + id + "-autocomplete").width(element.outerWidth());
      var left = element.offset().left - element.position().left;
      $("#" + id + "-autocomplete").css('left', left);
      $("#" + id + "-autocomplete").css('position', 'relative');
      base.hideFriends();
      $(element).focusout(function(event){
        base.hideFriends();
      });

      $(element).focusin(function(event){
        base.drawFriends();
      });
    }

    base.drawFriends = function(friends){
      base.clearFriends();
      if(friends.length == 0){
        base.hideFriends();
      }
      for(var i = 0; i < friends.length; i++){
        var friend = friends[i];
        var name = friend.name;
        var picture = friend.picture;
        var li = "<li class='autocomplete-user " + id +"-autocomplete-user'title='" + name + "' role='option'>";
        li += "<img class='autocomplete-image' src='" + picture + "'>";
        li += "<span class='autocomplete-name'>" + name + "</span>";
        li += "</li>";
        $("#" + id + "-autocomplete-list").append(li);
      }

      $(".autocomplete-user").hover(function(){
        $(this).addClass("autocomplete-user-selected");
      }, function(){
        $(this).removeClass("autocomplete-user-selected");
      });
    }

    base.clearFriends = function(){
      $("." + id +"-autocomplete-user").remove();
    }

    base.hideFriends = function(){
      $("#" + id + "-autocomplete").hide();
    }

    base.showFriends = function(){
      $("#" + id + "-autocomplete").show();
    }

    init();

  };
}(jQuery));