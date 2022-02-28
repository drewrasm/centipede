MyGame.screens["gameplay"] = (function (
  game,
  keyboard,
  pieces,
  graphics,
  renderer
) {
  "use strict";

  let canvas = document.getElementById("id-canvas");

  // break the canvas into 20 pieces
  // let the player move in the first 6 pieces
  // make a player object

  let player = pieces.player({
    width: graphics.cellWidth,
    height: graphics.cellHeight,
    center: {
      x: canvas.width / 2 + 10,
      y: graphics.cellHeight * graphics.HEIGHT_BOUND,
    },
    imageSrc: "images/wand.png",
    moveRate: .95
  });

  let mushroomExample = pieces.mushroom({
    width: graphics.cellWidth,
    height: graphics.cellHeight,
    center: {
      x: canvas.width / 2 + 50,
      y: graphics.cellHeight * graphics.HEIGHT_BOUND,
    },
    imageSrc: "images/mushroom.png"
  })

  // make a centipede body object
  // make a centipede head object
  // make a mushroom object
  // make a poison mushroom object

  let gameKeyboard = keyboard();

  let lastTimeStamp = performance.now();
  let totalTime = 0;
  let cancelNextRequest = true;

  const updateKeys = () => {
    gameKeyboard.register(window.localStorage.getItem("up") || 'ArrowUp', player.moveUp);
    gameKeyboard.register(window.localStorage.getItem("down") || 'ArrowDown', player.moveDown);
    gameKeyboard.register(
      window.localStorage.getItem("right") || 'ArrowRight',
      player.moveRight
    );
    gameKeyboard.register(
      window.localStorage.getItem("left") || 'ArrowLeft',
      player.moveLeft
    );
  }

  function processInput(elapsedTime) {
    gameKeyboard.update(elapsedTime);
  }

  function update(elapsedTime) {
    updateKeys()
  }

  function render() {
    graphics.clear();
    renderer.player.render(player);
    renderer.mushroom.render(mushroomExample);
  }

  function gameLoop(time) {
    let elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;
    totalTime += elapsedTime;

    processInput(elapsedTime);
    update(elapsedTime);
    render();

    if (!cancelNextRequest) {
      requestAnimationFrame(gameLoop);
    }
  }

  function initialize() {
    updateKeys()
    document.getElementById('game-to-main').addEventListener('click', () => {
      cancelNextRequest = true;
      game.showScreen('main-menu')
    })
  }

  function run() {
    lastTimeStamp = performance.now();
    cancelNextRequest = false;
    requestAnimationFrame(gameLoop);
  }

  return {
    initialize: initialize,
    run: run,
  };
})(
  MyGame.game,
  MyGame.keyboard,
  MyGame.pieces,
  MyGame.graphics,
  MyGame.renderer
);
