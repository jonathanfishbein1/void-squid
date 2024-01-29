namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 240
    export const ARCADE_SCREEN_HEIGHT = 180
}
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(mySprite, 50, 50)
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
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(mySprite)
})
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
let lifeBarProgress = 0
let bossProgress = 0
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
mySprite.setPosition(80, 105)
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
scene.setBackgroundImage(img`
ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfccccccc
ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
8888888888888888888888888888888888888888888888888888888888888888888888cccc8c8cc888c8888c88ccc888888c88888c88888888888888888888888888888888888888888888888888888888888888888888c8cccc8ccccccc8cc88888888888cc8888888888888888888c88cc8cccc88cc8f
fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
fffffffffffccccccfffffffffffcfffffffffffcfffccffffffffffcccffc6cffcccfffccfffffffffffffffffcfffcfffffffffcffffffffffffffffffffffffffcfffffffcfffccfffcfffffffffcffffcffffffffffcfffffffffffffcffffffffffcccfffffffffffffffffcffccffffffcfffcfff
fffcccfffccc7bcccccfffcbcfffcfffffffcfffcffffffccfffccc6cc6c666cccc6cfccccc6cffcffcfffccfffcfffffffffccffcffffcfffffffffcfffffffffcfcccfffffc66cfffcccccffccffccffffcffffffccffffcff8cfffcfffcffffffffffc7b7cffffffffcc8666c66c668f6c6ccccfffff
fcccfffffcccccbdccffccccbbcfffffffccffffffccffffcfffc6cfccc668fc66cfff8cccfc66cfffcffffffbfcffffccfffffffffc6cfffffffccfffccffffffcccfc6cfff6666cfc6cffc6cffccff6666fc6cfffcffff8cfffcccffcccffccffffffcbb77cffffffccf86cccc6c6668ccccc6866cf86
ccfcfffffffccccc777ccc7bc7ccfffc8ffffccfffffccfffcbccccc66ccc866cccccfffccccccccccffccfffcffffccfffffffffccccffffffccffcccfffcfffffc6cccc6cff66c666cc66cfc66cfff8666fc6666cfffcffffcccffccfffccffffffcbd77cfffffccfffc6ccc66686666cc66666c6cfff
6fffffffffffffc7cc7bdcfccc8fcff8fffffffffffcffccbbccccc6cfccc66fc66cc6cfff6666cfcbccfffcfcfffffffffffffcc668fffffccffcbdbddcfffccfffffc6cfc6ccf66666fff66fff66cfffcf66668fc6c8ffccfffffffccffffcffcbddb7cfffffccfcbffffc6866fb6ccf66f66c68fffcc
8fffcccffffffffcccccccccfffccffcffffffffcffcfcc6ccccc6ccccc6c66666cccccccffcccc6cccbccfcfffffcfffcffffc66cfffffccfccbb7ccc7bbccffccfffffccccc6cccccfc666c66cffcc6fff6666cfcc6ccfffffffffffffffffbbdb77ccfccbcffcffcc7cfffcccc6cc66666cc8fffcccc
fcffccfffffffff8ccccccfffccbddbffcfffffffcfcbcccc6cccc66ccc666666c6666c6ccccffcccc6ccbbcfffffcfffffff66cfffccccfc777777ddd7777bccffccfffffc6ccc666ff6666cccc6cffc6cff6cfffccccc6cfff6ccffffffbddb77ccffcbdbbdbcfffcfccccffffc68c66c66cffccccfff
cfcccccfffffcccff88cccfffffc7b7cfffffffffcb6cffc6c6cfc6c6699666c6d6666cc666cccffccccccc66ffcffcccfcc6cfffffffcc77777ddddddddd777bccffccfffff86cccc6cc88f6666fc6ccfc6cffffff6666cc6c668ffffcfcbddbcf88fbddddbccfffffffffc7cffffc688ccffffcccffff
cccfccfffff7db7ccffffffffffffcccfffffffffcc666cffc6cccc666666666d666c6666cccccccfcccc6666fcfcffcccccffffccffcbc667bdddddddddddd7767bcfffccffffcc6cfc66cf666cc6666ccfc6cccff86688c666cffffffcbbccfff8ffcbdbccffffffffffffcccccfffc8fffcccfffffff
fffccfffffff7ddcfffffffffffffcccffc7ccfff8f8866bcfc66d6666cc66d666c669966c6cc6ccccc668ff8fc8cffffffffffcffcddcffc7dddddddddddddb7ffcdbcfffccfffffc6cfc66ccff6666cf66cff6ccf888fc6666cfffffffcccccff8ffccccffffffccfffffffffccffffffcccffffffffc
fffffffffccfc66ffcfffffffffccccfffffffcffcffff8666cc666666666966c6696666c6696ccc666c8fffffcfcc8ffffffffcccfccbcc777ddddddddddd77cccbccfcffffcccffffccccc666cc66666666cccfccccccfcc8ffcccffffcccbdbcccfccccfffffcfcccccc7cccfffccfffccfffffccccf
ffffffcbbbcfcc6fffff8ffffcc8fccffcfffffcbbcfffff8866ccc6d6666c669996cc6d9696ccb668ffffffffccccccccccffcccccccfcbdbc77dddddddb76bdbcfffffccfffffffffff866ffc66cf6666cfcc6ccfccccccffcc66cfcffffcccbdcccfccfffffffccccb66666cfffccccffffffcfcffcc
ffffcbbcccc7cccff8ff8ffffcfffc8ffffffcbdddbffffffff8666c6666666d6666669666cc6668ffffffffffcfcccccccccccfccffccffcbdb777bbb77c7bccffffff7cccffffccccfffffccccc6cc6686666cc6ccfccfffccf88ffffffffffcccbccfcfffffffccbc66cccccccfffffcfffffccfcccf
ffcbb7cfcccc67bcfffffffffffffccffcffccbbb7cffcfffffff8666cc669666c66d966ccb6c8fffffffffffcfcbc6ccccccccfcffffffcffccbbccccccbccffcfffffcfcccfcb76cccbfffffc6cfc66cf6668fc6cffffffffffffffccfccfffffccffccffffffbb76cccccbbbccccbcfcfffffffc7cff
cbbc777cc6ccc6c7bcffffffffffffcffccccfcccffcdddbcffffff8c66cc66c666966cc6688fffffffffffcccd66666cccbcccfcfffffccffffffbbcbbcfffff8ff8cffffccc7677767cbbcffffc6cff66ccfc6cffcccfffffcfffccfcccfccfffffffffffffbb66666fcb7cccbbb6ccfffffccfffcc7c
7ccccc7ccccc6ffccc7ccffffcfffffccccfffffcccbddbccffffffff8c66ccc666ccb66cfffffffffffffcbb666666ccccccbcccffffffcffffffcccccffffff8fffffffcbc777667766cc7bcffffccccfc66cffcccffffccfcfccfcccfccccccffffffffcb76ccc6cccccc7bcccccccccfccffccfffcc
6ccccc6cc6cc6cccfcccbbcffcbcffbcffffffcbbcfcbbcfcccfffffffff8696ccc6668fffffffffffffcbb66966ccc6cccccccbcffffffffffffffffffffffffffffffcb7677767776cc7c7c7bcfffff666cffc6cffffccc8cc8ffccfcccfcccfccfffccb76c67688cccccc77cfcccccfccccccffccfcf
cccc6cccc7777cccc66ccc77ccfccccfffffc77cffffffccccffffffffffff8666668ffffffffffffccccc66666ccccccccccccc7bccfffffffffffcffffffffffffcccc677767776ccc6677bb7cbcfffffffcccfffccccccccffffffccffccfccfffcccc66cccccccccccfccccfcccccccc776cccccfff
cfc66cc776ccc7bcc66ccccc7bbcfccbcfcc7ccfffffcbccffffffffffffffff88ffffffffffffffcbcccf886666cccccccccc7777ccbcfffffffffcffffcbbffffbccccc66676cc7c6cdd776ccb7ccfffff6cffccfcccccfccccfccfffcffcfffcccd766ccccccccfcbfcfccccfcccfbfccc66ffccffc7
77ccc77cccccccccbccccccccc7bccfcccccccccfccbcffffcccccc8fffffffff8fffffffffffffcbcccccccf6cccccccccc7766ccccccbccfffffffffffcccfccccccc76676ccccccbdd776c7ccfffcccfffffffccccffffffccccfccfffcffcccf776886ccccccccfcfcfcccffcfffcfcfcccfffccc66
cc777ccccccccccccc7bccccccccc77cffcccccccccfffffccccccccccffffffffffffffccffccfcccbbccccccccccccccbbb6cccfcccccc7bcfffffffffcffcccfcccccccccccccc777cc77ccffffcccccfcccfffccfffffccccffccfcccffffccf8ffcc676ccccccccfcccfffccccccfcffffff8cc7cc
cb7cfcccccccccccccc777cccccccfc7bcffcccccffffccccccccccbddbccfffffffffcbbbbcccffffccbcccccccccccccc7766cc6ccccc77ccfffffffffcffcfcbcffcccc7cc77776cccbcfffffffcccccbcfc66ffffffcc6fffccfcccccccc6fffffccc6ccc766cccccccffffcccccffcfccfffccc68c
7ccccccccccccccccccccc77cccc6fcccc7ccffffffccccbbccccc7bdddccfcfffffcbbccccccccfffffcc7bccccccc7666cccccccccc7ccffffccfffffffffcccccccfccccfc7777ccccffffffffffcccccccc6cfffcccccffcccccccccfcfccfffcffcfcc6666fcccccccccccccccccccc77cccc8668c
cffccccccccfcccfc6ccccfc7bdcfcc7ccfcbbcffcccbcc6666cfcccbdcccfccffcbbcccbbccccbbfffffffc7dcfc977766ccccccccbcffffffcbbffffffffcbcfcbbcffffc7ffcbbcff8fffffffffcccc66cfffcffc6cfffcc6cfcffccccfffffcccffffc77db68ccccbcccfccccffc77cc766f6cccfcd
ccccccccccccccc66ccccccccc777cccccccc7bbcccfccf88fccccccfccfccccccc7bbbccccccbccbccffffffccb7c66ccccccccc7ccfffffccccffcccccfccccbbccffc7cc7bfffffffffffffffccc6ccc6cfcccccc8ffcccfff77cccfffccccccccfffff67777cccc7776cccccccccc666cccfccccb7c
ccccccc6ccccf6cfccfcbdbccc667d7bccc77777cfffffffffffcccfffcffcccccffccbbcffcccbccccbbffffffcc7beecccccb7ccfffffcbccffbddbddbcfcffcfc7cffccfccffffffffffffcccccc66cffffccccfffcccff77c676fffcbcccddbffcccfffc66c77db66776ccfcccccf7d7cc8fcb76ccf
cfcccccccccc6cccccccc6cccc6c77777bcc766fffccfffffffffffcffffffffffffffc7bbcffccbcbcccbcffffffccbbccccbcffcfffcbcffcbddbcccbddbcfffcfcccbcffcbcfffffffffccccc6ccc8ffcc66cffccccffcf77666cccbccfffcc7cbbcfffffc6f6777dbc666ccc8766f777fccb766cfc7
ccccccccccccccccccccfccccccccc777777cff8cfcccccccccffffccfccffccccffffccfccbcfffccccbbcffffffffcccccccffbbbbbccfcbdd7cccfccc7bdbbcfffcccccffccfffffffcccc66cccff8cc6ccffccccffc77c776ccbbccfffffffccbcffffccc6cff66777b7ccccc766f66ccbc6ccccccc
f6cccccccccfcccccccccfccfcfccccc676cffffffffccbcccbcccfbdcfcccc77cffffcccdcfcbbcfcbbccffffffffffff88fffcfcbcffcbddbccffc666cfcbd1dbfffcfcffff8fffffcbcccccfffcfc66cffffcccfc77c77c6ccbbccffffcccffffffffcccc66cfcff667776ccc676cf6cb768fc6ccfcc
fccccccccccccccccccccccccccc77ccfffccfffffcccbccccccccccff8cccccfffffffccccfccccbbccccbcccfffffffffffffffffffcdddbbbcc67776cbbbbdddcfffffffff8fffeccf66cfccffcccc8ffccccffcc77666fcccccffffccbccffffffcccccccc6fcfffcccc777776ccc7cccccccbcccc6
cc6cccfcccccccfcccccfcccccb76fcf88fffffffffffcfccccccccfffccfcffffffffffccffcccfcccbbcccbcfffffffffffffffffffccbccccbdbcccbdbcffcbc6cffffffffffffcc66fcffffc66cfffc6cffffcc6676ccffccffffc7eccfffcffcffccfccc6cfffc7cfff77776cbb66ccfcccccccccc
cccccccccccccccccccccccc77cccfff8fffccfffccbccfffccccbcfffccccffffccfffffffffccfcfccbbbccbbcccfffffffffffcbbbccc68ccccbdddbccccc7cfcbbbcccfffff8ffccffccc666cffcc6cffffcccfcccfcbcfcfffcc7cfffffcc7cfccccccfcfcccccfffcf666ccbccccf6cccffcfcffc
bcccccccccccccccccccc7b76cffffffffffccccffc77cffccfccffffcbcfccffcccccfffffffccfcfcccccbcccccbcccffffffcdbbccffc68c77cccdccc7ccc7cfcccdddbcfcfffffffcfc6cc8ffccccffcffcccfffcbcffffffc7cffffffc77ccffccccccffccccff7cccfccb7ccfcccccf8ffffffcc7
67bccccccccccccccccc776c8f8f8ffffffffccc77ccfccccffcfffcbccbbcccccccc7ccccffffffcfccf88cccccccbbccffffcd7cccfffc68c7c77cdc7777c66cfff6cccbbcfcccfffffc6cfffccccffccccffffcbcccffffc7cfcccfccfc7ccffffffccccc76fffffcffccb7ccccccccccccccffffccc
fcccccccccccccccc7776cfff8ffffffffffccc7777ccfccccfffcbccccc7bccccc7cc777ccfffffffccfff88cccbbcb7ccccccccffffffccfc7ccc7dc7ccccc7cffffffccbbcccccffffcfffcccffccccffcccffcccfcccfffcffcccff8ffffffffcccccc66cffffffffcb7ccccc7cccfcccccccccccc6
fffcc7bccfcccccb7668ff8cfffffffccfffc777777cccffcccccccbbbbb77ccccccc77cc77cc8ffffccffffff8fccbccccccfccfffccffccfc7ccc7dc7ccccc6cfffccffcbbccfc7cfffffcccffccccfffcccfffffccbcccbcfffcffffffffffffccccc7cffffffccfcd7ccccccccfc7cc7ccbccccc7cf
ffffcfcc7cccc77ccfff88ffffffc7dbbdbccccccccc8cff7cccccfccbbcffccfffffcc77ccccccccffcffbcffffffcffccccfcffccceccc6fc77cc7dc777ccc6ccc7cbbffcffccbccfccccccfcccffcccccccccccccccbdddbcffffff8cccccccccccccffffccccccfccccccccccccccccbbcccccccccc
fffffff88c777c8fff88fffffffbbdddddbbbcfffcc6fffffcfffffffccfffffcbcffffcfccccfccccffffccfffffffffffccfcccb7fe7c6ccc7c7c7dc77ccccb767cfcb7fffcccfffffcfbdbbccfcccffcd76cffccffcbb7cffffffffccccccffc7ccffffcbcccfccffff67ccccfccccdbcfcccffcc7bc
fffcffff888f8fffffffffffffccc77ddb7cccccfffccffffffffffffcffffccbcccccfffcffffcfcfffffccffffffffcccccccc7cc7ccc67cc7ecc7dc77cccccc6cccccc7cfffffcccffcebbefffccccb7c66ffcccffffccfccfcfffcccccfffcccffffccccccfcccffffffc7c6cccbb7ccccccddbccc7
fffffffff88fffcfffffffffffffcc7cccccffcccffcbffffffffffccbbcfcbcccccccccfffffccccccfffffffffffccccfc77cccfccccccc7cccc77dc77ccc77ccccc6c77fc7cffccccffcccffffccbcc68ffffccffcffffffffccccccccffffffffcccccccfffccccffffccccc777776cccbddd77ccff
ccffffffcc8fcf8ffffffffccffcfffccccfffccfff7ccfffffcccbb77777cccccbbcfffffffcfcccccccfcfffcccccccccccc7ccccccc777c6ccc77dc77ccccc7cccccc7c7c677ccfc77cfffffccecfcccfffffccbccffffffffcccccc66ccccfffcccccfffffcccbcccfffccffc777cccbddd777ccccc
6bbcffffff8ffffffffffcccbcccfccffcffcccffffcfffcfccc77766766777bccccfffffccccbcfccccc7cccbdd7cccccccc77ccccccccc666ccc7edc77ecccccc7cccccfc7ccc7cc6cbddbcfcccccfffcffffcccccccfffffccccc666ccccccffcccccffffffcccfcccfffffcfffcff7bbd7766cfcccc
86cbbcffffffffffff8fccbcfffcffffffffccfffffffffcccb77766666667777bcfffccc6cb66cfcffccccbd7bccfc6ccc77ccbcccc66667cc7cc7edc7e77cccc7c7ebccbccc7ce7cccfcbdbbccffccfffffccfcbbcffffffbcf8666ffcccfffc86cfcfffccccfcffcffffffffffffffcfcc76ffffcccc
666ccbbccfffffccccccb7ccfffcff8ffffff8ffffffffcc777766677c7776667777ccccccccccccccfccbccccccccccc76ccccccccc666ccccccc7cdc7cccccccccccfcccccccccccccccccccccccfccccfccccccffffcccccc66cfccccfccccccccfcfffccccfcffcffff6666ffffff776c66cfccccc7
666ccccbdcfffccfcbbcccccccfffffcffcccffffffffbc77766677d7ccbdbc6667767beeeff6fcccccdbccccc7fcc7cccccbbccc76ccc7ccccccc7cdcecc7c7cccccc7ccccc77efec7cccbeeeecbbbcfccbbbcfffffccccfc668fccccffcccccfc6cfffffccccccffccf66666666ffffcccc6677ccccfc
c6c666b6cfcccccffcbbcccccccfcffbcffccffccfffcb7777666c7ddddd777c666777bccfccfccccdb77cfcccccc7ccccccb7cc666cc7cccccccc7cdc7cc7c7ccc7ccc66ccc77cccccc7f7e77ccc7ddbcffcfffffccccc666cfc6cccfccccccccc6ffffffcccfffff666ff66666fffffcfcfffcc77cccc
cc66b66fffcccfccffcccbbccccccccffffffcccccffffcc7c666cc67d776c86666cccffcfcfccbddb777cc77cccccc7ccccccccccbccccc77cccc7cdc7cc7c7ccccccc7ccccebeeccc67f7c77ccc77dddbcffffccccc66cfccccccccccccfccccccffcfffcccfffff6fff666ff666fffccbcffffc6c7cc
ccb66fffffffccccfffffccbbccccccffffcbbccc6bfffffcc7c76cc8668c67767ccffffffcccddddb77ccc7ccccccccccccbbbcbccccccc7ccccc7cdc7cccc7ccccc7cc7bcc7ccc7ccccf7c77cc777dddddbccbccc66cffccfccccccccffccccfcccccccffffffff66ff66666666ffffcfccbfffff8ccb
66cffffccfccfc7bfffffffccbbccccccc7ccc66666fffffffccc7666cc66677ccffffffccbbb7cccccc77c7c7cccccccccbccccc6cccccccc6ccc77dccccccccccccccccccccb6cccccc66c77cc7ccccccccbbcc66cffccccffffccccfcccccffffccccfffffff6666f666f666ffffff8ffccfffffff8c
fccccfccffcccffcffffffffffccdcccbcccb666688fffffffffcc77677677cfffffffffbdcbccccccc7cec7cc7cccccccccbbccfcc7ccccc6ccc777dc7cbccc6ccbcc7c8ccb7c66cc7c7c6c77ee7ccc777fcc7bdcffcccc77fcccfcccccccccccccffcfff666ff6fffff6ff66fffccfffffcffffffffff
fcfcffff6776ffffffffffffffffccbbcff666888ccccccffffffffcc7cccffffffffccbbcbccc7cccccccc7cc7cfccccccccbbbcccccc6ccc7cccccdcccccccc66ccccc7bb66666ccc7cc6c77cc7ccccccccc777bbccfcf6fccccffffcccccccccccc66666666cfffcbbccffffffc7cccffffffffffffc
fffc666ff6666ffffcffffffffffffccbbcc888cccccbccbcffffffffccffffffffcbbbbcc7cccc66cccccc7c777cccccccccbbbbcccccccccccccccd77ccccccccc66ccbbb666c7eccccc6c77ec7ccccbbccccccbb7bccffffc66fffcccccccccc666666666ffffcddddbcfffffffffccccf8cccfffffc
ffff666fffff6666fcccccffffffffffccbbccccccbccccccbcffffffffffffffcbbccccc7ccc6d1dccccccbccc7cc77cccccbbbbcccc6d6cccccc7cbcccccccc6d6cc6cbbb666cecc77e7cc77cc7c7c69966cccbcccc7bccffffff666cccfcfcf66f666ffffffcddddbcccffccccfffffccccccccccccc
ff666ffffffff6fffccccccffffffffffffccbbcccbcccccccccbcfffffffffcbbccccccccc666666cbccccc7cc7cccccccfcbbbbeccc6ccccccccccccccccccccccccccbbb6666ccc7cc77c77cccc77c66c666cccccccccbbcffff6ffffcccfcff6f666ffffffcbdbccfffffccccccfffffccfcccccccf
8f666fff676cfffcfccccccccffffffffffffccbbcccbccbcccccbbcfffffcbcccbbecccc7ccfcbec6c7bccccc7c777ccbc7ccbb7dcfcccccccccccccccccccccccccccbdb7666cccc7c7ccccccc777cfccccfcb7ccccbbcccbbcfcffffffc6c666ffffffffffffccfcffffffffccccccccfccfcccccffc
f666666ff66ffffcfcccccccccccfffffffffffccbbcccccccccccbcffcbbbdbccc7ccccccc7ccbcc6cfcbbf7ffccc7ccccccc6cc7bbbccccccc77cfc6677ccccccccbbcc666ccc777ccbbcfcccb7ccccccbcccccccccccccbbb7bbcffccccf66666ffffffccccffffffffc6ccfffcccccccccccccfccbc
ffff666ffffffffccfccccccc7ccccffffffffffffc7dbccccccdcffcdbefc9dcfccc7ccc77cc7cbccc7cc7f7ccc6bcccbcccc7c66c77bbcfccc77cff877777cccbdc7c666cbcc77cccbbc7ccc7cccccc7bc7cc7ccc7cccccddbcccbbcffcfff66ffffffcccffffccfffbbffc6ccccffcfccccccfcbbcc6
cfffffffffffccccccccccccccccccccffffffffffffc7bcccbccccbb77ccc66cccccccccccccccc77ccccbc7ecccc6cccccccccbc6ccccccccc77cfccc776ccccc7ccccc7cccfcccbbccccc7c7cccccccccccccecccc6cc666ccc777bbccccffffffccccccccccccccfcffffffcccffffccccccc7ccccc
ccccffffccccfccccccccccccccccccfccfffffffffffffcccfcbb7cccc77cccccbccccccc7cccccccc7ccb7cc7ccccc6bccccccc667c7ccfcccc6ffffc66ccccccc77cccccccc7b7cccccbcc77cc7777ccccc7b77cccccbc6c77677cccbbccccfffcccffcccbdccffffffcfffffffffccfcccbcccccbb7
cccccfffc7ccccfccccccccccccebcfffcccfffffffffffffccb77777c7cc777cccc7c7cc7cc7ccccccbc7cc7cc77ccbccccc7ccccccccccc66cbccbddccccccccbccc7cccccccccbbeec7cc7ecccccccccecccc7ccccbb6cc76c76c77c7c7bcccccccccfff666cfffffffcccccffc7cffcc7bccccbbccf
ccccfccccfcfccfccccccccccccccccfccfcccfffffffffcbbcc77cc7777cc777cccccccccccccccccc7ecc6cccccccb7cccccccccccccccc6ccbbddbbdbbccccccccccccccccccccbccbccccccccccc7ccccccccc7cccc7c7c7c77777ccc6ccbbcfcccffcfffffffffcccccfccccccccccffccbbbccfff
cfcccccfcffcfffffffcccccccccfffffcccfcccfffffcdbefccc77cc7cc76cc7ccccc7cc76cc7ccccc7cc7c6c6cccc777ccbc7bccc6ccccccbdddbdddbdddbccccccc7cccc7bcc7cbcbf6ccccc7cccc7ccccccc77ccccc667c6666c7c77cccffcdbcffccffffffcffccfffcccbbc66cffccffffcffffff
ccccccccfffcccffffffcccccffcfffccccccffccccbbbcc66cccccccccccccc7ccccc6ccc6cccccccc7cc677ccccccbb7ccb7ccccccccccbbdbdddddddddbddbcccccccccccc7c7cccbccccc7cccccc7ccccc7c7766cccc77ccccc777cc7cccccccdbcccccccfcccffcccccccccc6d66cfffffffffcccf
cbbcccccfffcccfcfffffffffcccffffcbcccccccbdddcccbfc67ccc7cc77cccccbeccc6666ce7cccb766ffc67777ccbb7cccc7cccbccccbccddbbddddddbddccb7ccccccc7c7ccccccbee77ccffc777e7ccbfec766ccc7cc7ecccccccccc6cccbccdddbcfcccccffccfccbccc66b968fffffbcfcffffff
cccbccccccccccccccfffffffccfffffccccccccfccccdcccccccccccbcccc7cccccccccccccccc77ccccccccfcccccbb7ccbccccccccccbbddbbdbbddbdddddbcccccbccccc7ccccccbfccccc7ccccccc76cccc6ccccccccc7ccccccccc666ccccbbccccfccfffcccccfc6ccccc68ccfffcbcfcccfffff
cbcccccccccfc6ccccfccffffffffcccccfccccffffcccc7ccc77cc6cb7cccc77ccccccccccbcc6ccc66ccc7cc6ccccbb7ccbccccccccfffccbbbbbdbdbbbdbccfffccb8cccc7ccccccbf7cccccc6666ccccccbccccc7cccccccccccccccbb6ccbcccccffffffcccccccfffc66c88c6cccbcfffffffffcb
bcffffcccccccfcc6fcccccccffffcccfcfccfccffffcffcbbcc676c6cccccccccccc7ccccccccccff8cc6cccccccccbb7cccccccccccffffffcbddbddbbbccfffffccbfccc77ccccccbf77cccccc666fccccccccc77cccccccccccccccccccbccffffffffccffcccbccccfffc6666cffcc8ffffffccbcc
fffffccffccccccfccccccccfccffcccccffccccfcfffffcccc7cc66cccccccccccccccc7ccccccccccccc66cccccccbbbcccccccccbccccffffccbbdbbccfffffccccccccccccccbccbfccccc6cccccccccccccccccccccccccccccccccccccfffffcfccccccffccccfcccccffcffcccfffffccccbbccc
cffffcfffffccffccffc6ccccfccccccccfccccffcffffffcccccbcc6cfcccc7cc7cfc7bccbeecbccc7cc7cccccfcccbc777c6cbeecc7cccfffffffcccffffffc66ccccbeec7c7bbcbbbcc6cccc7cc7cccc7cc7cccccfc7cfccbcf8fcccbccffccfffcbcfcfffc6cccfc7fffcccff6cfffffcccbbccfcbb
ffffffff8ccffccccccfccccfcccccccccccccccfcffffffffccccccccffc6cccc6cccfccccceccccccc7ccccccbbbbccccc77cccccc7cccccccfffffffffcccccccccbf67777cccccbbbcccfccc7ccccccccccc77ccc7c667cccffcccccfcccf86cf8cccccfcccfcfffcfcccccccfffffcfcccbccccccc
fffccffffcbbfffcccfccccffccc7cc7ffccccccffffffffffffcccccbbcc66cccccc7cccfccccc7ccccc7ccccdb77ccccccccc777cc7ccc7cccccffffffccccccc7ccbe777ccccccc77bcbbccccccccc7cccc6fcc7cc676ccc66cb7ccccffffff86d666cccbcccfcfffccfccccfffffccfcccfcccccccc
fcccccccffccbcfcccccfcccfcfccffccffcccccccffffffffffffcccccbbccccc66ccc777ccccccccccccccdbc7cfccccccccc77ccccccccc6cccccccccccc6cc6cccbe7cccccccccccc77bbccccccb7eccccccc6cccc7c7cccc7ccccccffffffffc6d666ccbccccccccccccfffffccccccccfffff7ccc
ffcbdbbbccfcccfffccccccccccfccfffccffcccfcccffffffffffcbccccccbcc6766cccc6ccccfccccfcbbbb7c6ccccccccccc77cccccc7ccc7ccc7cc7cc77cccccccbe7ccccccc7cccccc7cbbbcfcccccccccccc66c776cccccccccccfffffffffffc669666ccccccffcffffccccccccccfccffffffcc
ccfccbbbcffcfffbefeeeeccffccccccccfcccfccccfcc8fffffffcccccbccccbcc67ccbbcccccccccccbcb7ccfcccccccccccf77ccc6cccc7bc777cc6cc777bcc67ccbe777ecccccc77fccfcc7bbcccccccc67ccbfc66ccbcfcccc7cf8fffffffffffff86d9666fcfccccffccccbddd7ffccccccffffff
ccfffcccfcfcfffccfccccccccffcccbccccccccfccccccccfffffccffcfcccfccccccc666ccccc7c77c7ccccccccccccccccccb7cccccccccccccccccccccc77cccfcbc777ccccccccccccccccc7c7777ccccc6ccc66c7ccffcccffffffffccfccfffffff86668fffccccccffccddbccccccccccccffff
ccfffffffffccfcccbbcbcccccccffccccccccfc6cffcccfcccffffcfffffffcccfcccc66fccc77777ccc7cfcccc7cfcccccccfb7cccc777bccfccc7cccccccc7b77ccbc777eccccccfccccb7fccccc777c7c7cfcccfffcfffff8fffffffffccccfccfffffffffffffccccffffffccccbccfcffcccfcccf
ccccffffffc6ccccbcfccccccccccccccccccc6ccccccfcccccccffccfffffffcfcccccccccc7c77ccccc7f7cccccc7bcccccccb77cccc77ccccccbc7bcccccccc77cbbe7cbcccccccbcccccccccccccc7777ccccccccffcccff8fffffffffffcc7cfcccfffffffffcfccccccccffffccfcccbbbcccccf6
6fcccccffccccbccc86666cccbcccccccccc6cccbccfccfccc6c8ffc6ffffffffffffccccc7776777c7ccc7ccc6c7ccccccccc777cccc7777ccccbc7c7cbbcccc7c77cbf777cccccc6c77cccccccc7ccbd7c6ccffccfff8c7cccffffffffcccfffcccfcccfffffffcccccccccffffffffffcbdddbccfccc
fc6ccccccccbcc8c66666666ccccccccccc66cccbccccfc666cccfcccfffccfffffffcccc77cc7cc77ccccc77c6ccccccccc7777cceffccccbc77cccbbcccbbc7cc7cfbccc777ccccc7c6ccc7ccccbdbccbbcccccccffff8cc777cffffffffcccfffccfcccc8cccccccccccffccccfcffffccbbbccffffc
cffcccccccccc666666ccc6666cfcccfcccccc66cccccfccccccccccffffb7fffffccccccc77cccccccffccccccccccccbb77c7ccceccccc777cc7bbbbbb7c77bcc7ccbfcc77c77cccccccc7ccccbb77bbbccbbccccfffffffc7cccffffccfffccccfccccccccccccccccfcccccccfccccfffffcffffccc
ccfcccbbcf8669666ccc7669668cbbfffffcbcc666ffcbcfccccccffffffccfcffcccccc77cfffcccc6cfcccfccccccbbc7c77cc6c7cccc766cbdb766677bbcc77ccc7c77cccbcc77b7cc7cfccffccbdccbdbccbdccbcffffffccfcffcfffccffcffccffcccffccfcccffcfcccff6cffccffffffffff7dc
ccccccccc66d666ccc66666ccccccfffcccccccc6666ccccccccfccccfcffffccb6bb7cccffffffffc7ccc6cccccbbbcc777cccccccccc7c7bbb76d9999677bbbcc7ccccccccc7ccccb77cccccffffccbbbc7bbbcbbbcffffffc8fcfffcccfccfcccfccccccccccccfcccccccccccfcccccccffffc7bbcc
ccbcff86966668fb76666cccbcfffffcccccfc6996666cc7ccfffcfccfcfffbb6bbb7ccffffffffffff67cccfcdbc7cc7ccccccbccccccbdbb7c699999996cc77dbcccccccbcccccc77ccb7fc6fffccccc7dbccbdbc7beffffffc6cfccfffcfc7cffcccfccfcccfccccccccccbccccfffccccccfffc7bbe
cccfc69966cfcc66666cccccfffffcccbccc66c6966ccbcffffccfffcccccccbbbcccffffffcfffffffffcccbbcc7ccccccccbcccfccccddb7cf86699966ffccbdd7cccccccbbccccc77cc77cccfffffffcc7bbccbbccffcfffffc6bccccccffccccccccccccccccccccccccccccccccccccccccccccc7b
fc669666ccc66666cccbccffffffcbccc66cc666ccbccffffcccffccfccccffccccffffffcbcbcfffcccffccc77cc7ccc7ccbbbccccccfcbddccfffc6cffffcbdbcccccc7cccbbccccc7cc77cccffffffffffcbbbccccfccffcffff866ccccccffcccccccccfccbccccccccccccbccffccccfcccffcccfc
669666cccb6666cccc6cffffcccbcfc66ccc6cccbcffffffccffcccfcccccffcfffffffcbbb7c7ccffffffffffc77cccccccbbc7cc77cccccbddcccfffffcddbccccc77cfc7cbccccc7ec7ccb7cccfffffffffcccffccffcccffcffffcbbbbccccffcccccffcfffcbeeccccccbccfffffffcbcccfffffcc
9966ccc66666ccccccffffcccccc666cc66cccccfffffcccfccccccccccfcfccffffccbbc7777cccffffffffffcfcc7ccccccccc7ccc66cccfc7bbdcccbdb7ccfccccccc7ccccc7ccc7ccffcfcc77cccfffffffccffccfffffccccccbb666666ccccffcfffcccccccccccccccffffcccccfffccccffffff
d68fbb6666cfc6cffffcccbccfc66fcb6cfc6cfffffc6cfcccfcccc7cfffffffffcfcbcc776cffffffffffffffccffcc77cff6ccccfccccccccfccddcdd7cccc6cccccccccfccfceb7cfcffffffcbdbbbffffffccffccfcccfffccb6666666666bccbfcccccfccccccfcbbcffffccffbfcccfffcbcfccff
ccc76666cccccfffffcccccc666cc6ccccccffffccccccbccccccccffffcc7cccccfccccccffffccccfffcbbbcccffffcccccc6ccccccccccc7ccfcbcccfcccc66ccccccccccccccccfffffffffffcbbbbcffffccffccccccccffbc66666666cbbbccccccccccccccccffffffcccccfcffccccfffcccccf
b666668cbccffffccc7cfc66cc66cfc6ccffffcccccbccccfccccffffcbb76cccccfcffccfffffff8ffcbbbccbccbcffcffcc7cfccccc77cccccffcfcffff77ccccccccccccc7ccfccfffcbcfffffffcbdcffffccfffffcccfccfcccc6666cbbcc6cccccbcfcccfcccccccfccccccfc6cccfcccccffccbc
6666cccccfffffccbccc666cc6ccc6c8ffffffc7ccbcbcbbcccfffccbd776ccccccffccfcfffff8ffcbb7eccccccccbccfccfcc7ccccccccccccfffffffffccccccccccccc7cffcfffcc77c7bcffffffccfffffccffffccfccccfcffcccccbccccccccccccccccfccccccccccccccccbcccccccccccfffc
68cccccfffcfcccccf666666cccccffffffffcfccbbcbbccfcffffccccccbcccffffccffccfffffcbbcccccccccccccbbcfcccfcc7ccccc7ccfcffffffffffffccc7ccc7ccffcfffccccccc7777cffffffffffffcbcffcccccccfcfffcbbcccccccccc6ccccccccccccfccccccccccc6c7c66ccccccccff
ccbcffffcbbcccccc8666666cccffffffcccccffffc7cffffccccccfffcccfffffcb776cccfffcdbcccccccccccccbbbcfffffcfff677c7cfffcffcfffccfffcccc67dcfffcfffffc7b77c76c7777cfffffff7cc77bbcccccccffffcbcccccccccccccccccccccbccccccfffcccccccccc7c66ccfcccccc
ccfffccc66c6ccc7cc666666cccfccccccccccffffffccffffcccc6fffccfffffb7cc677ccfffccbbb7ccccccc7bbbcfffffffffcfffccccccccccfcccfcccccccccccffcfffffffffcc777ccccc777ffffffc77ccc7bbccccccffffcccc7ccccccccccccccccccb7fccccfffffcccccccccc77cccfcccc
fffcb7cc6ccccc7ccb7c6666cc6cffcbcfcccfccffffccfffccccffffffffffffccccccffffffcffcbdb7ccc7bdbcfffffffffffffcccfcccbb7c77cff7bcbdbcccfc7ffffffffffffff8cb7777b7cffffffffccccfccfcfcccfccccccccccccccccccccccccc7cfffcfccffcbefccccccccccc6c77cffc
ffcb7cccccccccccccc7cc666cc66ccfcccccccfffffcffccfccc777ccfffffffcccccfffffffcffffcbbbbbbbcffffffffffffccffccfccfcc77ec7c7cc77cccccfccffccfffffffffffffc77cccffffccfffffccccfffcccfcc77cccccccccccccccccc6c7cccccccccfcceecfffffccccccccccccccc
ccfc77c66cccccccccccc7bcc666cc66cfccbccccffffffcccc777cc77bffcfffcccffffffffffffffffccbccfffffffcbcffcccfcccffccfffc7c7bc77c7ccffccffccccfccffcbbcfffffffffffffffffffffffcfffffcfcbccccccccc77cccccccc66cccfcccffffccfccccfffffffcccccccccc7ccc
eff8cc77777cccccccc7ccccccc66ccc66cfccccccccccffccccccc7beffccbccffffffffcbcfffffffffffffffffccb6ccccccc7cfccccccccffccccc7cfffcccffcf8fccfccbbc6bbcffffffffffffffcfcbcfffffffffbbccccccccc77c7cccccc66cccccffffffcccccffffcffffffffccccccccfff
ccffffcc7777777677ccffffcc668c66ccc6cfcccccccfccccc7ccccffcbbb77bbcffffcbcccbbccffffff8ffffcbc666cccccbcccccffccfffffcccccccfffffccffccfccbbbbccc66bccfffffffffcccccbccbbcffffcccccbcccccc77cc677bcccc8cccffffffffcccffffffccfcfffffffccccfffff
cffffffcccbc77cbcccffccffff6668c66ccc6cffcbcfcfcccfcffffcbb7777ddbbcfcbcfcbbcffcbcfffffffcbb666ccb6cc66bbccffffcffffffcffccffffffccffffcbbc6666bcc866cbbfffffcffcbbccbbccbcccffccccfccccccccc7666c7dffccfffff8fffcfffccccfcccccccffffffffffffff
ffcf8fccffcc77ccfffc777ccffffc66ccc6ccc6ccfcccccccfffcc77777bbb77777bbcffbcfcbbcccccfcffcbbc6cc66666cccc6bbcffffffffffffccfffffffcfffcbbc66ccc666ccc8cbbcffccccbcccbbcccccc77cccffcccccccccc666c7ccccfcfffffffffffcccccccccccfcccccfffffffffc66
fbccffccffffcffffcb776ccccbcfffc66c8c66cc66cffccccccbb77b7bd77777bbdb7cbfcff7ccbbcccbcffccfcbbc666ccb66ccccbeffcfffffccffffcc8fffcfffdc8c6666ccc66ccb7cc8ffcbbcfcbcffcffc7b9bbccffffcccccbcc6cbbcf8fffffffffffffccffcccccccffc66ccccccffffc66ff
ccccffffc7cf8ffc7776ccccfc6ccffff866ccc6ccc66ccccccbc7777bb77767bdb777777ccfcfccccbccfffcfffcccccc66668cccbccccccccfcccffffccfccccccccbcccc6666cccbbcffffffffcbbcfccff77677ddb7ccfffffcccccccccffffffffffffffffccfccffccccfcccccc766ccccc6cfccb
ccfccffffcff8ffc6ccccccccff8fcffffffc66cc66ccc6cffccccc766766cbd777779776b77cffffccfffcfffffffcccbc88ccbcccccccccccccfffffffcccccccc7ccccbccccccbcccfffffcccffcccffcb767bb767ddbbcffffffccffcfffffffffffffccffffcccccccfcccccfccd77cfcb6cfcbccf
cfffffffffff8ffc8ccccbbcccccccccfcffffc66cc66ccc6ffffc7cffccbd7777d7776777dbbbcffccffffffffffffffcbccbcfccccccccccccccccfccccccccccccc77cfcbccbccffffffffccffffcccbd77d767bbcc7dddbcfffffffffffffffcfcfffcfcccccfcccccccfffccbb77ccccccfffbcccc
fffffffccfffffffccccccccccccfcccccccffffc66ccc6ccffffffffc77777bb76667799ddbcccccccfffffffffffffffffccccbeccccccccccccccccccccccccccccc6c7ccccfffffffffffffccfcc7fccbbddbb77777667bd7ccfffffffffcccfffffcfccccccbbccccccccffcc77cccccffffffccbc
fcccfcfcccffffcbcc777ccfffffffccccbbcccfffc66c8ccfffffffc77767766cb99d7bd7cccbbbbcb7cccbcfffffffffffffccccccccccccccccccfccccccccffccfc7ccccffffffffffffcbccccb66bbc777dd7db66776fccddbcffffffcccffffcccfcccfcbcffcbbfccccccccffc6cfffffccbcfcc
cccccccccccccbd7cfcc7ccf8ffffccccccfcccccfffcccfcffffffffff66cfccc7bbbb7ccbbbb666cccccccccccffffffffffcfcfccccccccccccccf6cccccccccccccccffffffffffffccffcccbc6666bbb7cc7bdbb76cccffcccfffffccfffffffffcccccbbcc666c6bcccccccccfffffffccc6ccccf
ccffccfcccbdd77ccffccfff8fffcbcfcfcfcfcbcccfffcfffffffffffffcfc6ccc77ccc7b769666cc666ccbccccccffffffffcfffccccccccccccccccccccccccccccfffffffffffffffc6ccbb6666cc6669bb77c7bdb7ccccfcfffffffffffffffffcccbbcccbbc66cfcccbcfccfffffffcbcccc7c6c7
ccccccfcfbb766c77cfccffffccbccffcfcccccfccccffffccffffffffffcfffc77cccc77c666ccc6668cccccbccccccffffffcfffccccccccccc6ccccccccccccccccffffffffffcfccccccbcccc6666cc666bb77ccc7b7cffffffffffffffffffffcccbbccccfcbbcc666cccccfffffffb7cccccccc77
fcfcccfccccc7776cffffffcbccccccccc6f6cccfccccccccfffffffffffffffccccc7cccbcccc6666ccb6666fbbbcfcccfffffffffcfcccbbcccccccccccccc77cfccffffffffffcccccbcc6666ccc666bcccbbfc77ccccffffffffffffffffffffcbccbbcccbcccc66c6c66ccbbcfffffcc7ccccccc7c
ccfccc7cffcf66fffffffc77fcfcfccfcccccccfcfccfcbccccccfffffffffffffc7cccccccbcc66ccc6666cc66c6cbccffffffffffccccfccbbcccccccccc7bccfffcfffffffffffccbcc66c666666c666ccbeecccc7cfffffffffffcfffffccccbbcffccbbcccbb66666ccccbbbcfcfffffccc7bccccf
7ccccfcfcccffffffcfcccccccfccccccccccc6ccff6ffcccccffcccffffcffffffcfcc7ccccccccc666ccc66666cccccccfcffcfffcfccccfccbbcccccbbccffcffccffffffcccccbcccc6666cc6666ccbcccccccccccffffffffccffccffccccccbbccfccccb6666cccccbbddb7cf7bcffffcc77ccfff
7777cffcccfffffcccbcffffccc66f6cccffccf6ccc6cfcffcbcc8fffcfc6fffffffffcc6c6f7ccbbcccc66668cb666cccbbec6ffcffcccffcc8ccbdcbdcccccffffccfffffcccbcc66666cc6666cc8cbcfc7fc6ccfffffffffffffc6cffccbbbcffccbbccccd6666ccccbbbd7ccfcbd76cbcfffccfffff
c6777cffffffccccbcccfcccff8ccbfcfc6cccccccfccfcfcffccccccc6cffffffffffffccccc7ccccccc86cc6666c6666ccccccccbcfccfffffff8c7ccfffffffffcc76ccccbbccccc66666cc66ccbcccc77cccc8fffffffcccfffffccfccccccbcccccbb666666c6cbbc77cccbddb76cf77cffffffccb
bcc66ccffcccffcccbccccffccccccfcccccccccccbcbffccccccb7fccfffffffccffffffffc6cccccccbcfcc66cc6666cc666cbbcccfccfffffffff8cfffffffffccc6ccbbec77cfcbcc86c6ccbbeeccfcccccffffffffffffcccfccffcbcf8ccbcbbcb6666666cbbbb77cffcddbccffbd77cc7cfff667
ccffffffccccccfcfcbbccccccccffbcc6c6cccccc6fccccccc7bcfffffcccccccccfffffffffc66ccccccbc6ccc666ccc6666ccbbcccccfffffffff88ffffffffffcccbbecccfccccfcccccccbccccccccccffffffffffffffffcccccbccbbccccbc6d666666ccbbdd7ccccb7cccccbddbccccbdcccffc
fffcccffccccccfcfcfcccccccccffcccccccc6fffcffcccc7ccfffffffcccccfcffffffffffffffc6cccccccbcc6cc66666ccbcfcbbcfccccffffff8ffffffcccccfcbccccccccccccccccbcccccccccfffccffffffffffffcfffcbbc6bcccccccb666666ccbbbdb7cfcbdd7cffcbddbccfcbdbccc7bcf
fffffc66cffff6cffcffffcbccc6cc8ccffcb76cc6fccccbcffffffffcfccc7cfffffffffffffffffc66cccccccbcc6666ccbcffcbcffcfccffcffcffffcffffcccccfcbbcfcbcfcccfcbbbcc6cccccfffff86cffffffffccffcccdbeffcbbcccb6666666cbbc7b7cfcddd7ccfcbbbccffcddbccffc667b
ffccffffc666cfcccfffffffcccccccccfccccfcccccccccfffffffffc77cfccfccffffffffffffffcffc6cccccccbccccccfcccccc6cfcccfccccccf8cccccfccccc66cccccccccccbbcccccc66cffffffffc6bcffcffcccfcbccccbcccccbb666666cccc67766cfcdb7cccbbd7ccffcbd7ccfffffcccc
f66666c66cff66cf86cfffffffccbcc6cccfccccccbccfffffffffff7cccc7cfccffccfffffffffffcffffcc7ccccfcbbcfcbccf67f6c7cfffcccfffffffcccffcccc7fcccfcbcfcebcfc7cbccffccffffffff866bccf88ccbcbdccccccbcb6666666bbc77666c666cc6fcbddbccffbb76cfffffffcccfc
6cffcc6cfffffc66cc8ccfffffffccccccccfccccccffffffffffcc6cfcffccccffccfcccffcfffffffccffcccbeeccccccbccc6cccc7ccccccccccffccfffcccccccccfcccccc7cccc66cccfffffffffffcffffc66cfcccbbcccbbcccc6666666ccb767666666666666ccb7ccccbdbccfffffffccccccc
ffcccccffff8ccffc66c8cccffffffccbbccccbccfffffffffcccccfc666cffccccccfcfcccffffffffffcccffccccccccccccccc7cccccfccccccffcffccc7effcccc7c6ccccccfccc6ccffffffffffffffffffff8fcbccccbbcfccbb666666cbcc766666667666667766ccfbddbccfffffffc6cfcccc7
cccfffcccfccffccffc66c88ccfffffffcbccccfffffffffcccccfffcc6666cffccccfcccffccfffffffffccfffffccc7ccccbcc7cfffccccffccc7bbb7c7cffcccfcffcc7ccccccccccf8fffffffffffffffcfffffffccbccccbbcd666666cbbc6666666666666666666666cc7cffffffcccccfccccbcc
cfcccffccccccccfcccfc66c8cccffffffccfffffffffffcddbbbccccfcc66cc77cccccffccfffcfffffffffffffffffccccccccfcccccffcccc777ddd777ccccffccccfcccccccccffff8fffffffffffffccbccffffc6cccbccb666666cbb7c6766666666666666666666766ccfffffcfbbfccccccccff
ffc666ccffcbcfcccfccffc66c8868fffffffffffffffcddddbcbbccccccccc777ccffccffffcffc88ffffffffffffffffcc7cff7bee77ccfff7777dddd777cffc6ccccccffcccfffffff8ffffcffccffccbcfcbccfff866cf6d66666ccbc6667666666666666666666766666666cfffcffffccb768ffff
cf66c6666ccfcccccccccccfcc66c8c8ffffffffffccdddbb77bbbdbbcc7cc776fffffccfccccccccccffffffcffffffffffcfccccc7ccc6ccffc7777777ccfccccccccccccffffffffff8ffffccfffccbcccccccccffffc666c666ccccc77666666666666666666666666666666666ccfccccccfffffff
cbcff66666cccffcbcfccccccf666fcc8fffffffcbbbddbb7ccd1ddb77fc77cffffffffcfccfccfcccccffffccfffffccfffcfcccccccccfc7cfffcc76ccccc7cccccffccccffffffffffcfffff6ccfffccc777cccccfffff866cccc66cffcc7666666666666666666666776686667666fcbccfffffffff
cfcccc666666fccffcccccffc66ffc7bcfffffccbddbb7bbbddbbb7ccccfcc8fffffffcbcccccccccccffcc6cffffffff8ffcfffcccccfcbccfffffcfc8fffffcccfcccccffffffcffffffffffffccccffcccbcccffcccfffff86666cffffffccc66666666666666666666666667766ccbccfffffffffff
6ffcccccccc6666cccfcccc66ffffcfffcccccc7dbbbbecddddbcccc666fc88fffffc777cccccfcccccccccffffffffff8fffffffccfccccccfffff8fcfffffccfcccfcfffffffccfffffffcc8ccfffcffcfccfcfffcccccfffffffffffffffffcc7766666766666766666666666ccb7cffffffffffffff
6c6cffcccccc66c66cfcccccccbcfffffccb7ccfccccbdddb7766c66688fc8ffffcbbecccbbcb7cfcccccffffffffffffccfffff88ffcfccccffffffffffffffcccfcfffffffffcccffffffffcccfffcfffffffffffccccbbcbcfffffffcfff8ffffc7c66666666667666666666cbbcfffffffffffffff7
66666ccfcccccc6cccccffccbbbbcccfcbcccccfffccbdd77ccc666888ffcbbccccccbcbbcccfc77cccffccccccffccfc6cfffffffffffffccccffffffffcccccfcffffffffffffccccfcccffcfcffccffffffffffccccbdbcbcccfffffffffffffffccc766666666c666666c77ccffffffffffffffcccf
c6cc6866cffcbcfcbeffcbcbddbcbcdbee7776cfffffccc6cc66c8888ffbd769dbcfccbccffffcf67bcffcfccffccffc6cfffffffffffff8ffcc7ffccccccc6cc88fffffffffffffffc7cf6ccfcfcbeecfffffffffcb77d11dccbcfcccfffffccfffffffc7b6666f676666c7bccffffffffffffffcccccb
eccfccc6ccffcbccffcccbbcccbbbb7bbcc7ccffffcff8cc66c8888fcbb77666667bcfcfffffccccccbcccfcfccfccccffccfffffffffffffffcf6cfffccccf8ffffffffffffffcffffcfccfccccccccccccffffccccccbbbc7ebcccccfffffccc8fffffffccccc66666cccccfffffffffffffcccfcccfc
ccffcc66cccccfffffcccccbcccbb7cbcc6cc66fcccfffc688ffffcb7779969966666cfffffccccce7eccbcffcfccccfffffccfffffffffffffffffc7cfcfffffffffffffffccffccffffffcbbcfcc6cccccccccfccc7eccccbccfcccccbcfffffffffffccffccbcf6cb7cffffffffffffffccffccfccff
fccccccccccffffcccccfcccc7bcc7ccfcccccccccccccfcf8fffb976677796666688fffcccccccccccccc7bccfcffffcccccffccffffffffffffffffffffffffffffffffcffccfffcffcccbccc6cfffccccccccccfffcccccffffcccbbbcbccfffffcccffffffccbb7cffffffffffffffcccccfccfcfff
ccccccccccfffcbcccccfffcccccccfccccccbbbccfccccfffffc66679677666688f8ff6ccc7ccccfccccccccbccffffcccccccfcccffffffffffff8ffffffffffffffffcfcccfccccccb7cccc8cc66cccfccccccfffffffffffffcbbbbbbbbbbcfffffffffffffffcfffffffffffffcffccccccfcffffc
c77fffccffffcc7bcccccfcffcccfcfcc66cdb7c7bcfc8ccccc8f8886699666888fffcccceccccccccfccccc6cfccfccccfccfcccfffcfffffffffffffffffffffffffffcccfffccfcbcff8668ccffcccfc6ccccbccfffffffffffccc7bbbb77bebfffffffffffffffffffffffffcffcccfcbfcfffffc66
776fcfffffcccffcccccccccfffffccbcccc777bc77ccccc6ccccf888886c8fffffcccccccccccccccccccccfcfccccfcfffffcffccfffcffffffffffffffffffffffcffffc7ccfffc7bcccccc6ccccc66fccccccccccffffffffccc7ccc7bccccccfcfffccccfffffffffffffccccccf7cfffffffc6668
68fffccfcccccffffccbccccccfcccccc7bcccbbbcc777ccf86cccff88888ffffc7bcccccc7eccecccccccfffffccccbcccfff8fcfff6cffccffffffffffff88ffcbbbcccf8ffcfffffc7bcccfccc666cfc6c6fcccccbbcffffcfccffcbcccbbcfcfccc77cccc7bcffffffffffcccf7cfcffffffc66f866
ffffcccccccccffffffcccccccccccfccccccccccbbbbcccccccccccfff8ffffccccccccccfcccccccccfffffffcffccfccccffffcfcffccfffffffffffffffcccccccbccffffccffffffccccccccccccccffcccccccccb7cccccccccfcccccfcffccbbcc7777ccbbcffffcccffccffcfffffcc66c66c8f
ffffcccccccccffffffffcc7bcccccfcfcccccbbccbbccbbccccccccccffffcccfcffccccc7ccccccffffffccfffccffc7cfcccccffcfccffccfffcfffffffcbccccccfccbccffcfffcccccccbcccfcccccf8c6cc6cccccccbccccffccffffff8fffbccc77bd7cb7cbffffc7ccfccffffffc666cc66cffc
fffccbcc77efcfffffffffffc7bcccfcfcfcccccbcccbbbbbbccccccccccccccc7cffffccceeccccfffffccfccccccccfcccccbcccccfccbbccccfffcffccbcccccccccccccbccffcccfffccfccbcccccf6666fcfc6ccfccccbbefffffffffff8fffbcbbcbd1bcccfdccccccffcccffffc666cc66ccccbc
ffccccffcccfccffffffffffffcccbcfcccfffccccbcccccbbbbccccccccccccfcffffffffcccccfffccccfcccccccfcc7ccccccccccccc66cccfcccfcbbccccc8fcfccccccccbccfffffffffcccccccccfcf6ccccccccccc77cffffffffcfffffffbccbddddddbcbbfcccfcfffffffc666cc66cfcb77c6
fcccffffffc6ccccffffffffffffccb7cffcffffcccbccccbccbdbcbcccfccccfffffbbffffffcffffccffccfccfccc77c7ccccfccccbcc88fcccccfcb7bcccccfcc6cccfcccc77eff7bbcfffffffccbccccff6666ffcccbbcffff6fffffccccff6fcccccbddbccbccfcccffffccf6668c666cfccbc6ccf
ccccccfcccccccccccffffffffffffccccccccffffccccbcccccbbbbbccccccccfffffcfccffffffffcccccccccccccccccccccccccc77cfffccccbbc66cc7ccccccccfcccc77c6cc77cccccfffffffcc7ccccfffcccc7ccffccffcccccccfccccfffcccccccccccfffccccccccc66c666ccccc7ccccccf
ccc6ccc77cffffc77fccfffffffffffffc7bccccfffcfccccbccccdbcbbcc7ccccccffffccffffffcbbbbcc7cce7ccbccccccccccc7cfccffcccbbc66cccccc7ccccffccc776fc7c7cccccccbcffffccfccbbccccccbccfcffbdcf6fcccfcccfcc7cffffffffffffffffcfcccb6c66ccc6fcb7c6c6ccfcf
ccccfcccfffcfffcffcccccffffffffffffc77ccccccffccccccccccbbbb6ccccccccccfffffffcc7c6cc7ccc7cc77ccccccccccccccc6cfccbbc66cc7cc666cccccccc77cccc7ccccccccccccbccffcffffcbccccccfffccffcffcccccccfcccffcccfffffffffffffcccffcc66cc6cfcc7ccccccccccc
ccccfffffcccccfcffcccfcccfffffffffcccccbbcccfffffccccbbccc66fcbbbbccccccffcfcb7766ccccc7bcc7cccc7cccc77cccc6cffcbcccccdccccc6ccccfccccccc7cccccccccccccccccccbffffffffccccffcccfcfffffcffcccfffccccffcccfffffffffccccccccfc666ccbcccccccffcccfc
cccccccfccccccfcfbcfcccccccfffffc776fffccbcccccffffccccbc8ccbbb7bbb7cffcccfbbcccccccccccc7b777cccccc7cfcc68ffffcb7cccccc7b66cccfccccccb77cccfcc6cccccc6ccccc7ccffffffffffcccfcfffffffcccbcffcbcfccfccffcccfffffccccccbcfc666ccbcccccccccfcccccc
ccccccccccccccccffcffcffcccccfc77768fffffcccbccccfcffcccccbbbbcbbccccffcccccccccccccc7ccccccccc7cccccc66cfffcccffcccccccc6ccccfcb77777776ccccccccccccccccc7ccfffffffffffffcfffffffffffcfcfccccfeccccccccfccccfcccccccfc66ccbcccccb7cfccccccfccc
fcccccccccccccfccccccfffcccccb7768ffffffffff67bcccccffffbbcbbbbccbccc666cfccfcc7c7bcccfc76ffcc77cccc66ffffcbccccbbcccbccccccfcbbc777766ccbecbccccfccccccbc8fffffcffffcfffffffffffffcbeffcffffffc6fcfccfcccffccccbcffc66ccbbc6ccfcdbeffc6cccbccf
ffccbccccccccccccccccccccccc766fffffffffffffffccccccccffccbbb77ccfc6666666cccfcccccccc7cfccc77c8fcccfffccccccccccc7cffccccfcccc77776cccc7777777ccccccccc8ffffffccccccccccffffffffcccffcccfccfffffccc7ccffcccccbcff666ccb7cccccccceefcccfccccffc
fb76cc6cfccccfccccccfcbbccbdbffffffcffffffffffffccbccccccfccbbcfcb666666666bcfcfccff6cfcccb768fffffffcbbccbdbcccccc7cfffcb7ccfccccccbc777776ccccbccbcc8fffffffffcbccffcfcccffffcbcfc6cffcbcffccfffffcfccccccbcff6668cbbcfcccccccccffccbcccfffc6
ccfffcccccfcfcccccccccc7dd7c7ffffcfccccfffffffffffccbccccffcccfcbccbcc666666bcccccccccccc7cffffffffccbccbddbccccccccccbbcfffffccfcccc777776ffcfcccccffffffffffccccccccccccccccccfc66cc6ccfcccccffcffcfccccccfc666ccbbbccccccccccccfcccccffccccc
ff8ffffccffffccccccccccfc7cfcfcfffcccccccfffffffffffcc7bcffffffcccccbbcc66bcccfcccccccbcc8fffffffcbccccc7cccccc776ff6ccdbcffffccfc7c7776cffffcfffffffffffffffcccfcccccccccccccfc6ccffffcccffccccccffcfccccfc66ccbbccccc77ccccfcccccccfcffcc7777
fffffffcccffccccddccfffffcfffffcccccccccccccfffffffffffc7cccfcffffcccccb7cccffc6ccccbccffffffffcbbccccccccccc777cffffcfcccb7cffffcfc66cffffffffffffffffffffcccccccccfcccccffcc6cfffc66cffc6ccfccccffccccfc66ccbbcccccccfcbccccfcccfffffffffcc7c
ccccffffcccccbddbbbbbeffffffffcccccccccccccccffffffffffffcc7ccccfffccccccfcfffc6c77ccffffffffccccccccccccc77766ffccccccc77cc77ccffffcffffffff8ff6cfffffffcccffccccccccccffcccccfc66cffc6ccfccccfccccccfc66ccb7ccccccccccccccccccfcccccccfffffcc
fcccffcffccdddbc7ddb7bcfffffffcbccccffccccccbcf8fffffffffffc7bccccffffcfcfcfccccbccfffffffffbbcccccbccc7777668ffccccc776ccdb777bbfff8ffcccfffffffffffffc7cfcccccbcfcbcfffcbcffc6cff6bcffc6cfff66cffffc668cb7ccc6ccfffcccccccfcbcc6cccccfccfffff
ffffffcccfcccccffccbdbccfffffccc7ccccccfc7ccccccccfffffffffffccbccccffffffcccc7ccfffffffffffccc7cccccb7776ccfcccccccccc77777ddcc77ccfffffccffffffccffcccffcccccfccccfffccfffccccc666666ccfc6ccfc666666ccbcccc6cffcccccccffc66cccc7ccccccccccffc
cfffccccffffcc6cffccbccffccfbbccccccccccccccccccc7ccfffffff8fffcc7cccccc6ccb76cfffcffffff8ffcffcbbcc777668fccccccc7cffc77777cccccc7bcfffffffffffffccccffccffccccccff7bcfffcccfcd666ff8666bfff66cffcffcbccccccfc6c6cc66ccc666cfccccbbccccccccfff
fccccccffcc77ffcc77ccfffcccbcccccccccccffcccccccccccccfffffffffffccbccccccbc8fffffccfffccccfcfccfcc776cfcccccccccbbbcccfc67777ccc7cf8ffffffffcb77ccfccccfcbcffccffccccffcccccb66666fffc6666ccf866cfffcb7cccccccf66c66cc666fcccccccccbcccccfccff
ffccccfcc776cfffcccfffffcfbefeee7ccccfffccccccccccccc7ccfffffcfffffcccb7ccffffffffffcccccccfffcccffccffccccccccddbcddbcccccc777ccc8fffffffcb7777767ccfccccfffccfc66cffcccccb666666686666666666cfc66cfffccbccc6cf66c766cccccccfffff66ccccccccccc
ccffcc7776ffff8ff8fffffffccbccccc77ccffcccccfccc6cccccc7eccfffffffffffffffffffffffffffcbccccffffcffcfffc7ccccc7bdddddb6cc7cfc6cffffffffffcb777979b6c7bcfcccffcc6ccffcbccc6666888696666669688c666cffffffffc7bccccc66666c6cccfff6666fcccccc7cccff
fcccb776fffffffffffffffccccccbccccccccccccccccccccccccccccccfffffffffffffffffffffffcccffcccccffffffc8ffccc7bbc7777d7776bbccccfffffffffcbbcc7777777b77cccccfcccfffcccccb666666fffc6666966666fff6666ccfffffffccbccccc6cccc6cfc67777668ccffccc7ccc
cddd76ffffffcfcffffffcfcbcccbccbccccc7ccb7fcccccfccccccccccbbf8ffffffffffffffffffccfccccfffcbcfffff8fff8ffbbbfc6777766fcbbcffffffffffbbccff6667b77666ffccbbffcbcbbcf696c66d6c86c6669669666cfccc66c69cffffffffccbcfcfc6ccc66c777777768cc66c6ccbc
f77cffffffccccccffffccbcccccccccccccccccccfcfcccccccccccccccc7cccffffffffffcffcccccccccccccfcccccfffffffffcfcbcc86688ccbcfffffffffccb7ccccf8886666688ffccccbcffcccc66668ffc6666666666fc666666666666cfffffffffffccbccccccccc67777766c8666c666ccc
fccfffffcccfccfcccccfccbcccccc7ccccbbccffffcfcccccccccccccccccccccccffffffc7cffffcccccccfcccccfccccffffffffffcc7ccfcbcc8ffffffffcb7ccc7cccccff86888ffcccccccfffcb6666668fc66669966666fff6666666668ffffccfffffffffcc7bccccfcc6666cfc6ccc6c666ccc
fccfffccccccccccfcffcffccbcbcbfccccbbcccfcccfccccccccccccccc6cccccccccfffffcfcccffccccffcccccccffcccccfffffffffccbbbcfffffffffcbcc66ccccccccccffffcc7cccccfffcb66686666c6666666666666ccc66669668ffffccb7ccffffffffffc7ccccccc6cccccccc666666cfc
ffffccccccccc8ccccccccccfccbbccccbccffccccccfccccccccccccccb7cccccccbcccccfffcccccffcccccccfccccccfccccffffffffffccfffffffffc77666776cccccccccccccccccccfffc666666ff66666666666cc666666666666fffffcccc77ccccffffffffffcccccccccccfffccccc6ccccc
cccccceccff6bcfcccccfffcccffcbbbccffffffcbccccfcfcccccccccbcfcccccccb7fccfcfccccffcccfc7ccccfcccccccffcbfcffffffffffffffffcbc6777766cbcc7cfccccccccbccfffcb6666668fcc66669d66668ff866666668fffffcdefc6666ccbccffffffffffc7bccccffcccccccccccccc
fccccccfccc6cfcccccccccffcccffccfffffccccccccccccffcccccccccc6ccccccccffccccccffcccccfccccccccccccccccfcccccfffffffffffff7767776667b7c7bcc7cccccccccffcb6666886666c666666666666cc6666666cffffcccccccccc6666cccccffffffffffccccccccfcccccccccccc
fcc7ffc66cccfcc866cccccccffcbcfffffccccccccfccbcc6cccbbcccccfcccb7ccc66fffccccc6fcccccfcfcfccccccccccccccfcbcfffffffffffffc677cc77cceecccccccbcfffffff9966668f86669669666cf866666666968ffffcbcc66677ccccfcc6ccccbccfffffffffccbccccccffccccccbd
fcc7ccc6ccccccfc6666ccccccfffcccffccccfffcccfccccccc7cccccccccc7ccccccc6cfffccccccccffcfcfc7ccccccccccccccffccccffffff8cfffcccccccc77ccccccccc7ccfffff886666c6666669966668ffc66666968fffffcbee67776ccbdbb7cc6666c77ccfffffffffccbcccccccccccbbb
fcffccccfcccccccccc6ccccccccfffcccccfffccccfc66ccccc6c6cccccb7cccccccccc6ccfffccccccccccfccfffccc7cffccccc6cffccbcffcf8cfffffccccccc777c7cccc76cc7cccfff8c666666666866666c666666668fffffffc77cc66fccdbbbdbccf6666fcc7bcfffffffffcccbcccccb7777c
    `)
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
