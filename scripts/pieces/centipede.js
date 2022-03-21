// ------------------------------------------------------------------
// centipede object (designed to be a piece of the centipede)
// ------------------------------------------------------------------

MyGame.pieces.centipede = function (spec) {
  "use strict";

  let canvas = document.getElementById("id-canvas");
  let cellHeight = canvas.height / 20;
  let cellWidth = canvas.width / 30;

  // let moveTime = 0;

  const north = (90 * Math.PI) / 180;
  const east = (180 * Math.PI) / 180;
  const south = (270 * Math.PI) / 180;
  const west = 0;

  const directions = {
    north,
    east,
    south,
    west,
  };

  // figure out how you want the centipede to move

  

  const move = () => {
  // const move = (elapsedTime) => {
    // moveTime += elapsedTime;
    // if (moveTime >= 100) {
        console.log(spec.rotation)
      // move right if no boundaries and direction east
      // move left if no boundaries and direction west
      // move down if there is a boundary or you reached limit
      // change direction after moving down
      if (spec.rotation == directions.east) {
        spec.center.x += cellWidth;
      }
      else if (spec.rotation == directions.north) {
        spec.center.y -= cellHeight;
      }
      else if (spec.rotation == directions.south) {
        spec.center.y += cellHeight;
      }
      else if (spec.rotation == directions.west) {
        spec.center.x -= cellWidth;
      }
      // moveTime = 0;
    // }
  };

  const setHead = () => {
    spec.isHead = true;
  };

  const setRotation = (direction) => {
    spec.rotation = directions[direction];
  };

  const toggleGoingNorth = () => {
    spec.goingNorth = !spec.goingNorth;
  };

  const toggleGoingEast = () => {
    spec.goingEast = !spec.goingEast;
  };

  let that = {
    get size() {
      return spec.size;
    },
    get center() {
      return spec.center;
    },
    get rotation() {
      return spec.rotation;
    },
    get isHead() {
      return spec.isHead || false;
    },
    get goingNorth() {
      return spec.goingNorth || false;
    },
    get goingEast() {
      return spec.goingEast || false;
    },
    directions,
    toggleGoingNorth,
    toggleGoingEast,
    setHead,
    setRotation,
    move,
  };

  return that;
};
