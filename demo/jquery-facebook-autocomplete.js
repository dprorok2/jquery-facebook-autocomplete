!function(a){"use strict";a.autoComplete=function(b){var c=[],d=this,e=b,f=e.attr("id"),g=function(){a(".autocomplete").eq(0).remove(),d.initFriendsList(),d.initKeyboardControls(),d.initDiv()};d.initFriendsList=function(){FB.api("/me/taggable_friends?fields=name,picture",function(a){if(a&&a.data&&!a.error)for(var b=1;b<a.data.length+1;b++){var d={name:a.data[b-1].name,picture:a.data[b-1].picture.data.url};c[b]=d}}),FB.api("/me?fields=name,picture",function(a){if(a&&!a.error){var b={name:a.name,picture:a.picture.data.url};c[0]=b}})},d.initKeyboardControls=function(){a(e).keydown(function(a){13==a.which?d.submit():38==a.which?(a.preventDefault(),a.stopPropagation(),d.moveSelected(-1)):40==a.which?(a.preventDefault(),a.stopPropagation(),d.moveSelected(1)):27==a.keyCode&&d.hideFriends()}).keyup(function(a){13!==a.which&&27!==a.which&&38!==a.which&&40!==a.which&&d.search()}).on("click",function(){d.search()})},d.search=function(){function a(a,b){return a=a.toLowerCase(),b=b.toLowerCase(),a.indexOf(b)>=0}var b=d.findSearchString().searchString;if(void 0===b||null===b||0===b.length)return d.hideFriends();d.showFriends();for(var e=[],f=0,g=0;g<c.length&&10>f;g++)a(c[g].name,b)&&(e.push(c[g]),f++);d.drawFriends(e)},d.submit=function(){var b=d.findSearchString().startingIndex;if(null===b)return d.hideFriends();var c=a(".autocomplete-user-selected").text()||a(".autocomplete-user").text();c&&(e.val(e.val().substring(0,b)+c+e.val().substring(e[0].selectionStart)),e[0].selectionStart=b+c.length,e[0].selectionEnd=b+c.length,d.hideFriends())},d.findSearchString=function(){for(var a=null,b=e[0].selectionStart,c=b-1,d=null,f=null,g=e.val()[c]||"",h=g.toLowerCase();c>=0&&("@"!==d||h&&h>="a"&&"z">=h);)f=d,d=g,g=e.val()[--c]||"",h=g.toLowerCase();return g&&" "!==g||" "===f||"."===f||"@"!==d?c=null:a=e.val().substring(c+1,b).split("@").join(""),{searchString:a,startingIndex:c+1}},d.moveSelected=function(b){var c=a(".autocomplete-user").length,d=(a(".autocomplete-user.autocomplete-user-selected").index()+b)%c;a(".autocomplete-user-selected").removeClass("autocomplete-user-selected"),a(".autocomplete-user").eq(d).addClass("autocomplete-user-selected")},d.initDiv=function(){var b="<div class='autocomplete' id='"+f+"-autocomplete'><ul class='autocomplete-list' id ='"+f+"-autocomplete-list'></ul></div>";e.after(b),a("#"+f+"-autocomplete").width(e.outerWidth());var c=e.offset().left-e.position().left;a("#"+f+"-autocomplete").css("left",c),a("#"+f+"-autocomplete").css("position","relative"),d.hideFriends(),a(e).focusout(function(){d.hideFriends()}),a(e).focusin(function(){d.drawFriends()})},d.drawFriends=function(b){if(d.clearFriends(),!b||0===b.length)return d.hideFriends();for(var c=0;c<b.length;c++){var e=b[c],g=e.name,h=e.picture,i="<li class='autocomplete-user "+f+"-autocomplete-user' title='"+g+"' role='option' onClick='base.submit'>";i+="<img class='autocomplete-image' src='"+h+"'>",i+="<span class='autocomplete-name'>"+g+"</span>",i+="</li>",a("#"+f+"-autocomplete-list").append(i)}a(".autocomplete-user").hover(function(){a(this).addClass("autocomplete-user-selected")},function(){a(this).removeClass("autocomplete-user-selected")}),0==a("autocomplete-user-selected").length&&a("#"+f+"-autocomplete .autocomplete-user").eq(0).addClass("autocomplete-user-selected")},d.clearFriends=function(){a("."+f+"-autocomplete-user").remove()},d.hideFriends=function(){a("#"+f+"-autocomplete").hide()},d.showFriends=function(){a("#"+f+"-autocomplete").show()},g()}}(jQuery);