// ------------------------------------------------------------------
// mushroom object
// ------------------------------------------------------------------

MyGame.pieces.mushroom = function (spec) {
  "use strict";
  // const HEIGHT_BOUND = 13;

  // let canvas = document.getElementById("id-canvas");
  // let cellHeight = canvas.height / 20;

  let imageReady = false;
  let image = new Image();
  let lives = 4;

  let isPoison = spec.isPoison || false;

  const initializeImage = (newImage = null) => {
    image.onload = function () {
      imageReady = true;
    };
    image.src = newImage || spec.imageSrc;
  };

  const changeImage = () => {
    if (lives > 0) {
      spec.imageSrc = `images/life_${lives}${
        isPoison ? "_poison" : ""
      }_mushroom.png`;
    }
    initializeImage();
  };

  const loseLife = () => {
    lives -= 1;
    if (lives !== 0) {
      changeImage();
    }
  };

  const makePoisionous = () => {
    isPoison = true;
    let newImage = `images/${lives !== 4 ? 'life_' : ''}${lives !== 4 ? lives + '_' : ''}poison_mushroom.png`
    initializeImage(newImage);
  };

  initializeImage();

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
    get lives() {
      return lives;
    },
    get isPoison() {
      return isPoison;
    },
    loseLife,
    makePoisionous
  };
};
