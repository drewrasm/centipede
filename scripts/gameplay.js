MyGame.screens["gameplay"] = (function (
  game,
  keyboard,
  pieces,
  graphics,
  renderer
) {
  "use strict";

  let canvas = document.getElementById("id-canvas");

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  let mushrooms = [];

  const generateMushrooms = () => {
    mushrooms = [];
    for (let row = 0; row <= graphics.rows; row++) {
      let randMushCount = randomNumber(1, 2);
      let randColumns = [];
      for (let m = 0; m <= randMushCount; m++) {
        let column = randomNumber(1, graphics.columns);
        if (!randColumns.includes(column)) {
          randColumns.push(randomNumber(1, graphics.columns));
        }
      }
      for (let col of randColumns) {
        mushrooms.push(
          pieces.mushroom({
            width: graphics.cellWidth * 0.75,
            height: graphics.cellHeight * 0.75,
            center: {
              x: col * graphics.cellWidth + graphics.cellWidth / 2,
              y: row * graphics.cellHeight + graphics.cellHeight / 2,
            },
            imageSrc: "images/mushroom.png",
          })
        );
      }
    }
  };

  generateMushrooms();

  const isIntersecting = (first, second) => {
    return (
      !(
        first.center.y - first.height / 2 >
          second.center.y + second.height / 2 ||
        first.center.y + first.height / 2 < second.center.y - second.height / 2
      ) &&
      !(
        first.center.x + first.width / 2 < second.center.x - second.width / 2 ||
        first.center.x - first.width / 2 > second.center.x + second.width / 2
      )
    );
  };

  let lazers = []

  const handleLazer = (lazerCenter) => {
    // create a new lazer and let it do it's thang
    lazers.push(pieces.lazer({
      width: graphics.cellWidth * .2,
      height: graphics.cellHeight * .9,
      center: {...lazerCenter, y: lazerCenter.y - graphics.cellHeight },
      imageSrc: "images/lazer.png",
    }))
  }

  let player = pieces.player({
    width: graphics.cellWidth * 0.65,
    height: graphics.cellHeight * 0.65,
    center: {
      x: canvas.width / 2 + 10,
      y: graphics.cellHeight * graphics.HEIGHT_BOUND,
    },
    imageSrc: "images/wand.png",
    moveRate: 0.55,
    barriers: mushrooms,
    checkIntersect: isIntersecting,
    handleLazer: handleLazer
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
    let fireKey = null;
    // figure this out better lol
    if (window.localStorage.getItem("fire") === "Space") {
      fireKey = " ";
    }
    gameKeyboard.register(fireKey || " ", player.fire);
  };

  function processInput(elapsedTime) {
    gameKeyboard.update(elapsedTime);
  }

  function update(elapsedTime) {
    updateKeys();

    // check if mushrooms have been hit by their lazers, change their image or remove them from the map
    player.barriers = mushrooms;
  }

  function render() {
    graphics.clear();
    renderer.player.render(player);
    for (let m of mushrooms) {
      renderer.mushroom.render(m);
    }
    for (let l of lazers) {
      renderer.lazer.render(l);
    }
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
