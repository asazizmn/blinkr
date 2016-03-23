var main = function () {
    "use strict";  
    
    var $tagSearchField = $('#tag-search'), tagSearchTerm;
    var flickrReqBase = 'http://api.flickr.com/services/feeds/photos_public.gne', flickrReq;
    
    $tagSearchField.on('keypress', function (event) {
        
        // check for enter key
        if (event.keyCode === 13) {
            tagSearchTerm = $tagSearchField.val();
            
            // build request URL
            if (tagSearchTerm !== '') {
                // darken background
                $('body').addClass('result');
                $('body').css('background-image', 'url(img/loader_128.gif)');
                
                // request images
                flickrReq = flickrReqBase + '?tags=' + tagSearchTerm + '&format=json&jsoncallback=?';
                $.getJSON(flickrReq, function (flickrRes) {
                    
                    // remove
                    console.log(flickrRes.items);
                    
                    flickrRes.items.forEach(function (photo) {
                       $('body').css('background-image', 'url(' + photo.media.m + ')'); 
                    });
                    
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