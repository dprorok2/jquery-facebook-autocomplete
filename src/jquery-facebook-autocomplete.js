;(function($) {
  "use strict";

  $.autoComplete = function(e1, options){
    var friendsList = [];
    var base = this;
    var element = e1;
    var id = element.attr('id');
    var listening = false;
    var showingFriendList = false;
    var searchString = "";

    var init = function () {
      $(".autocomplete").eq(0).remove();
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

    base.initKeyboardControls = function () {
      $(element).keydown(function (event) {
        if (event.which == 13) { //Enter
          base.submit();
        } else if (event.which == 38) { //Up Arrow
          event.stopPropagation();
          base.moveSelected(-1);
        } else if (event.which == 40) { //Down Array
          event.stopPropagation();
          base.moveSelected(+1);
        } else if (event.keyCode == 27) { //Esc
          base.hideFriends();
        }
      })
      .keypress(function (event) {
        var c = String.fromCharCode(event.which);
        if (c == "@") {
          listening = true;
        } else {
          searchString += c;
        }
      })
      .keyup(function (event) {
        base.search();
      });
    }

    base.search = function () {
      var searchString = base.findSearchString();
      if (searchString ===undefined || searchString === null || searchString.length === 0) {
        return base.hideFriends();
      }
      searchString = searchString.substring(1).toLowerCase();
      base.showFriends();
      var matches = [];
      var num_matches = 0;
      for(var i = 0; i < friendsList.length && num_matches < 10; i++){
        var match = false;
        match = friendsList[i].name.toLowerCase().indexOf(searchString) >= 0;
        if(match){
          matches.push(friendsList[i]);
          num_matches ++;
        }
      }
      base.drawFriends(matches);
    }

    base.submit = function(){
      //TODO
      var searchString = base.findSearchString();
      var selected = $(".autocomplete-user-selected").text() || $(".autocomplete-user").text();
      element.val(element.val().replace(searchString, selected));
      listening = false;
    }
    base.findSearchString = function () {
      var cursor = element[0].selectionStart;
      var i = cursor - 1;
      do {
        var c = element.val()[i];
        i--;
      } while (i >= 0 && c !== "@");
      if (c !== "@") {
        return null;
      } else {
        return element.val().substring(i + 1, cursor);
      }
    }
    base.moveSelected = function (direction) {
      var numFriends = $(".autocomplete-user").length;
      var nextIndex = ($(".autocomplete-user.autocomplete-user-selected").index() + direction) % numFriends;
      $(".autocomplete-user-selected").removeClass("autocomplete-user-selected");
      $(".autocomplete-user").eq(nextIndex).addClass("autocomplete-user-selected");
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
      if(!friends || friends.length === 0){
        return base.hideFriends();
      }
      for(var i = 0; i < friends.length; i++){
        var friend = friends[i];
        var name = friend.name;
        var picture = friend.picture;
        var li = "<li class='autocomplete-user " + id +"-autocomplete-user' title='" + name + "' role='option' onClick='base.submit'>";
        li += "<img class='autocomplete-image' src='" + picture + "'>";
        li += "<span class='autocomplete-name'>" + name + "</span>";
        li += "</li>";
        $("#" + id + "-autocomplete-list").append(li);
      }
      $(".autocomplete-user").hover(function () {
        $(this).addClass("autocomplete-user-selected");
      }, function () {
        $(this).removeClass("autocomplete-user-selected");
      });
      $("#" + id + "-autocomplete .autocomplete-user").eq(0).addClass("autocomplete-user-selected");
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