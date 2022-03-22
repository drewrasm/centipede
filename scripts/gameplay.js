MyGame.screens["gameplay"] = (function (
  game,
  keyboard,
  pieces,
  graphics,
  renderer
) {
  "use strict";

  const CENTIPEDE_LENGTH = 10;

  let canvas = document.getElementById("id-canvas");

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const remove = (array, item) => {
    let index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  };

  let mushrooms = [];

  const generateMushrooms = () => {
    mushrooms = [];
    for (let row = 2; row <= graphics.rows; row++) {
      let randMushCount = randomNumber(1, 2);
      let randColumns = [];
      for (let m = 0; m <= randMushCount; m++) {
        let column = randomNumber(2, graphics.columns - 2);
        if (!randColumns.includes(column)) {
          randColumns.push(randomNumber(2, graphics.columns - 2));
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

  let lazers = [];

  const handleLazer = (lazerCenter) => {
    // create a new lazer and let it do it's thang
    lazers.push(
      pieces.lazer({
        width: graphics.cellWidth * 0.2,
        height: graphics.cellHeight * 0.9,
        center: { ...lazerCenter, y: lazerCenter.y - graphics.cellHeight / 4 },
        imageSrc: "images/lazer.png",
      })
    );
  };

  let lives = [];

  for (let i = 0; i < 3; i++) {
    lives.push(
      pieces.life({
        width: graphics.cellWidth * 0.65,
        height: graphics.cellHeight * 0.65,
        center: {
          x: canvas.width / 2 + i * graphics.cellWidth,
          y: graphics.cellWidth / 2,
        },
        imageSrc: "images/wand.png",
      })
    );
  }

  let player = pieces.player({
    width: graphics.cellWidth * 0.65,
    height: graphics.cellHeight * 0.65,
    center: {
      x:
        (graphics.columns / 2 + 1) * graphics.cellWidth +
        graphics.cellWidth / 2,
      y: (graphics.rows - 4) * graphics.cellHeight + graphics.cellHeight / 2,
    },
    imageSrc: "images/wand.png",
    moveRate: 0.55,
    barriers: mushrooms,
    checkIntersect: isIntersecting,
    handleLazer: handleLazer,
  });

  const handlePlayerHit = () => {
    player.setIsInPlay(false);
    lives.pop()
    setTimeout(() => {
      player.setIsInPlay(true);
    }, 1000)
  }

  let score = 0;
  let scoreText = pieces.text({
    text: score,
    font: `${graphics.cellHeight * 0.8}pt Arial`,
    fillStyle: " #cccccc",
    strokeStyle: " #cccccc",
    position: { x: graphics.canvas.width / 4, y: 2 },
  });

  let centipedeMoveTime = 0;

  let centipedePieces = [];

  const generateCentipede = () => {
    centipedePieces = [];
    for (let segment = 1; segment <= CENTIPEDE_LENGTH; segment++) {
      let piece = pieces.centipede({
        size: { x: graphics.cellWidth * 2, y: graphics.cellHeight },
        center: {
          x: graphics.cellWidth / 2 + graphics.cellWidth * segment,
          y: (graphics.cellHeight / 2) * 3,
        },
        isHead: segment == CENTIPEDE_LENGTH,
        goingEast: true,
      });
      piece.setRotation("east");
      centipedePieces.push(piece);
    }
  };

  generateCentipede();

  let centipedeRender = renderer.AnimatedModel(
    {
      spriteSheet: "images/centipede-body.png",
      spriteCount: 8,
      spriteTime: [25, 25, 25, 25, 25, 25, 25, 25],
    },
    graphics
  );

  let centipedeHeadRender = renderer.AnimatedModel(
    {
      spriteSheet: "images/centipede-head.png",
      spriteCount: 8,
      spriteTime: [25, 25, 25, 25, 25, 25, 25, 25],
    },
    graphics
  );

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

    player.barriers = mushrooms;
    for (let l of lazers) {
      let hitObstacle = false;
      for (let m of mushrooms) {
        if (isIntersecting(l, m)) {
          hitObstacle = true;
          score += 600;
          m.loseLife();
          if (m.lives === 0) {
            remove(mushrooms, m);
          }
        }
      }
      for(let centipede of centipedePieces) {
        if(isIntersecting(centipede, l)) {
          hitObstacle = true;
          score += 1000;
          remove(centipedePieces, centipede)
          mushrooms.push(
            pieces.mushroom({
              width: graphics.cellWidth * 0.75,
              height: graphics.cellHeight * 0.75,
              center: {
                x: centipede.center.x,
                y: centipede.center.y,
              },
              imageSrc: "images/mushroom.png",
            })
          );
          // split the centipede
        }
      }

      if (l.center.y > 0 - graphics.cellHeight && !hitObstacle) {
        l.updateMovement(elapsedTime);
      } else {
        remove(lazers, l);
      }
    }

    centipedeMoveTime += elapsedTime;
    if (centipedeMoveTime > 80) {
      for (let centipede of centipedePieces) {
        // check if the centipede was traveling north or south
        let isTravelingNorS =
          centipede.rotation == centipede.directions.north ||
          centipede.rotation == centipede.directions.south;

        let isHittingXBarrier =
          centipede.center.x ==
            graphics.cellWidth * graphics.columns - graphics.cellWidth / 2 ||
          centipede.center.x == graphics.cellWidth / 2;

        let isHittingYBarrier =
          centipede.center.y ==
            graphics.cellHeight * graphics.rows - graphics.cellHeight / 2 ||
          centipede.center.y == (graphics.cellHeight / 2) * 3;

        if (isTravelingNorS) {
          if (centipede.goingEast) {
            centipede.setRotation("east");
          } else {
            centipede.setRotation("west");
          }
        }

        // check if the piece hit the x barrier and needs to go down or up
        else if (isHittingXBarrier) {
          if (isHittingYBarrier && centipede.isPastStart) {
            centipede.toggleGoingNorth();
            centipede.setIsPastStart(false);
          } else {
            centipede.setIsPastStart();
          }

          if (centipede.goingNorth) {
            centipede.setRotation("north");
          } else {
            centipede.setRotation("south");
          }
          centipede.toggleGoingEast();
        }

        // check if the centipede hit a mushroom
        for (let m of mushrooms) {
          if (isIntersecting(centipede, m)) {
            if (
              centipede.rotation == centipede.directions.east ||
              centipede.rotation == centipede.directions.west
            ) {
              if (isHittingYBarrier && centipede.isPastStart) {
                centipede.toggleGoingNorth();
                centipede.setIsPastStart(false);
              } else {
                centipede.setIsPastStart();
              }
              if (centipede.goingNorth) {
                centipede.setRotation("north");
              } else {
                centipede.setRotation("south");
              }
            }
            centipede.toggleGoingEast();
          }
        }

        // check if it hits a player
        if(isIntersecting(centipede, player) && player.isInPlay) {
          // lose a life 
          handlePlayerHit();
        }

        centipede.move(elapsedTime);
      }
      centipedeMoveTime = 0;
    }

    centipedeRender.update(elapsedTime);
    centipedeHeadRender.update(elapsedTime);

    scoreText.updateText(score);
  }

  function render() {
    graphics.clear();
    if(player.isInPlay) {
      renderer.player.render(player);
    }
    renderer.text.render(scoreText);
    for (let m of mushrooms) {
      renderer.mushroom.render(m);
    }
    for (let l of lazers) {
      renderer.lazer.render(l);
    }
    for (let life of lives) {
      renderer.life.render(life);
    }
    for (let centipede of centipedePieces) {
      if (centipede.isHead) {
        centipedeHeadRender.render(centipede);
      } else {
        centipedeRender.render(centipede);
      }
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
