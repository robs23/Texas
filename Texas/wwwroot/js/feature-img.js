
class FeatureImg{
    id = "";
    isDisplayed = false;
    isStopped = true;
    isDownloaded = false;
    image = null;
    initialImage = null;

    constructor(id, isDownloaded, isDisplayed, image) {
        this.id = id;
        this.isDisplayed = isDisplayed;
        this.isDownloaded = isDownloaded;
        this.image = image;
        this.initialImage = image;
        this.imageLoaded = this.imageLoaded.bind(this);
    }

    imageLoaded() {
        this.isDownloaded = true;
    }

    download() {
        var downloadingImage = new Image();
        downloadingImage.addEventListener('load', this.imageLoaded);
        downloadingImage.src = "/images/Async/"+ this.id +".gif";
    }

    changeImage2Gif() {
        this.isDisplayed = true;
        this.isStopped = false;
        this.image.src = "/images/Async/" + this.id + ".gif";
    }

    changeGif2Image() {
        this.isDisplayed = false;
        this.isStopped = true;
        this.image.src = "/images/" + this.id + ".png";
    }
}
