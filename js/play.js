var ready = !1,
    R1Scroll = !1,
    R2Scroll = !1,
    R3Scroll = !1,
    R4Scroll = !1,
    R1Hold = !1,
    R2Hold = !1,
    R3Hold = !1,
    R4Hold = !1,
    R1Timer = null,
    R2Timer = null,
    R3Timer = null,
    R4Timer = null,
    ReelSpeed = 55,
    R1Result = 0,
    R2Result = 0,
    R3Result = 0,
    R4Result = 0,
    lastActualResult, HoldsAvaliable = 0,
    canSpin = !0,
    SpriteReel = [],
    SpritePositions = [0, 128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280, 1408],
    SpriteResults = ["Game", "Netflix", "Party", "Date", "Book", "TV", "Park", "Music", "Relax", "Food", "Drink", "Movies"],
    spaceKey, GateSprite, f = 0,
    lightTintDark = 11122,
    lightTintLight = 10536191,
    largeSpinButton, infoButtonHidden, suggestionsButton, holdButtons = [],
    LightNotifications = [],
    holdText = [],
    roundBaseText, currencyText, playerData, playerE, playerW, pCity, pRegion, SearchTarget, soundKeys = ["ButtonClickOne", "click_deal", "WheelLoop", "spin_stop", "Overworld_Win", "PinballWin", "TireDamageWin", "win_extra_large"],
    winKeys = ["Overworld_Win", "PinballWin", "TireDamageWin"],
    sounds = {},
    playState = {
        create: function() {
            this.start(), this.setupGame(), this.CreateButtons(), ready = !0
        },
        start: function() {
            playerData = game.cache.getJSON("data"), playerE = playerData.playerData.geolocE, playerW = playerData.playerData.geolocW, pCity = playerData.playerData.city, pRegion = playerData.playerData.region, game.stage.backgroundColor = "#01021a", game.world.resize(SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT), game.camera.x = SAFE_ZONE_WIDTH / 2, game.camera.y = 0, spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            for (var t = 0; t < soundKeys.length; t++) sounds[soundKeys[t]] = game.add.audio(soundKeys[t]);
            sounds.WheelLoop.volume = .2, sounds.Overworld_Win.volume = .55, sounds.PinballWin.volume = .55, sounds.TireDamageWin.volume = .55
        },
        setupGame: function() {
            gameBackground = game.add.sprite(106, 84, "Background"), gameBackground.height = 260, gameBackground.width = 504, gameBackground.x = SAFE_ZONE_WIDTH / 2 - gameBackground.width / 2, SpriteReel.push(game.add.tileSprite(gameBackground.x + 15, gameBackground.y, 128, 1536, "Reel")), SpriteReel.push(game.add.tileSprite(gameBackground.x + 142, gameBackground.y, 128, 1536, "Reel")), SpriteReel.push(game.add.tileSprite(gameBackground.x + 265, gameBackground.y, 128, 1536, "Reel")), SpriteReel.push(game.add.tileSprite(gameBackground.x + 390, gameBackground.y, 128, 1536, "Reel")), SpriteReel[0].scale.setTo(.75, .75), SpriteReel[1].scale.setTo(.75, .75), SpriteReel[2].scale.setTo(.75, .75), SpriteReel[3].scale.setTo(.75, .75), GateSprite = game.add.sprite(146, 530, "GateSprite"), game.add.sprite(0, 0, "Foreground"), game.add.sprite(GateSprite.x + 470, GateSprite.y + 150, "GateLock").scale.setTo(.65, .6);
            var t = SpritePositions[Math.ceil(Math.random() * SpritePositions.length) - 1],
                e = SpritePositions[Math.ceil(Math.random() * SpritePositions.length) - 1],
                i = SpritePositions[Math.ceil(Math.random() * SpritePositions.length) - 1],
                o = SpritePositions[Math.ceil(Math.random() * SpritePositions.length) - 1];
            LightNotifications.push(game.add.sprite(145, 730, "Light")), LightNotifications.push(game.add.sprite(624, 730, "Light")), LightNotifications[0].height = 30, LightNotifications[1].height = 30, LightNotifications[0].tint = lightTintDark, LightNotifications[1].tint = lightTintDark, SpriteReel[0].tilePosition.y += t, SpriteReel[1].tilePosition.y += e, SpriteReel[2].tilePosition.y += i, SpriteReel[3].tilePosition.y += o
        },
        CreateButtons: function() {
            largeSpinButton = game.add.button(152, 418, "largeButton", this.setSpin, this, "Large_Button_Lit", "Large_Button_Pressed", "Large_Button_Pressed"), (infoButtonHidden = game.add.button(148, 764, "largeButton", this.triggerInfoPage, this, "Large_Button_Lit", "Large_Button_Pressed", "Large_Button_Pressed")).height = 30, infoButtonHidden.width = infoButtonHidden.width + 8, infoButtonHidden.alpha = 0;
            var t = {
                    font: "24px Franklin Gothic Medium",
                    fill: "#e1e1e1",
                    align: "center"
                },
                e = {
                    font: "14px Franklin Gothic Medium",
                    fill: "#e1e1e1",
                    align: "center"
                },
                i = {
                    font: "14px Franklin Gothic Medium",
                    fill: "#000000",
                    align: "center"
                };
            game.add.text(largeSpinButton.x + 60, largeSpinButton.y + 5, "Click to spin and decide what to do!", t), game.add.text(infoButtonHidden.x + 20, infoButtonHidden.y + 8, "About these Slots - For Entertainment Only - Beta 0.10 produced June 2017", i);
            (suggestionsButton = game.add.button(180, 730, "largeButton", this.GoogleSearchParameters, this, "Large_Button_Lit", "Large_Button_Pressed", "Large_Button_Pressed")).height = 30, suggestionsButton.width = suggestionsButton.width - 56;
            game.add.text(suggestionsButton.x + 40, suggestionsButton.y + 6, "Click Here for ideas based on your results! (External Google)", e);
            suggestionsButton.input.enabled = !1, roundBaseText = game.add.bitmapText(152, 472, "repe", "", 16), currencyText = game.add.bitmapText(120, 16, "repe", "", 18), holdButtons.push(game.add.button(152, 370, "smallButton", function() {
                this.R1TriggerHold()
            }, this, "Small_Button_Lit", "Small_Button_Disabled", "Small_Button")), holdButtons.push(game.add.button(278, 370, "smallButton", function() {
                this.R2TriggerHold()
            }, this, "Small_Button_Lit", "Small_Button_Disabled", "Small_Button")), holdButtons.push(game.add.button(403, 370, "smallButton", function() {
                this.R3TriggerHold()
            }, this, "Small_Button_Lit", "Small_Button_Disabled", "Small_Button")), holdButtons.push(game.add.button(528, 370, "smallButton", function() {
                this.R4TriggerHold()
            }, this, "Small_Button_Lit", "Small_Button_Disabled", "Small_Button")), holdText.push(game.add.text(holdButtons[0].x + 35, holdButtons[0].y + 6, "Hold", t)), holdText.push(game.add.text(holdButtons[1].x + 35, holdButtons[1].y + 6, "Hold", t)), holdText.push(game.add.text(holdButtons[2].x + 35, holdButtons[2].y + 6, "Hold", t)), holdText.push(game.add.text(holdButtons[3].x + 35, holdButtons[3].y + 6, "Hold", t)), holdButtons[0].input.enabled = !1, holdButtons[1].input.enabled = !1, holdButtons[2].input.enabled = !1, holdButtons[3].input.enabled = !1
        },
        triggerInfoPage: function() {
            window.location.href = "/about.php"
        },
        R1TriggerHold: function() {
            HoldsAvaliable > 0 && !R1Hold && canSpin && (sounds.click_deal.play(), HoldsAvaliable--, R1Hold = !0)
        },
        R2TriggerHold: function() {
            HoldsAvaliable > 0 && !R2Hold && canSpin && (sounds.click_deal.play(), HoldsAvaliable--, R2Hold = !0)
        },
        R3TriggerHold: function() {
            HoldsAvaliable > 0 && !R3Hold && canSpin && (sounds.click_deal.play(), HoldsAvaliable--, R3Hold = !0)
        },
        R4TriggerHold: function() {
            HoldsAvaliable > 0 && !R4Hold && canSpin && (sounds.click_deal.play(), HoldsAvaliable--, R4Hold = !0)
        },
        R1TimerTrigger: function() {
            R1Scroll = !1, R1Timer.stop(), R1Hold || game.add.tween(SpriteReel[0].tilePosition).to({
                y: R1Result + 128
            }, 250, Phaser.Easing.Linear.In, !0)
        },
        R2TimerTrigger: function() {
            R2Scroll = !1, R2Timer.stop(), R2Hold || game.add.tween(SpriteReel[1].tilePosition).to({
                y: R2Result + 128
            }, 250, Phaser.Easing.Linear.In, !0)
        },
        R3TimerTrigger: function() {
            R3Scroll = !1, R3Timer.stop(), R3Hold || game.add.tween(SpriteReel[2].tilePosition).to({
                y: R3Result + 128
            }, 250, Phaser.Easing.Linear.In, !0)
        },
        R4TimerTrigger: function() {
            R4Scroll = !1, R4Timer.stop(), R4Hold || game.add.tween(SpriteReel[3].tilePosition).to({
                y: R4Result + 128
            }, 250, Phaser.Easing.Linear.In, !0), (HoldsAvaliable += 1) > 0 ? (holdButtons[0].input.enabled = !0, holdButtons[1].input.enabled = !0, holdButtons[2].input.enabled = !0, holdButtons[3].input.enabled = !0) : (holdButtons[0].input.enabled = !1, holdButtons[1].input.enabled = !1, holdButtons[2].input.enabled = !1, holdButtons[3].input.enabled = !1), canSpin = !0, R4Hold = !1, R3Hold = !1, R2Hold = !1, R1Hold = !1, this.determinWinStatus()
        },
        setSpin: function() {
            canSpin && (roundBaseText.text = "", suggestionsButton.input.enabled = !1, LightNotifications[0].tint = lightTintDark, LightNotifications[1].tint = lightTintDark, sounds.spin_stop.play(), R1Scroll = !0, R2Scroll = !0, R3Scroll = !0, R4Scroll = !0, R1Timer = game.time.create(!0), R2Timer = game.time.create(!0), R3Timer = game.time.create(!0), R4Timer = game.time.create(!0), R1Timer.loop(3e3, this.R1TimerTrigger, this), R2Timer.loop(4e3, this.R2TimerTrigger, this), R3Timer.loop(5e3, this.R3TimerTrigger, this), R4Timer.loop(6e3, this.R4TimerTrigger, this), R1Hold || (R1Result = SpritePositions[Math.ceil(Math.random() * SpritePositions.length - 1)]), R2Hold || (R2Result = SpritePositions[Math.ceil(Math.random() * SpritePositions.length - 1)]), R3Hold || (R3Result = SpritePositions[Math.ceil(Math.random() * SpritePositions.length - 1)]), R4Hold || (R4Result = SpritePositions[Math.ceil(Math.random() * SpritePositions.length - 1)]), R1Timer.start(), R2Timer.start(), R3Timer.start(), R4Timer.start(), canSpin = !1)
        },
        determinWinStatus: function() {
            var t = SpriteResults[SpritePositions.indexOf(R1Result)],
                e = SpriteResults[SpritePositions.indexOf(R2Result)],
                i = SpriteResults[SpritePositions.indexOf(R3Result)],
                o = SpriteResults[SpritePositions.indexOf(R4Result)],
                a = 0;
            return 0 == t.localeCompare(e) && 0 == i.localeCompare(o) ? (this.thePlayerWins(t, 3), void a++) : 0 == t.localeCompare(e) ? (this.thePlayerWins(t, 3), void a++) : 0 == e.localeCompare(i) ? (this.thePlayerWins(e, 3), void a++) : 0 == i.localeCompare(o) ? (this.thePlayerWins(i, 3), void a++) : void(0 == a && this.thePlayerLoses())
        },
        thePlayerWins: function(t, e) {
            Math.random();
            var i = Math.floor(Math.random() * winKeys.length);
            switch (sounds[winKeys[i]].play(), lastActualResult = t, t) {
                case "Game":
                    roundBaseText.text = "If there's nothing to do outside, \nstay in and play a game!";
                    break;
                case "Netflix":
                    roundBaseText.text = "Sometimes it is better to just relax. \nWatch Netflix and Chill", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "Party":
                    roundBaseText.text = "Are there meetups or parties nearby? \nGet out and go join one!", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "Date":
                    roundBaseText.text = "Take a loved one out on a date. \nReroll again for an idea?";
                    break;
                case "Book":
                    roundBaseText.text = "Another day to stay in \nGet your Kindle or read a physical book.", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "TV":
                    roundBaseText.text = "Sometimes you just want to see \nsomething random. Turn on the TV!", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "Park":
                    roundBaseText.text = "Is it a great day out? \n(Check the weather) Head out to a park!", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "Music":
                    roundBaseText.text = "Either that from your own collection \nor out at a club, go enjoy some music!";
                    break;
                case "Relax":
                    roundBaseText.text = "Stay home today. Relax, play with pets, \nor just sprawl in a lawn chair/hammock.";
                    break;
                case "Food":
                    roundBaseText.text = "Make a great meal, or alternatively \ngo out to eat at a restraunt!", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "Drink":
                    roundBaseText.text = "Sometimes you don't want the noise of \na club - go for a drink at a bar.", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight;
                    break;
                case "Movies":
                    roundBaseText.text = "Are there any good movies playing \nin the area? Choose one and go watch!", suggestionsButton.input.enabled = !0, LightNotifications[0].tint = lightTintLight, LightNotifications[1].tint = lightTintLight
            }
        },
        thePlayerLoses: function() {
            roundBaseText.text = "There were no winning ideas this time.\nPlease spin the wheel again!"
        },
        GoogleSearchParameters: function() {
            switch (lastActualResult) {
                case "Netflix":
                    SearchTarget = "Shows+to+watch+on+Netflix";
                    break;
                case "Party":
                    SearchTarget = "What+kind+of+meetups+are+near+" + pCity + "," + pRegion;
                    break;
                case "Book":
                    SearchTarget = "Which+books+are+popular+right+now?";
                    break;
                case "TV":
                    SearchTarget = "What+is+showing+on+TV+tonight+near+" + pCity + "," + pRegion;
                    break;
                case "Park":
                    SearchTarget = "Locate+parks+near+" + pCity + "," + pRegion;
                    break;
                case "Food":
                    SearchTarget = "Are+there+any+good+restaurants+near+" + pCity + "," + pRegion;
                    break;
                case "Drink":
                    SearchTarget = "Locate+bars+near+" + pCity + "," + pRegion;
                    break;
                case "Movies":
                    SearchTarget = "What+movies+are+currently+showing+close+to+" + pCity + "," + pRegion
            }
            window.location.href = "https://www.google.com/search?&q=" + SearchTarget
        },
        update: function() {
            this.f++, ready && (currencyText.text = "Holds: " + HoldsAvaliable + " - Other Collectables Disabled"), f % 20 == 0 && (R1Scroll || R2Scroll || R3Scroll || R4Scroll) ? sounds.WheelLoop.play() : sounds.WheelLoop.stop(), R1Scroll && !R1Hold && (SpriteReel[0].tilePosition.y += ReelSpeed), R2Scroll && !R2Hold && (SpriteReel[1].tilePosition.y += ReelSpeed), R3Scroll && !R3Hold && (SpriteReel[2].tilePosition.y += ReelSpeed), R4Scroll && !R4Hold && (SpriteReel[3].tilePosition.y += ReelSpeed)
        }
    };