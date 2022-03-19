MyGame.graphics = (function () {
  "use strict";

  let canvas = document.getElementById("id-canvas");
  let context = canvas.getContext("2d");

  const HEIGHT_BOUND = 14;

  let cellHeight = canvas.height / 20;
  let cellWidth = canvas.width / 30;

  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawTexture(image, center, size) {
    context.save();

    context.translate(center.x, center.y);
    context.translate(-center.x, -center.y);

    context.drawImage(
      image,
      center.x - size.x / 2,
      center.y - size.y / 2,
      size.x,
      size.y
    );

    context.restore();
  }

  function drawText(spec) {
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fillStyle;
    context.strokeStyle = spec.strokeStyle;
    context.textBaseline = "top";

    context.translate(spec.position.x, spec.position.y);
    context.rotate(spec.rotation);
    context.translate(-spec.position.x, -spec.position.y);

    context.fillText(spec.text, spec.position.x, spec.position.y);
    context.strokeText(spec.text, spec.position.x, spec.position.y);

    context.restore();
  }

  function drawSubTexture(
    image,
    index,
    subTextureWidth,
    center,
    rotation,
    size
  ) {
    context.save();

    context.translate(center.x, center.y);
    context.rotate(rotation);
    context.translate(-center.x, -center.y);

    //
    // Pick the selected sprite from the sprite sheet to render
    context.drawImage(
      image,
      subTextureWidth * index,
      0, // Which sub-texture to pick out
      subTextureWidth,
      image.height, // The size of the sub-texture
      center.x - size.x / 2, // Where to draw the sub-texture
      center.y - size.y / 2,
      size.x,
      size.y
    );

    context.restore();
  }

  let api = {
    clear: clear,
    drawTexture: drawTexture,
    drawText: drawText,
    drawSubTexture: drawSubTexture,
    canvas,
    HEIGHT_BOUND,
    cellHeight,
    cellWidth,
    rows: 20,
    columns: 30,
  };

  return api;
})();
