// ------------------------------------------------------------------
// centipede object (designed to be a piece of the centipede)
// ------------------------------------------------------------------

MyGame.pieces.flea = function (spec) {
  "use strict";

  let canvas = document.getElementById("id-canvas");
  let cellHeight = canvas.height / 20;
  let cellWidth = canvas.width / 30;

  let chanceToDrop = 0.33;

  let column = 1;

  let isInPlay = false;

  const move = () => {
    spec.center.x = column * cellWidth + cellWidth / 2
    spec.center.y += cellHeight;
    return Math.random() < chanceToDrop;
  };

  const startOver = () => {
    isInPlay = true;
    spec.center.y = spec.startHeight;
  }

  const setColumn = (col) => {
    column = col;
  };
  const setIsInPlay = (inPlay = true) => {
    isInPlay = inPlay;
  };

  let that = {
    get size() {
      return spec.size;
    },
    get width() {
      return spec.size?.x;
    },
    get height() {
      return spec.size?.y;
    },
    get center() {
      return spec.center;
    },
    get column() {
      return column;
    },
    get isInPlay() {
      return isInPlay;
    },
    setColumn,
    setIsInPlay,
    startOver,
    move,
  };

  return that;
};
