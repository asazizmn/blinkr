var main = function () {
    "use strict";  
    
    var $tagSearchField = $('#tag-search'), tagSearchTerm;
    var flickrReqBase = 'http://api.flickr.com/services/feeds/photos_public.gne', flickrReq;
    var intervalHandle; // used to check if setInterval is active
        
    $tagSearchField.on('keypress', function (event) {
        
        // check for enter key
        if (event.keyCode === 13) {
            tagSearchTerm = $tagSearchField.val();
            
            // build request URL
            if (tagSearchTerm !== '') {
                // darken background & show loader
                $('body').addClass('result');
                
                $('body').css('transition', 'none');
                $('body').css('background-size', 'initial');
                $('body').css('background-image', 'url(img/loader_128.gif)');
                
                // request images
                flickrReq = flickrReqBase + '?tags=' + tagSearchTerm + '&format=json&jsoncallback=?';
                $.getJSON(flickrReq, function (flickrRes) {
                    var i = 0, isResult = false;
                    var showImage = function (index) {
                        
                        // [ref: https://www.flickr.com/services/api/misc.urls.html]
                        var mURL = flickrRes.items[index].media.m;
                        var bURL = mURL.replace("_m.", "_b."); // 1024
//                        var bURL = mURL.replace("_m.", "_z."); // 640
                        
                        if (!isResult) {
                            $('body').css('background-size', 'cover');
                            isResult = true;
                        }
                        
                        $('body').css('background-image', 'url(' + bURL + ')');
                        
                        // only start transition from second image
                        if (index === 1) {
                            $('body').css('transition', 'background 300ms ease-in 500ms');
                        }
                    };

                    
                    clearInterval(intervalHandle);
                    intervalHandle = setInterval(function () { 
                        showImage(i++);
                        if (i >= flickrRes.items.length) {
                            i = 0;
                        }
                    }, 3000);
                    
                    
                    // redisplay all images at once
//                    $('#flickr-img').empty();
//                    flickrRes.items.forEach(function (photo) {
//                        var photoURL = photo.media.m;
//                        var $photo = $('<img>').hide();
//                        $photo.attr('src', photoURL);
//
//                        $('#flickr-img').append($photo);
//                        $photo.fadeIn('slow');
//                    });
                });
            }
        }
    });
};

$(document).ready(main);