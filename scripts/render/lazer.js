MyGame.renderer.lazer = (function (graphics) {
  "use strict";

  function render(spec) {
    if (spec.imageReady) {
      graphics.drawTexture(spec.image, spec.center, {
        x: spec.width,
        y: spec.height,
      });
    }
  }

  return {
    render: render,
  };
})(MyGame.graphics);
