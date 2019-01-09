﻿// Write your Javascript code.
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

    var navY = $('#nav-container').offset().top + 50;
    var stickyNav = function () {
        var scrollY = $(window).scrollTop();
        if (scrollY > navY) {
            $('#nav-container').addClass('sticky');
            $('#nav-main > ul').removeClass('nav-default');
            $('#nav-main > ul').addClass('nav-black');
            $('#nav-bar').addClass('nav-bar-scrolled');
        } else {
            $('#nav-container').removeClass('sticky');
            $('#nav-main > ul').removeClass('nav-black');
            $('#nav-main > ul').addClass('nav-default');
            $('#nav-bar').removeClass('nav-bar-scrolled');
        }
    };
    stickyNav();
    $(window).scroll(function () {
        stickyNav();
    });
});