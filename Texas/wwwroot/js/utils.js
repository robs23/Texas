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
            //return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
            return pageBottom >= (elementTop + ((elementBottom - elementTop)*0.6))

        }
    },
    log: function (element) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();
        var res = `pageTop=${pageTop}, pageBottom=${pageBottom}, elementTop=${elementTop}, elementBottom=${elementBottom}`
        return res;
    }
};