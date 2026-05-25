namespace SpriteKind {
    export const PlayerOneBolt = SpriteKind.create()
    export const PlayerTwoBolt = SpriteKind.create()
    export const Smog = SpriteKind.create()
    export const Junk = SpriteKind.create()
    export const ArmoredJunk = SpriteKind.create()
    export const RepairCore = SpriteKind.create()
    export const Scenery = SpriteKind.create()
    export const Hud = SpriteKind.create()
}

const screenRight = 172
const screenLeft = -18
const playerSpeed = 200
const boltSpeed = 235

let player1: Sprite = null
let player2: Sprite = null
let shieldMeter: Sprite = null
let wave = 1
let planetShield = 100
let p1Score = 0
let p2Score = 0
let p1CanBeHit = true
let p2CanBeHit = true
let stormPulse = false

function shipOneImage(): Image {
    return img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 8 . . . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . 8 9 8 8 . . . . . . 
        . . . . . 8 9 9 9 8 . . . . . . 
        . . . . 8 9 9 1 9 8 8 . . . . . 
        . . 8 8 9 9 1 1 9 9 8 8 . . . . 
        . 8 9 9 9 1 1 1 9 9 9 8 8 . . . 
        8 9 9 9 1 1 1 1 9 9 9 9 8 8 . . 
        . 8 9 9 9 1 1 1 9 9 9 8 8 . . . 
        . . 8 8 9 9 1 1 9 9 8 8 . . . . 
        . . . . 8 9 9 9 8 . . . . . . . 
        . . . . . 8 9 8 . . . . . . . . 
        . . . . . . 5 . . . . . . . . . 
        . . . . . 4 5 4 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function shipTwoImage(): Image {
    return img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . 7 2 7 7 . . . . . . 
        . . . . . 7 2 2 2 7 . . . . . . 
        . . . . 7 2 2 1 2 7 7 . . . . . 
        . . 7 7 2 2 1 1 2 2 7 7 . . . . 
        . 7 2 2 2 1 1 1 2 2 2 7 7 . . . 
        7 2 2 2 1 1 1 1 2 2 2 2 7 7 . . 
        . 7 2 2 2 1 1 1 2 2 2 7 7 . . . 
        . . 7 7 2 2 1 1 2 2 7 7 . . . . 
        . . . . 7 2 2 2 7 . . . . . . . 
        . . . . . 7 2 7 . . . . . . . . 
        . . . . . . 5 . . . . . . . . . 
        . . . . . 4 5 4 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function boltImage(color: number): Image {
    if (color == 7) {
        return img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 7 7 . . . . . . . 
            . . . . . . 7 5 5 7 . . . . . . 
            . . . . 7 7 5 5 5 5 7 7 . . . . 
            . . 7 7 5 5 5 5 5 5 5 7 7 . . . 
            7 7 7 5 5 5 5 5 5 5 5 5 7 7 . . 
            . . 7 7 5 5 5 5 5 5 5 7 7 . . . 
            . . . . 7 7 5 5 5 5 7 7 . . . . 
            . . . . . . 7 5 5 7 . . . . . . 
            . . . . . . . 7 7 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `
    }
    return img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . 2 2 5 5 5 5 2 2 . . . . 
        . . 2 2 5 5 5 5 5 5 5 2 2 . . . 
        2 2 2 5 5 5 5 5 5 5 5 5 2 2 . . 
        . . 2 2 5 5 5 5 5 5 5 2 2 . . . 
        . . . . 2 2 5 5 5 5 2 2 . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function smogImage(): Image {
    return img`
        . . . . . f f f f . . . . . . . 
        . . . f f f d d f f . . . . . . 
        . . f f d d d d d f f . . . . . 
        . f f d d f d d d d f f . . . . 
        f f d d d d d f d d d f f . . . 
        f d d d f d d d d d d d f . . . 
        f d d d d d d d f d d d f f . . 
        . f d d d d f d d d d d d f . . 
        . f f d d d d d d d f d f f . . 
        . . f f d f d d d d d f f . . . 
        . . . f f d d d f d f f . . . . 
        . . . . f f f d d f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function junkImage(): Image {
    return img`
        . . . . . . c c c . . . . . . . 
        . . . . c c b b b c c . . . . . 
        . . . c b b b b b b b c . . . . 
        . . c b b f b b b f b b c . . . 
        . c b b b b b b b b b b b c . . 
        c b b b b b b b b b b b b b c . 
        c b b b b f f f f b b b b b c . 
        c b b b f e e e e f b b b b c . 
        . c b b f e e e e f b b b c . . 
        . c b b b f f f f b b b b c . . 
        . . c b b b b b b b b b c . . . 
        . . . c b b b b b b b c . . . . 
        . . . . c c b b b c c . . . . . 
        . . . . . . c c c . . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function armoredJunkImage(): Image {
    return img`
        . . . . . 8 8 8 8 . . . . . . . 
        . . . 8 8 6 6 6 6 8 8 . . . . . 
        . . 8 6 6 6 6 6 6 6 6 8 . . . . 
        . 8 6 6 1 6 6 6 1 6 6 8 . . . . 
        8 6 6 6 6 8 8 6 6 6 6 8 . . . . 
        8 6 6 6 8 9 9 8 6 6 6 8 . . . . 
        8 6 6 8 9 9 9 9 8 6 6 8 . . . . 
        . 8 6 8 9 9 9 9 8 6 8 . . . . . 
        . 8 6 6 8 9 9 8 6 6 8 . . . . . 
        . . 8 6 6 8 8 6 6 8 . . . . . . 
        . . . 8 6 6 6 6 8 . . . . . . . 
        . . . . 8 8 8 8 . . . . . . . . 
        . . . . . 8 . 8 . . . . . . . . 
        . . . . 8 . . . 8 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function repairCoreImage(): Image {
    return img`
        . . . . . . 7 7 7 7 . . . . . . 
        . . . . 7 7 5 5 5 5 7 7 . . . . 
        . . . 7 5 5 5 1 1 5 5 5 7 . . . 
        . . 7 5 5 1 1 1 1 1 5 5 7 . . . 
        . 7 5 5 1 1 7 7 1 1 5 5 7 . . . 
        . 7 5 1 1 7 7 7 7 1 1 5 7 . . . 
        7 5 5 1 1 7 7 7 7 1 1 5 5 7 . . 
        7 5 5 1 1 7 7 7 7 1 1 5 5 7 . . 
        . 7 5 1 1 7 7 7 7 1 1 5 7 . . . 
        . 7 5 5 1 1 7 7 1 1 5 5 7 . . . 
        . . 7 5 5 1 1 1 1 1 5 5 7 . . . 
        . . . 7 5 5 5 1 1 5 5 5 7 . . . 
        . . . . 7 7 5 5 5 5 7 7 . . . . 
        . . . . . . 7 7 7 7 . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
    `
}

function updateShieldMeter() {
    let filled = Math.idiv(planetShield, 10)
    let meter = img`
        . . 1 1 1 1 1 1 1 1 1 1 . . 
        . 1 6 6 6 6 6 6 6 6 6 6 1 . 
        1 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 1 
        . 1 6 6 6 6 6 6 6 6 6 6 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 . . 
    `
    for (let column = 0; column < 10; column++) {
        if (column >= filled) {
            meter.setPixel(column + 2, 1, 2)
            meter.setPixel(column + 2, 2, 2)
            meter.setPixel(column + 2, 3, 2)
            meter.setPixel(column + 2, 4, 2)
        }
    }
    shieldMeter.setImage(meter)
}

function repairPlanet(amount: number) {
    planetShield += amount
    if (planetShield > 100) {
        planetShield = 100
    }
    updateShieldMeter()
}

function damagePlanet(amount: number) {
    planetShield += 0 - amount
    if (planetShield < 0) {
        planetShield = 0
    }
    updateShieldMeter()
    scene.cameraShake(3, 150)
    if (planetShield <= 0) {
        game.setDialogTextColor(1)
        game.setDialogFrame(img`
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
            2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 4 2 4 4 4 4 4 4 4 4 4 2 4 2 
            2 4 2 4 2 2 2 2 2 2 2 4 2 4 2 
            2 4 2 4 2 4 4 4 4 4 2 4 2 4 2 
            2 4 2 4 2 4 2 2 2 4 2 4 2 4 2 
            2 4 2 4 2 4 2 4 2 4 2 4 2 4 2 
            2 4 2 4 2 4 2 2 2 4 2 4 2 4 2 
            2 4 2 4 2 4 4 4 4 4 2 4 2 4 2 
            2 4 2 4 2 2 2 2 2 2 2 4 2 4 2 
            2 4 2 4 4 4 4 4 4 4 4 4 2 4 2 
            2 4 2 2 2 2 2 2 2 2 2 2 2 4 2 
            2 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `)
        game.showLongText("Der Planetenschutz ist zusammengebrochen.", DialogLayout.Bottom)
        game.over(false)
    }
}

function makeScenery() {
    effects.starField.startScreenEffect()
    scene.setBackgroundColor(15)

    let planet = sprites.create(img`
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . 7 7 6 6 6 7 7 6 7 7 . . . 
        . . 7 6 6 6 7 7 6 6 6 6 7 . . . 
        . 7 6 6 7 7 7 6 6 6 7 6 6 7 . . 
        . 7 6 7 7 7 6 6 6 7 7 6 6 7 . . 
        7 6 6 7 7 6 6 7 6 6 6 6 6 6 7 . 
        7 6 6 6 6 6 7 7 7 6 6 7 7 6 7 . 
        7 6 7 7 6 6 7 7 6 6 6 7 7 6 7 . 
        7 6 7 7 7 6 6 6 6 7 6 6 6 6 7 . 
        7 6 6 7 7 7 6 6 7 7 7 6 6 6 7 . 
        . 7 6 6 7 7 6 6 6 7 7 6 6 7 . . 
        . 7 6 6 6 6 6 7 6 6 6 6 7 7 . . 
        . . 7 6 6 7 7 7 6 6 6 7 7 . . . 
        . . . 7 7 6 6 6 6 6 7 7 . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . . . 7 7 . . . . . . . 
    `, SpriteKind.Scenery)
    planet.setPosition(26, 106)
    planet.z = -5

    for (let index = 0; index < 8; index++) {
        let star = sprites.create(img`
            . . 1 . . 
            . 1 5 1 . 
            1 5 5 5 1 
            . 1 5 1 . 
            . . 1 . . 
        `, SpriteKind.Scenery)
        star.setPosition(randint(10, 150), randint(8, 112))
        star.setVelocity(randint(-18, -5), 0)
        star.z = -10
        star.setFlag(SpriteFlag.Ghost, true)
    }

    shieldMeter = sprites.create(img`
        . . 1 1 1 1 1 1 1 1 1 1 . . 
        . 1 6 6 6 6 6 6 6 6 6 6 1 . 
        1 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 1 
        . 1 6 6 6 6 6 6 6 6 6 6 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 . . 
    `, SpriteKind.Hud)
    shieldMeter.setPosition(80, 7)
    shieldMeter.z = 100
    shieldMeter.setFlag(SpriteFlag.Ghost, true)
    updateShieldMeter()
}

function createPlayers() {
    player1 = sprites.create(shipOneImage(), SpriteKind.Player)
    player1.setPosition(18, 38)
    player1.setFlag(SpriteFlag.StayInScreen, true)
    controller.moveSprite(player1, playerSpeed, playerSpeed)
    info.player1.setLife(3)
    info.player1.setScore(0)

    player2 = sprites.create(shipTwoImage(), SpriteKind.Player)
    player2.setPosition(18, 82)
    player2.setFlag(SpriteFlag.StayInScreen, true)
    controller.player2.moveSprite(player2, playerSpeed, playerSpeed)
    info.player2.setLife(3)
    info.player2.setScore(0)
}

function fireBolt(owner: number) {
    if (owner == 1 && info.player1.hasLife()) {
        let bolt1 = sprites.createProjectileFromSprite(boltImage(7), player1, boltSpeed, 0)
        bolt1.setKind(SpriteKind.PlayerOneBolt)
        bolt1.z = 20
        music.pewPew.play()
    } else if (owner == 2 && info.player2.hasLife()) {
        let bolt2 = sprites.createProjectileFromSprite(boltImage(2), player2, boltSpeed, 0)
        bolt2.setKind(SpriteKind.PlayerTwoBolt)
        bolt2.z = 20
        music.pewPew.play()
    }
}

controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    fireBolt(1)
})

controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    fireBolt(2)
})

function spawnSmog() {
    let smog = sprites.create(smogImage(), SpriteKind.Smog)
    smog.setPosition(screenRight, randint(12, 112))
    smog.setVelocity(0 - (48 + wave * 5), randint(-24, 24))
    smog.z = 5
}

function spawnJunk() {
    let junk = sprites.create(junkImage(), SpriteKind.Junk)
    junk.setPosition(screenRight, randint(14, 110))
    junk.setVelocity(0 - (34 + wave * 4), randint(-12, 12))
    junk.z = 6
}

function spawnArmoredJunk() {
    let armored = sprites.create(armoredJunkImage(), SpriteKind.ArmoredJunk)
    armored.setPosition(screenRight, randint(18, 106))
    armored.setVelocity(0 - (28 + wave * 3), randint(-10, 10))
    armored.z = 7
}

function spawnRepairCore() {
    let repair = sprites.create(repairCoreImage(), SpriteKind.RepairCore)
    repair.setPosition(screenRight, randint(16, 108))
    repair.setVelocity(0 - (38 + wave * 3), randint(-8, 8))
    repair.z = 4
}

function spawnWaveObject() {
    let roll = randint(1, 100)
    if (roll <= 48) {
        spawnSmog()
    } else if (roll <= 78) {
        spawnJunk()
    } else if (roll <= 92) {
        spawnArmoredJunk()
    } else {
        spawnRepairCore()
    }
}

function scoreForPlayer(playerNumber: number, amount: number) {
    if (playerNumber == 1) {
        p1Score += amount
        info.player1.changeScoreBy(amount)
    } else {
        p2Score += amount
        info.player2.changeScoreBy(amount)
    }
}

function hitHazard(projectile: Sprite, target: Sprite, playerNumber: number, score: number) {
    scoreForPlayer(playerNumber, score)
    projectile.destroy(effects.spray, 100)
    target.destroy(effects.fire, 180)
    repairPlanet(1)
    music.baDing.play()
}

function crackArmoredHazard(projectile: Sprite, target: Sprite, playerNumber: number) {
    scoreForPlayer(playerNumber, 2)
    projectile.destroy(effects.spray, 100)
    target.setKind(SpriteKind.Junk)
    target.setImage(junkImage())
    target.startEffect(effects.disintegrate, 150)
    target.vx += -18
}

function collectRepair(projectile: Sprite, target: Sprite, playerNumber: number) {
    scoreForPlayer(playerNumber, 6)
    projectile.destroy(effects.spray, 100)
    target.destroy(effects.hearts, 250)
    repairPlanet(8)
    music.powerUp.play()
}

sprites.onOverlap(SpriteKind.PlayerOneBolt, SpriteKind.Smog, function (sprite, otherSprite) {
    hitHazard(sprite, otherSprite, 1, 1)
})
sprites.onOverlap(SpriteKind.PlayerTwoBolt, SpriteKind.Smog, function (sprite, otherSprite) {
    hitHazard(sprite, otherSprite, 2, 1)
})
sprites.onOverlap(SpriteKind.PlayerOneBolt, SpriteKind.Junk, function (sprite, otherSprite) {
    hitHazard(sprite, otherSprite, 1, 2)
})
sprites.onOverlap(SpriteKind.PlayerTwoBolt, SpriteKind.Junk, function (sprite, otherSprite) {
    hitHazard(sprite, otherSprite, 2, 2)
})
sprites.onOverlap(SpriteKind.PlayerOneBolt, SpriteKind.ArmoredJunk, function (sprite, otherSprite) {
    crackArmoredHazard(sprite, otherSprite, 1)
})
sprites.onOverlap(SpriteKind.PlayerTwoBolt, SpriteKind.ArmoredJunk, function (sprite, otherSprite) {
    crackArmoredHazard(sprite, otherSprite, 2)
})
sprites.onOverlap(SpriteKind.PlayerOneBolt, SpriteKind.RepairCore, function (sprite, otherSprite) {
    collectRepair(sprite, otherSprite, 1)
})
sprites.onOverlap(SpriteKind.PlayerTwoBolt, SpriteKind.RepairCore, function (sprite, otherSprite) {
    collectRepair(sprite, otherSprite, 2)
})

function hurtPlayer(player: Sprite, hazard: Sprite, playerNumber: number) {
    if (playerNumber == 1 && p1CanBeHit) {
        p1CanBeHit = false
        info.player1.changeLifeBy(-1)
        player.startEffect(effects.fire, 300)
        pause(900)
        p1CanBeHit = true
    } else if (playerNumber == 2 && p2CanBeHit) {
        p2CanBeHit = false
        info.player2.changeLifeBy(-1)
        player.startEffect(effects.fire, 300)
        pause(900)
        p2CanBeHit = true
    }
    hazard.destroy(effects.spray, 160)
    scene.cameraShake(4, 150)
    music.zapped.play()
}

function hazardHitsPlayer(player: Sprite, hazard: Sprite) {
    if (player == player1) {
        hurtPlayer(player, hazard, 1)
    } else if (player == player2) {
        hurtPlayer(player, hazard, 2)
    }
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Smog, function (sprite, otherSprite) {
    hazardHitsPlayer(sprite, otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Junk, function (sprite, otherSprite) {
    hazardHitsPlayer(sprite, otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ArmoredJunk, function (sprite, otherSprite) {
    hazardHitsPlayer(sprite, otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.RepairCore, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 250)
    repairPlanet(6)
    music.powerUp.play()
})

function checkWinner() {
    if (!(info.player1.hasLife()) && !(info.player2.hasLife())) {
        if (p1Score > p2Score) {
            game.showLongText("Spieler 1 rettet den Planeten!", DialogLayout.Bottom)
        } else if (p2Score > p1Score) {
            game.showLongText("Spieler 2 rettet den Planeten!", DialogLayout.Bottom)
        } else {
            game.showLongText("Gemeinsame Rettung im Gleichstand!", DialogLayout.Bottom)
        }
        game.over(true)
    }
}

info.player1.onLifeZero(function () {
    player1.destroy(effects.disintegrate, 300)
    checkWinner()
})

info.player2.onLifeZero(function () {
    player2.destroy(effects.disintegrate, 300)
    checkWinner()
})

game.onUpdateInterval(650, function () {
    spawnWaveObject()
    if (wave >= 4 && randint(0, 100) < 35) {
        spawnWaveObject()
    }
})

game.onUpdateInterval(9000, function () {
    wave += 1
    repairPlanet(2)
    if (wave % 3 == 0) {
        spawnArmoredJunk()
        spawnRepairCore()
    }
})

game.onUpdateInterval(500, function () {
    for (let hazard of sprites.allOfKind(SpriteKind.Smog)) {
        if (hazard.x < screenLeft) {
            hazard.destroy()
            damagePlanet(3)
        }
    }
    for (let hazard of sprites.allOfKind(SpriteKind.Junk)) {
        if (hazard.x < screenLeft) {
            hazard.destroy()
            damagePlanet(5)
        }
    }
    for (let hazard of sprites.allOfKind(SpriteKind.ArmoredJunk)) {
        if (hazard.x < screenLeft) {
            hazard.destroy()
            damagePlanet(8)
        }
    }
    for (let core of sprites.allOfKind(SpriteKind.RepairCore)) {
        if (core.x < screenLeft) {
            core.destroy()
        }
    }
})

game.onUpdateInterval(1400, function () {
    stormPulse = !(stormPulse)
    if (stormPulse) {
        scene.setBackgroundColor(15)
    } else {
        scene.setBackgroundColor(1)
    }
})

game.splash("Save The Planet", "A schiesst - Steuerung bleibt gleich")
makeScenery()
createPlayers()
