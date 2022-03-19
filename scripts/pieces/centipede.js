// ------------------------------------------------------------------
// centipede object (designed to be a piece of the centipede)
// ------------------------------------------------------------------

MyGame.pieces.centipede = function (spec) {
  "use strict";

  const setHead = () => {
    spec.isHead = true;
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
    setHead,
  };

  return that;
};
