MyGame.screens['high-scores'] = (function(game) {
    'use strict';

    function initialize() {
        document.getElementById('hs-to-main').addEventListener('click', () => {
            game.showScreen('main-menu')
        })
    }
    
    function run() {
        // nothing to run
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
