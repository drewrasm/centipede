MyGame.screens["high-scores"] = (function (game) {
  "use strict";

  function initialize() {
    document.getElementById("hs-to-main").addEventListener("click", () => {
      game.showScreen("main-menu");
    });
  }

  function run() {
    let scores = localStorage.getItem("scores") || "[]";
    scores = JSON.parse(scores);
    for (let s = 0; s < scores.length; s++) {
      document.getElementById(`${scores.length - s}-score`).innerHTML =
        scores[s];
    }
  }

  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game);
