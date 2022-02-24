MyGame.screens["main-menu"] = (function (game) {
  "use strict";

  /*
  - view credits ( about page )
  - view high scores
  - customize controls
  - new game
   */

  function initialize() {
    document.getElementById("to-about").addEventListener("click", () => {
      game.showScreen("about");
    });
    document.getElementById("to-hs").addEventListener("click", () => {
      game.showScreen("high-scores");
    });
    document.getElementById("to-controls").addEventListener("click", () => {
      game.showScreen("controls");
    });
    document.getElementById('to-game').addEventListener("click", () => {
        game.showScreen("gameplay");
    })
  }

  function run() {
    // nothing to run
  }

  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game);
