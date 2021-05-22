﻿var images = new Array();

window.addEventListener('load', function () {
    jQuery('.feature-img').each(function () {
        var currentElement = $(this);
        var currentElementId = currentElement.attr('id');
        var img = window.document.getElementById(currentElementId);
        var el = new FeatureImg(currentElementId, false, false, img);
        el.download();
        images.push(el);
    });
});
function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

window.addEventListener('scroll', function () {
    for (var i = 0; i < images.length; i++) {
        var isElementInView = Utils.isElementInView($('#' + images[i].id), true);
        if (isElementInView && images[i].isDownloaded) {
            images[i].isDisplayed = true;
            images[i].image.src = "/images/Async/" + images[i].id + ".gif";
        }
    }

});

var Utils = new Utils();