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
            ready = true
            started = false
            lifeBarProgress = 0
            bossLife = BOSS_LIVES
        } else if (bossLife % 12 == 0) {
            preSetBossPosition(80, 30)
        }
    }
    otherSprite.destroy()
})
function followPlayerPattern () {
    console.log('followPlayerPattern')
    enemyShootAimingPlayer(boss, 90, 5)
}
function moveSpriteRandom (sprite: Sprite, yLowerBound: number, outerBound: number, v: number) {
    moveSprite(sprite, randint(outerBound, scene.screenWidth() - outerBound), randint(outerBound, yLowerBound), v)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStarted == true) {
        shootBulletFromSprite(mySprite, 200, -90)
    }
})
function circularPattern () {
    console.log('circularPattern')
    for (let index2 = 0; index2 <= MAX - 1; index2++) {
        shootBulletFromSprite(boss, 60, 360 / MAX * index2 + offset)
    }
    offset += 13
}
function createSplashBase () {
    splashBase = image.create(scene.screenWidth(), scene.screenHeight())
    splashBase.drawImage(
        titleImage
        , 10
        ,40
    )
currFont = drawStrings.createFontInfo(FontName.Font8, 1)
    drawStrings.writeCenter(
    "POWERED BY STARCADA",
    splashBase,
    scene.screenHeight() / 2,
    1,
    currFont
    )
    scene.setBackgroundImage(splashBase)
}
function wavePattern () {
    console.log('wavePattern')
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
info.onLifeZero(function () {
    web.open(info.score().toString())
    game.gameOver(false)
})
function preSetBossPosition (x: number, y: number) {
    started = false
    ready = false
    offset = 0
    moveSpriteInTime(boss, x, y, 1)
}
function burstPattern () {
    console.log('burstPattern')
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
let bossProgress = 0
let background: Image = null
let numStars = 0
let speed = 0
let projectile: Sprite = null
let currFont: FontInfo = null
let lifeBarProgress = 0
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
let gameStarted = false
let BOSS_LIVES = 0
let headlinesY = 0
let text_list: number[] = []
let titleImage: Image = null
let splashBase: Image = null
titleImage = img`
    ....eee................eee.........eee22222eee.............eee......ee22222222222ee..........................ee222222222222e.............eee22222ee..............ee................eee......eee......e22222222222ee................
    ..2222222............222222e.....222222222222222.........e222222..e222222222222222222e.....................2222222222222222222e.......e22222222222222e.........222222e...........222222e..222222e..2222222222222222222e............
    .222222222.........e22222222e..2222222222222222222e.....22222222222222222222222222222222.................2222222222222222222222e....e2222222222222222222......22222222e.........2222222222222222222222222222222222222222e..........
    e222222222e.......e2222222222e222222222222222222222e...e222222222222222222222222222222222e..............222222222222222222222222c..2222222222222222222222e...2222222222c.......2222222222222222222222222222222222222222222.........
    22224552222c.....e22224552222222224455555555544222222..22224552222224555555555555554222222e............22222245555555555555542222c222222455555555554222222e.e22225542222c......22225542222225542222225555555555555544222222........
    22245554222cc...e2222455552222224555555555555555422222.222455542222455555555555555555422222e...........2222455555555555555555222222222455555555555555422222ee22255552222cc....e222455542222455542222455555555555555555422222c......
    22245554222ecc.e22224555552222245555555555555555542222e2224555522224555555555555555555542222c.........222245555555555555555552222222255555555555555555542222222255554222acc...e2225555422225555422225555555555555555555522222c.....
    22245555222eace222245555542222455555555555555555554222222245555222245555555555555555555542222c........222455555555555555555552222222555555555555555555554222222255554222acc...e2225555422225555422225555555555555555555552222ec....
    22245555222aae2222455555422224555555544444445555555422222245555222245555444444444455555552222ec......e222555554444444444444422222225555555444444445555555222222255554222acc...e22255554222255554222255555444444444455555552222cc...
    22245555222ae222245555542222255555422222222222455555222222455552222455552222222222245555552222cc.....2222555542222222222222222222245555542222222222455555522222255554222aac...e222555542222555542222555542222222222245555542222c...
    2224555522222222455555422222555554222222222222245555522222455552222455552222222222222555554222cc.....2222555522222222222222222222255555222222222222225555542222255554222aac...e222555542222555542222555542222222222222555552222cc..
    2224555522222224555554222222555552222222222222225555522222455552222455552222222222222255555222ecc....2222555522222222222222222222455554222222222222222555552222255554222aac...e222555542222555542222555542222222222222455554222ccc.
    2224555522222245555542222224555522222aaaaaaa22222555542222455552222455552222aaaaae2222455552222cc....2222555542222222222222222222555552222eaaaaaae2222455552222255554222aac...e22255554222255554222255554222aaaaaa22222555552222cc.
    222455552222245555542222222455552222aaaaaaaaa2222555542222455552222455552222aaaaaaa222255554222acc...e22255555444444444422222222255554222aaaaaaaaaa222255554222255554222aac...e22255554222255554222255554222aaaaaaae222455552222ac.
    22245555222245555542222222255554222aaaaacccccc22245555222245555222245555222eaaacccc222255554222acc....22245555555555555555222222255552222aaaacccccc222255554222255554222aac...e22255554222255554222255554222aaaacccc222255552222acc
    22245555222455555422222e22255554222aaacccccccc222455552222455552222455552222aaccccce22255554222aac....22224555555555555555542222455552222aaaccccccce22255554222255554222aac...e22255554222255554222255554222aaaccccc222255552222acc
    2224555522455555422222ae22255554222aaacc......222455552222455552222455552222acc....222255554222aac.....2222455555555555555552222255552222aacc......222255554222255554222aac...222255554222255554222255554222aacc....222255552222acc
    222455552455555522222aaa222455552222acc......2222555542222455552222455552222acc....222255554222aac.....2222244555555555555554222255554222aacc......2222555542222555542222ac...222255554222255554222255554222aacc...e222455552222aac
    22245555255555522222aaaa2224555522222cc.....22222555542222455552222455552222acc...2222455552222aacc.....2222222222222222555552222555552222ecc.....222245555222224555522222cce2222455552222255554222255554222aacc..e2222555552222aac
    2224555555555522222aaaac22225555522222222222222245555222224555522224555522222222222222555552222aac......e2222222222222222555522224555542222222222222225555522222455554222222222225555522222555542222555542222222222222455554222aaac
    222455555555522222aaaacc2222555554222222222222245555522222455552222455552222222222222555554222aaac.....222222222222222222555542222555552222222222222255555422222255555422222222255555422222555542222555542222222222224555552222aacc
    22245555555522222aaaaccc.222255555422222222222455555222222455552222455552222222222245555552222aaac....2222222222222222224555522222455555422222222224555555222222245555542222224555555222222555542222555542222222222245555542222aacc
    2224555555522222aaaaccc..22224555555544444445555555422222245555222245555444444444455555552222eaacc...e222244444444444444555552222225555555444444445555555444422222455555544445555555222222255554222255555444444444455555552222aaacc
    222455555522222aaaaccc....2222455555555555555555554222222245555222245555555555555555555542222aaacc...2222555555555555555555542222222555555555555555555555555552222255555555555555554222222255554222255555555555555555555522222aaac.
    22245555522222aaaaccc.....e22224555555555555555554222222224555522224555555555555555555542222aaaac....2222555555555555555555522222222255555555555555555555555554222224555555555555522222e2225555422225555555555555555555522222aaacc.
    2224555522222aaaaccc.......222224555555555555555422222a222455542222455555555555555555422222aaaacc....22225555555555555555542222ea22222455555555555555555555555422222245555555555422222aa222455542222455555555555555555422222aaaacc.
    222245522222aaaaccc.........2222224455555555544222222aa22224552222224555555555555554222222aaaacc.....e2224555555555555554422222aaa222222455555555555555555555422222222244555554222222aaa22225542222225555555555555544222222aaaacc..
    e2222222222aaaaccc...........e222222222222222222222eaaae222222222222222222222222222222222aaaaacc......222222222222222222222222aaaac222222222222222222222222222222a222222222222222222aaaa2222222222222222222222222222222222aaaacc...
    .222222222aaaaccc.............c2222222222222222222aaaaac22222222222222222222222222222222aaaaacc.......e2222222222222222222222aaaaccc22222222222222222222222222222aaa22222222222222eaaaaac2222222222222222222222222222222eaaaaccc...
    ..2222222aaaaccc...............ce222222222222222aaaaaaccce222222aae2222222222222222222aaaaaccc.........e2222222222222222222aaaaaccc.cce222222222222222222222222eaaaace22222222222aaaaacccc2222222aa2222222222222222222eaaaaaccc....
    ...ce2eaaaaaccc.................cccee2222222eeaaaaaaccc...ce2eaaaaaae22222222222222aaaaaaaccc............e22222222222222eaaaaaaccc...cccaee222222222222222222aaaaaacccccee222eaaaaaaaccc...ce2eaaaaace2222222222222eaaaaaaaccc.....
    ....ccaaaaaccc...................ccccaaaaaaaaaaaaacccc.....ccaaaaaccccaaaaaaaaaaaaaaaaaacccc.............cccaaaaaaaaaaaaaaaaaccc.......cccaaaaaaaaaaaaaaaaaaaaaaaaccc.ccccaaaaaaaaaccc......ccaaaaaccccaaaaaaaaaaaaaaaaaaccc.......
    .....ccccccc.......................ccccccccccccccccc........cccccccccccccccccccccccccccccc................ccccccccccccccccccccc.........ccccccccccccccccccccccccccc.....ccccccccccccc........ccccccccccccccccccccccccccccc.........
    .......cccc..........................ccccccccccccc............cccc.....cccccccccccccccc.....................ccccccccccccccccc..............cccccccccccccccccccccc.........cccccccc............cccc.....ccccccccccccccccc...........
    `
scene.setBackgroundImage(titleImage)
BOSS_LIVES = 48
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 240
    export const ARCADE_SCREEN_HEIGHT = 180
}
createSplashBase()
pause(4000)
music.setVolume(20)
music.play(music.createSong(assets.song`Background music`), music.PlaybackMode.LoopingInBackground)
gameStarted = true
bossLife = BOSS_LIVES
info.setLife(20)
info.setScore(0)
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
            burstPattern()
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
            followPlayerPattern()
        } else {
            if (bossProgress == 4) {
                followPlayerPattern()
            }
            if (bossProgress == 5) {
                wavePattern()
            }
            if (bossProgress == 6) {
                followPlayerPattern()
            }
            if (bossProgress > 6) {
                wavePattern()
            }
        }
    }
})
game.onUpdateInterval(500, function () {
    if (started) {
        if (bossProgress == 1) {
            circularPattern()
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
