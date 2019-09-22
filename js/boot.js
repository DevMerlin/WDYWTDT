var bootState = {
    preload: function() {
        game.stage.backgroundColor = "#01021a", game.load.image("LoadingBar", "images/preloadBar.png")
    },
    create: function() {
        resizeGame(), game.state.start("load")
    }
};