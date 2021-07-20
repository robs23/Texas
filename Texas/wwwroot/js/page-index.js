var utils = new Utils();

window.addEventListener('scroll', function () {
    var fadable = this.document.getElementsByClassName("fadable");

    for (var i = 0; i < fadable.length; i++) {
        var isElementInView = utils.isElementInView($('#' + fadable[i].id), true);
        if (isElementInView) {
            fadable[i].classList.add("fade-in");
        }
    }
});