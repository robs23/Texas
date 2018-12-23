// Write your Javascript code.
$(document).ready(function () {
    $('.smooth-slide').click(function (e) {
        var linkHref = $(this).attr('href');
        var start = linkHref.indexOf("#");
        linkHref = linkHref.substring(start, linkHref.Length);

        $('html, body').animate({
            scrollTop: $(linkHref).offset().top
        }, 1000);

        e.preventDefault();
    });

    var navY = $('nav').offset().top;
    var stickyNav = function () {
        var scrollY = $(window).scrollTop();
        if (scrollY > navY) {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    };
    stickyNav();
    $(window).scroll(function () {
        stickyNav();
    });
});