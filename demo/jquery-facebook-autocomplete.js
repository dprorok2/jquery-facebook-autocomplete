!function(a){"use strict";function b(){FB.api("/me/friends?fields=name,picture",function(a){if(a&&a.data&&!a.error)for(var b=0;b<a.data.length;b++){var d={name:a.data[b].name,picture:a.data[b].picture.data.url};c[b]=d}})}var c=[];a.fn.autoComplete=function(){b()}}(jQuery);