// ------------------------------------------------------------------
// main game object
// ------------------------------------------------------------------

MyGame.game = (function (screens) {
  "use strict";

  function showScreen(id) {
    let active = document.getElementsByClassName("active");
    for (let screen = 0; screen < active.length; screen++) {
      active[screen].classList.remove("active");
    }
    screens[id].run();
    document.getElementById(id).classList.add("active");
  }

  document.addEventListener("keypress", (e) => {
    if (e.key === "Escape") {
      showScreen("main-menu");
    }
  });

  function initialize() {
    let screen = null;
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize();
      }
    }
    showScreen("main-menu");
  }

  return {
    initialize: initialize,
    showScreen: showScreen,
  };
})(MyGame.screens);
