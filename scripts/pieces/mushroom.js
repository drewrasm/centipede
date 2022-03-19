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

  const initializeImage = () => {
    image.onload = function () {
      imageReady = true;
    };
    image.src = spec.imageSrc;
  };

  const changeImage = () => {
    if (lives == 3) {
      spec.imageSrc = "images/life_3_mushroom.png";
    }
    if (lives == 2) {
      spec.imageSrc = "images/life_2_mushroom.png";
    }
    if (lives == 1) {
      spec.imageSrc = "images/life_1_mushroom.png";
    }
    initializeImage();
  };

  const loseLife = () => {
    lives -= 1;
    if (lives !== 0) {
      changeImage();
    }
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
    loseLife,
  };
};
