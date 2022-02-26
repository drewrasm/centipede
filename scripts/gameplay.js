MyGame.screens["gameplay"] = (function (game, keyboard) {
  "use strict";

  let lastTimeStamp = performance.now();
  let totalTime = 0;
  let cancelNextRequest = true;

  function processInput(elapsedTime) {
  }

  function update(elapsedTime) {
  }

  function render() {
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
})(MyGame.game, MyGame.keyboard);
