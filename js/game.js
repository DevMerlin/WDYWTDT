function loadGame() {
    game = new Phaser.Game(SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT, Phaser.CANVAS, "gridworld"), game.state.add("boot", bootState), game.state.add("load", loadState), game.state.add("play", playState), game.state.start("boot")
}

function resizeGame() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, game.scale.pageAlignHorizontally = !0, game.scale.pageAlignVertically = !0, game.scale.parentIsWindow = !0, game.camera.x = game.width / 2, game.camera.y = game.camera.y
}

function HideAd() {
    $(".adSlot").hide()
}
var SAFE_ZONE_WIDTH = 800,
    SAFE_ZONE_HEIGHT = 800;