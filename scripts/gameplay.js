MyGame.screens["gameplay"] = (function (game) {
    "use strict";
  
    function initialize() {
      document.getElementById('game-to-main').addEventListener("click", () => {
          game.showScreen("main-menu");
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
  