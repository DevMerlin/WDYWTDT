var preloadBar, loadState = {
    preload: function() {
        (preloadBar = game.add.sprite(25, game.world.centerY, "LoadingBar")).anchor.setTo(0, .5), game.load.setPreloadSprite(preloadBar);
        for (var a = ["ButtonClickOne", "click_deal", "WheelLoop", "spin_stop", "Overworld_Win", "PinballWin", "TireDamageWin"], e = 0; e < a.length; e++) game.load.audio(a[e], "assets/sounds/" + a[e] + ".mp3");
        game.load.json("data", "data.php"), game.load.bitmapFont("repe", "images/fonts/repetition/repe_0.png", "images/fonts/repetition/repe.xml"), game.load.image("Foreground", "images/WindowForeground.png"), game.load.image("Background", "images/WindowBackground.png"), game.load.image("GateSprite", "images/WeatherGate.png"), game.load.image("GateLock", "images/LockSymbol.png"), game.load.image("Light", "images/Light.png"), game.load.atlasJSONHash("largeButton", "images/LargeButtonFrames.png", "images/LargeButtonFrames.json"), game.load.atlasJSONHash("smallButton", "images/SmallButtonFrames.png", "images/SmallButtonFrames.json"), game.load.image("Reel", "images/SlotReel.png")
    },
    create: function() {
        var a = game.time.create(!0);
        a.loop(4e3, this.waitComplete, this), a.start()
    },
    waitComplete: function() {
        HideAd(), game.state.start("play")
    }
};