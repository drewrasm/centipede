// ------------------------------------------------------------------
// life object
// ------------------------------------------------------------------

MyGame.pieces.life = function (spec) {
  "use strict";

  let imageReady = false;
  let image = new Image();

  image.onload = function () {
    imageReady = true;
  };
  image.src = spec.imageSrc;

  return {
    get x() {
      return spec.center.x;
    },
    get y() {
      return spec.center.y;
    },
    get center() {
      return spec.center;
    },
    get width() {
      return spec.width;
    },
    get height() {
      return spec.height;
    },
    get image() {
      return image;
    },
    get imageReady() {
      return imageReady;
    },
  };
};
