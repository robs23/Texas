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

    var ident = document.getElementsByClassName("page-id");
    for (var i = 0; i < ident.length; i++) {
        var pageName = ident[i].innerHTML = ident[i].id;
    }

});

function SetNavBar() {
    var checkbox = document.getElementById("nav-toggle");
    if (checkbox.checked == true) {
        var navbar = document.getElementById("nav-bar");
        if (!navbar.classList.contains("nav-bar-expanded")) {
            navbar.classList.add("nav-bar-expanded");
        }
    } else {
        var container = document.getElementById("nav-container");
        var navbar = document.getElementById("nav-bar");
        if (navbar.classList.contains("nav-bar-expanded")) {
            navbar.classList.remove("nav-bar-expanded");
        }
    }
}

