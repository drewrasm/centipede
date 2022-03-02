// ------------------------------------------------------------------
// player object
// ------------------------------------------------------------------

MyGame.pieces.player = function (spec) {
  "use strict";
  const HEIGHT_BOUND = 13;

  let canvas = document.getElementById("id-canvas");
  let cellHeight = canvas.height / 20;

  let imageReady = false;
  let image = new Image();

  image.onload = function () {
    imageReady = true;
  };
  image.src = spec.imageSrc;

  function throttle(fn, limit) {
    let waiting = false
    return (...args) => {
      if (!waiting) {
        fn.apply(this, args)
        waiting = true
        setTimeout(() => {
          waiting = false
        }, limit)
      }
    }
  }

  const hitsBarriers = (newCenter) => {
    for(let barrier of spec.barriers) {
      let newThat = {...that, center: newCenter}
      if(spec.checkIntersect(newThat, barrier)) {
        return true
      }
    }
    return false
  }

  const moveUp = (elapsedTime) => {
    let newY = spec.center.y - spec.moveRate * elapsedTime;
    if (newY - spec.height / 2 > cellHeight * HEIGHT_BOUND && !hitsBarriers({y: newY, x: spec.center.x})) {
      spec.center.y = newY;
    }
  };
  const moveDown = (elapsedTime) => {
    let newY = spec.center.y + spec.moveRate * elapsedTime;
    if (newY + spec.height / 2 < canvas.height && !hitsBarriers({y: newY, x: spec.center.x})) {
      spec.center.y = newY;
    }
  };
  const moveRight = (elapsedTime) => {
    let newX = spec.center.x + spec.moveRate * elapsedTime;
    if (newX + spec.width / 2 < canvas.width && !hitsBarriers({y: spec.center.y, x: newX})) {
      spec.center.x = newX;
    }
  };
  const moveLeft = (elapsedTime) => {
    let newX = spec.center.x - spec.moveRate * elapsedTime;
    if (newX - spec.width / 2 > 0 && !hitsBarriers({y: spec.center.y, x: newX})) {
      spec.center.x = newX;
    }
  };

  const fire = throttle((elapsedTime) => {
    spec.handleLazer(spec.center)
  }, 125)

  let that = {
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
    get moveRate() {
      return spec.moveRate;
    },
    get image() {
      return image;
    },
    get imageReady() {
      return imageReady;
    },
    moveUp,
    moveDown,
    moveRight,
    moveLeft,
    fire
  };

  return that;
};
