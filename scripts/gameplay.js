MyGame.screens["gameplay"] = (function (
  game,
  keyboard,
  pieces,
  graphics,
  renderer
) {
  "use strict";

  let canvas = document.getElementById("id-canvas");


  const isIntersecting = (first, second) => {
    return (
      !(
        first.center.y - first.height / 2 >
          second.center.y + second.height / 2 ||
        first.center.y + first.height / 2 < second.center.y - second.height / 2
      ) &&
      !(first.center.x + first.width / 2 < second.center.x - second.width / 2 ||
        first.center.x - first.width / 2 > second.center.x + second.width / 2)
    );
  };

  let player = pieces.player({
    width: graphics.cellWidth,
    height: graphics.cellHeight,
    center: {
      x: canvas.width / 2 + 10,
      y: graphics.cellHeight * graphics.HEIGHT_BOUND,
    },
    imageSrc: "images/wand.png",
    moveRate: 0.85,
    barriers: [],
    checkIntersect: isIntersecting,
  });

  let lazerExample = pieces.lazer({
    width: graphics.cellWidth / 5,
    height: graphics.cellHeight,
    center: {
      x: canvas.width / 2 + 80,
      y: graphics.cellHeight * graphics.HEIGHT_BOUND,
    },
    imageSrc: "images/lazer.png",
  });

  // make a centipede body object
  // make a centipede head object
  // make a poison mushroom object

  let gameKeyboard = keyboard();

  let lastTimeStamp = performance.now();
  let totalTime = 0;
  let cancelNextRequest = true;

  const updateKeys = () => {
    gameKeyboard.register(
      window.localStorage.getItem("up") || "ArrowUp",
      player.moveUp
    );
    gameKeyboard.register(
      window.localStorage.getItem("down") || "ArrowDown",
      player.moveDown
    );
    gameKeyboard.register(
      window.localStorage.getItem("right") || "ArrowRight",
      player.moveRight
    );
    gameKeyboard.register(
      window.localStorage.getItem("left") || "ArrowLeft",
      player.moveLeft
    );
  };

  function processInput(elapsedTime) {
    gameKeyboard.update(elapsedTime);
    if(isIntersecting(player, mushroomExample)) {
      console.log('intersecting')
    } else {

    }
  }

  function update(elapsedTime) {
    updateKeys();
  }

  function render() {
    graphics.clear();
    renderer.player.render(player);
    renderer.mushroom.render(mushroomExample);
    renderer.lazer.render(lazerExample);
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
    updateKeys();
    document.getElementById("game-to-main").addEventListener("click", () => {
      cancelNextRequest = true;
      game.showScreen("main-menu");
    });
    window.isIntersecting = isIntersecting;
    window.player = player;
    window.mushroomExample = mushroomExample;
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
