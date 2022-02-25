MyGame.screens["about"] = (function (game) {
  "use strict";

  function initialize() {
    document.getElementById("about-to-main").addEventListener("click", () => {
      game.showScreen("main-menu");
    });
  }

  function run() {
    // nothing to run
  }

  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game);
