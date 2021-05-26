
class FeatureImg{
    id = "";
    isDisplayed = false;
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
}
