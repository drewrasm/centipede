// ------------------------------------------------------------------
// lazer object
// ------------------------------------------------------------------

MyGame.pieces.lazer = function (spec) {
  "use strict";

  let imageReady = false;
  let image = new Image();

  let moveRate = 0.65;

  image.onload = function () {
    imageReady = true;
  };
  image.src = spec.imageSrc;

  const updateMovement = (elapsedTime) => {
    let newY = spec.center.y - moveRate * elapsedTime;
    spec.center.y = newY;
  };

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
    updateMovement,
  };
};
