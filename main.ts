namespace SpriteKind {
    export const PlayerShot = SpriteKind.create()
    export const LifeBar = SpriteKind.create()
}
function moveSpriteInTime (sprite: Sprite, x: number, y: number, t: number) {
    globalX = x
    globalY = y
    dx = x - sprite.x
    dy = y - sprite.y
    sprite.setVelocity(dx / t, dy / t)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.PlayerShot, function (sprite, otherSprite) {
    if (started) {
        info.changeScoreBy(20)
        bossLife += -1
        music.playTone(208, music.beat(BeatFraction.Eighth))
        lifeBarPic.fillRect(bossLife * 2, 0, 96 - bossLife * 2, 5, 15)
        lifeBar.setImage(lifeBarPic)
        if (bossLife <= 0) {
            game.over(true)
        } else if (bossLife % 12 == 0) {
            preSetBossPosition(80, 30)
        }
    }
    otherSprite.destroy()
})
function spell1 () {
    enemyShootAimingPlayer(boss, 90, 5)
}
function moveSpriteRandom (sprite: Sprite, yLowerBound: number, outerBound: number, v: number) {
    moveSprite(sprite, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), v)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shootBulletFromSprite(mySprite, 200, -90)
})
function nonSpell1 () {
    for (let index2 = 0; index2 <= MAX - 1; index2++) {
        shootBulletFromSprite(boss, 60, 360 / MAX * index2 + offset)
    }
    offset += 13
}
function spell2 () {
    for (let index = 0; index <= 4; index++) {
        shootBulletFromSprite(boss, 60, offset + index * 30)
    }
    offset += 23
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(3, 200)
    music.playTone(139, music.beat(BeatFraction.Eighth))
    otherSprite.destroy()
})
function preSetBossPosition (x: number, y: number) {
    started = false
    ready = false
    offset = 0
    moveSpriteInTime(boss, x, y, 1)
}
function moveSpriteRandomFixedTime (sprite: Sprite, yLowerBound: number, outerBound: number, t: number) {
    moveSpriteInTime(sprite, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), t)
}
function nonSpell2 () {
    for (let index3 = 0; index3 <= MAX - 1; index3++) {
        shootBulletFromSprite(boss, 60, 360 / MAX * index3 + offset)
        shootBulletFromSprite(boss, 100, 360 / MAX * (index3 + 0.5) + offset)
    }
}
function shootBulletFromSprite (sourceSprite: Sprite, speed: number, angle: number) {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, sourceSprite, speed * Math.cos(angle / 57.3), speed * Math.sin(angle / 57.3))
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
    if (sourceSprite.kind() == SpriteKind.Player) {
        projectile.setKind(SpriteKind.PlayerShot)
        projectile.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . 5 4 4 5 . . . . . . 
            . . . . . 5 4 2 2 4 5 . . . . . 
            . . . . . 5 4 2 2 4 5 . . . . . 
            . . . . . . 5 4 4 5 . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        projectile.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 6 6 9 . . . . . . 
            . . . . . 9 6 8 8 6 9 . . . . . 
            . . . . . 9 6 8 8 6 9 . . . . . 
            . . . . . . 9 6 6 9 . . . . . . 
            . . . . . . . 9 9 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function moveSprite (sprite: Sprite, x: number, y: number, v: number) {
    globalX = x
    globalY = y
    dx = x - sprite.x
    dy = y - sprite.y
    speed = Math.sqrt(dx * dx + dy * dy)
    if (speed != 0) {
        sprite.setVelocity(dx / speed * v, dy / speed * v)
    }
}
function enemyShootAimingPlayer (sprite: Sprite, speed: number, spread: number) {
    shootBulletFromSprite(sprite, speed, Math.atan2(mySprite.y - sprite.y, mySprite.x - sprite.x) * 57.3 + randint(0 - spread, spread))
}
function createStarfield () {
    numStars = 80
    background = image.create(scene.screenWidth(), scene.screenHeight())
    background.fill(15)
    for (let row = 0; row <= numStars - 1; row++) {
        background.setPixel(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()), 1)
    }
    scene.setBackgroundImage(background)
}
let lifeBarProgress = 0
let bossProgress = 0
let background: Image = null
let numStars = 0
let speed = 0
let projectile: Sprite = null
let ready = false
let started = false
let dy = 0
let dx = 0
let globalY = 0
let globalX = 0
let MAX = 0
let offset = 0
let lifeBar: Sprite = null
let lifeBarPic: Image = null
let boss: Sprite = null
let mySprite: Sprite = null
let bossLife = 0
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 240
    export const ARCADE_SCREEN_HEIGHT = 180
}
bossLife = 48
info.setLife(20)
info.setScore(0)
music.setVolume(20)
mySprite = sprites.create(img`
    .......cc6c.....
    .......cc.cc....
    .......8c.c.....
    .....cccc.......
    .....ccccc......
    ....cccc.c...ccc
    ...c.cccccccb66c
    ..cc.c6ccc.cccc.
    ..c.cccc.cccc...
    ....ccc...cc....
    ...cccc.........
    ...c8cccc.......
    ...ccc..cc......
    ...ccc..ccc.....
    ..ccc....cc.....
    .ccc.....cc.....
    .cc....ccc......
    .ccc...cc8......
    .68c...cc8c.....
    c6c......cc.....
    c8c.............
    c8c.............
    ccc.............
    .c..............
    `, SpriteKind.Player)
mySprite.setPosition(200, 160)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(mySprite)
boss = sprites.create(img`
    .......................................
    .......................................
    .......................................
    ....................dbccbd.............
    .................dbccecccccb...........
    ................bccccca4ceffb..........
    ...............dfcceaccccfcff..........
    ...............cccccecfcefcffc.........
    ..............becccccccfcffffc.........
    .............dccccceccfffffffc.........
    .............bfceeccccfcfffffb.........
    ........bd..dccc4ecccccfffffc..........
    .......cbc..ceeccceeffffffcb.d.........
    .......ddc..bedeced4ffffff.dbdd........
    ....dbd.cc..bceccfeeffffcfccdd...bcccd.
    ....cbc.ccccffffcfffcffffccccb...cb.cc.
    ......bb.cffffcccfcfcffcfffffcccddb.bcd
    ...dbbcd.bcfcccccccfccfccffccfcbd..dccd
    ...cccb.bffcfcfafccfccfcccffcacc.ddccc.
    ..dcb.bccfcccccafcafcccfcccfffcccccfcd.
    ..dfcdddccccaccafcacfcafffccffffffccb..
    ...cccccfcfaccacffacffcafffaffffbdd....
    ...bcfffccccfaafffaafffccffacfffcbddb..
    ....dccbcfacfacfffaafffcaffaffffcdddc..
    .......ccfcffacfffacfcffcccaffcfb.dcd..
    ......dcffcffccfcacffccfcacaccfffb.ccd.
    ......bcccaccacfacffffaffccfccffcfd.bc.
    ......bcaacaacfccffcfcaffccfffcccccbcc.
    .......ab...bffccffffccffccffaacaddbb..
    .......3b...dfffffcccccffccfcaddbd.....
    ........bd..cfcbffaccbbcccffcaddbd.....
    ............ccb.bacb.dcfffcccab........
    ...........dccb.dab..dcffccdbcabddd....
    ...........bcc...cc....cfffcdbfccccd...
    ...........cc....dcccd....dcb.ddddcc...
    ...........ccdbb...dcb..dcccd...cccb...
    ...........dccbd...bcb..dcd.....bd.....
    ..................ddd....dd............
    .......................................
    .......................................
    `, SpriteKind.Enemy)
boss.setPosition(-16, -16)
lifeBarPic = image.create(96, 5)
lifeBar = sprites.create(lifeBarPic, SpriteKind.LifeBar)
lifeBar.setPosition(80, 5)
lifeBar.setFlag(SpriteFlag.Ghost, true)
offset = 0
MAX = 10
let bossCanMove = true
preSetBossPosition(80, 30)
createStarfield()
game.onUpdate(function () {
    if (Math.abs(boss.x - globalX) + Math.abs(boss.y - globalY) <= 2) {
        boss.setVelocity(0, 0)
        if (!(ready)) {
            bossProgress += 1
            if (bossProgress == 2) {
                bossCanMove = false
            } else {
                if (bossProgress == 2) {
                    MAX = 8
                }
                bossCanMove = true
            }
        }
        ready = true
    }
})
game.onUpdateInterval(750, function () {
    if (started) {
        if (bossProgress == 3) {
            nonSpell2()
        }
    }
})
game.onUpdateInterval(2500, function () {
    if (started && bossCanMove) {
        moveSpriteRandom(boss, 40, 8, 60)
    }
})
game.onUpdateInterval(150, function () {
    if (started) {
        if (bossProgress == 2) {
            spell1()
        } else {
            if (bossProgress == 4) {
                spell2()
            }
        }
    }
})
game.onUpdateInterval(500, function () {
    if (started) {
        if (bossProgress == 1) {
            nonSpell1()
        }
    }
})
game.onUpdateInterval(100, function () {
    if (ready && !(started)) {
        if (lifeBarProgress < 4) {
            lifeBarPic.fillRect(24 * lifeBarProgress, 0, 24, 5, 14 - lifeBarProgress % 2 * 6)
            lifeBarPic.fillRect(24 * lifeBarProgress, 1, 24, 3, lifeBarProgress % 2 * 5 + 4)
            lifeBar.setImage(lifeBarPic)
            lifeBarProgress += 1
        } else {
            started = true
        }
    }
})
