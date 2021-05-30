var images = new Array();

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
        if (isElementInView && images[i].isDownloaded && !images[i].isStopped) {
            images[i].changeImage2Gif();
            setButtonActive(images[i].id, 'player');
        }
    }

});


function changeImage2GifWithButton(sectionId) {
    //sectionId = e.g. systo_logistics
    var img = images.filter(function (image) {
        return image.id == sectionId;
    });
    if (img.length > 0) {
        img[0].changeImage2Gif();
        setButtonActive(img[0].id, 'player');
    }
    
}

function changeGif2ImageWithButton(sectionId) {
    //sectionId = e.g. systo_logistics
    var img = images.filter(function (image) {
        return image.id == sectionId;
    });
    if (img.length > 0) {
        img[0].changeGif2Image();
        setButtonActive(img[0].id, 'stopper');
    }

}

function setButtonActive(sectionId, className) {
    var environs = document.getElementById(sectionId).parentElement.getElementsByTagName("*");
    for (var i = 0; i < environs.length; i++) {
        if (environs[i].classList.contains(className)) {
            environs[i].classList.add('isActive');
        }
        if (environs[i].classList.contains('isActive') && !environs[i].classList.contains(className)) {
            environs[i].classList.remove('isActive');
        }
    }
}


var Utils = new Utils();