var utils = new Utils();

window.addEventListener('scroll', function () {
    var fadable = this.document.getElementsByClassName("fadable");
    var slidableFromLeft = this.document.getElementsByClassName("slidable-from-left");
    var slidableFromRight = this.document.getElementsByClassName("slidable-from-right");
    var parallax = this.document.getElementsByClassName("parallax");
    let pageTopOffset = this.pageYOffset;

    if (parallax.length > 0) {
        for (var i = 0; i < parallax.length; i++) {
            parallax[i].style.backgroundPositionY = pageTopOffset * 0.7 + "px";
        }
        
    }

    for (var i = 0; i < fadable.length; i++) {
        var isElementInView = utils.isElementInView($('#' + fadable[i].id), false);
        if (isElementInView) {
            if (!fadable[i].style.animation.includes("fade-in")){
                fadable[i].style.animation = "fade-in 0.5s ease-in forwards";
                fadable[i].style.visibility = "visible";
            }
            //fadable[i].classList.add("fade-in");
        }
    }

    for(var i = 0; i < slidableFromLeft.length; i++) {
        isElementInView = utils.isElementInView($('#' + slidableFromLeft[i].id), false);
        if (isElementInView) {
            var prevAnimation;
            if (slidableFromLeft[i].style.animation) {
                //there's already some value, append
                prevAnimation = slidableFromLeft[i].style.animation + ", ";
            }
            if (!slidableFromLeft[i].style.animation.includes("slide-from-left")){
                slidableFromLeft[i].style.animation = prevAnimation + "slide-from-left 0.4s ease-in forwards";
            }
            
        }
    }

    for (var i = 0; i < slidableFromRight.length; i++) {
        isElementInView = utils.isElementInView($('#' + slidableFromRight[i].id), false);
        if (isElementInView) {
            prevAnimation;
            if (slidableFromRight[i].style.animation) {
                //there's already some value, append
                prevAnimation = slidableFromRight[i].style.animation + ", ";
            }
            if (!slidableFromRight[i].style.animation.includes("slide-from-right")) {
                slidableFromRight[i].style.animation = prevAnimation + "slide-from-right 0.4s ease-in forwards";
            }

        }
    }

    //var el = this.document.getElementById("bio-img");
    //var res = utils.log(el);
    //console.log(res);
});