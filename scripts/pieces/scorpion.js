// ------------------------------------------------------------------
// centipede object (designed to be a piece of the centipede)
// ------------------------------------------------------------------

MyGame.pieces.scorpion = function (spec) {
    "use strict";
  
    let canvas = document.getElementById("id-canvas");
    let cellHeight = canvas.height / 20;
    let cellWidth = canvas.width / 30;
  
  
    let row = 3;
  
    let isInPlay = true;
  
    const move = () => {
      spec.center.x += cellWidth;
      spec.center.y = row * cellHeight + cellHeight / 2;
    }; 
  
    const startOver = () => {
      isInPlay = true;
      spec.center.x = (cellWidth / 2);
    }
  
    const setRow = (r) => {
      row = r;
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
      get row() {
        return row;
      },
      get isInPlay() {
        return isInPlay;
      },
      setRow,
      setIsInPlay,
      startOver,
      move,
    };
  
    return that;
  };
  