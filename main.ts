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
ccccfcccffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfccccfccfccfcfffccfcccfccffffccccfffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffffcfccccc
ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
c888888888888888888888888888888888888888888888888888888ccc888888888888888888888888888888888888888c8888ccccccccccccccccccccc88888ccc88c8888ccccccccc8888888888888888888888888888888888888888888c8c888ccc88888888888888888888ccccc8888cc8cccccccccc8cccc888c8888cc8c8888888c888888888888888888888888888c88888ccccc88888cccccccc8c
ff8fffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8ffcfcfffff8ffffcffffcffcffff8f8fffffffffffffffffcfffffffffffcf
fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
cfffffccfffffffbccc7bccffffffffffffffcbfffffffffccffffcffffcbfffffffffccfffc666cffc66cfffcc6ffffcbcffffffccfffffffffcffffcbffffbcffffffffffffcffffffffffffffffffffffffffffffffffc6ffffffffc6fffff6cffffccfffffcfffffbcffffcbfffffffffffffccffffffcfffffcffffc6fffffffffffffc7bcffffffffffffffcffffcffc6ffcc6cffccfffccffff68fff
ffffff86fffffcc7bdbfc7b7cffffcdbbfffffcfffffffffc6ffffccfffffff66fffffc8ccb6cfc66666cffcc66cffbcffc66ffff6cffffffffc6fffff6ffffcfffffffbbffff6ffffc9cfffffffffffccfffffffffffccffcccffffffffc6ccffffffc6fffffc6cffff6cfffffcfffffffff6cfffcffffff6fffff6cffffcfffffffffffffc7777cffffffffffff6cc66c8666ffc668ff666cf66ccffcffff
fffc6fffffffcc7cfcbdbcfccfffcffcbdcffffffffffcb8ffffffcfc6fffffccffffff6dcf8cccf666ffc6668ffffc66ccfc6bcffcfff6cfffffffbff6ffffffdbfffffcffff8ff6cfcfffffffffcfffffffffffffffc6ffff66ffffffc96666fff66fffc66cffffcccffc666cfc66fffffc6fffffc8bfffffcbfff6c9cfffc6cffffffffffb7b777fffffffcdcff66f8cc8fc6c6668fcbff666f666ffff66
fbcc8cffffffcfff7cfcbddefffbbbcffc7dbfffffffc8ffffbcffcfff8fffffccffcb9cff66fc668f8cc66cfffffffc6cfccff69cff86ffffc6cff6ffcfffccfffcffff8ffff8ffccfffffffffffccffffccffffffffffc6cff666ffff66666cfff866cfffc66cf6cffff66866ffff66ffccfffffcfff8fc66fc6fffcfc6cfffffffffffcdddd76cffffffffff866cfcccf6b6cc76666cf66bf68ff86bffff
f6ff68ffffffcffcfc7cfc77ddcffc7dd6de8ffffff8fffffffcfffffffc6cffffcd9cff66ff96ffcc8666fffffffffff66ff66ff6bbccfff6fffffcffcfff66fffc6ffffffcffc6ffcfffffffcccffcbbcfffcccfffffff886cffc66cffc66fc669cf8666fffc66cfffff86666ff96c6666ffff8cfffff6ffcffc66ffff88cffffffffbddd7768fffffffcbfffff868fcb76ff6888cb6ff66ff6b6fc68ffff
68ffffffffffcff8ffff77fc77ddbffc7bf88fccff8ffffffffcfffffccffccfcbbcffc6f866ff86fc66fcc666fc66cfffc668668ffcdcfc8ffffffcffcffffffffffccfffcfc768cffffffbfffffcbddd1bcfcfff6cffffff8c6cff866cfff666766cfffc66fff886cffffffff666668ff86cc8ffffcc8ffffffcfc6ffffff6cfffcdddb77ccfffffffbfffdbffffff668666cc76ffff6686c6cc668fffccc
f8ffffffdcffcffff8f88c77cfcbbb7ffcf8ffcfff8ffffffffcffcfffbcffcdbffc6cfc66ffc6cc66cc6dc86c6ccfccffff66f8c66ffcdbcfffbffcffcfcffffffcf8ffffc768fffffcccfffffcddbcffc7dbcffcfffccffffffc6cfffc66ff8688cff6668866ffffc6cf6ffff66f666cff866cffffcffffffffffffcfffffffccbdddb77cffffcffffcccf7fcbcffffc6688cccfc666666ccc66ffffffccc
fffffcbfffffcffff8ff88cc77cfcfccfcfffcccff8ccffffffcff6cffffbdbfc66cfc66ffcf6c66f6996666ff8c6ccf6ccfff66c8c66cfc6bcffcfcffcf6fffff8fffff676fcfffcffffccffbdd7667776767ddcfffcfffffffff8c6ccffc66cfcffc66666cf866cfffc66fcff6f66cfffccf866cff8fffffcfffffffccccccbdddbcc6cfffcddddbffffffcffccccfffffc6f666cf6668f666fffffb7cffc
ffcff8cccfffcfffffff88ccccc7cffffc8fbd1ddcffcffffffcfffcccbdcc6ccc6c6cff666fcc869d6666886996c6c6cccc6ffff66ff666cf6dbfffffcfcfcffffffff666cfffccfcbcffcb77667dddddddd767bdbefffccffffffff866cffc666cfc666868fccf666ffff66cffc8fffffcccccf666ffff6666ffcfcfffcddddc77cc6fffbdddbbdddcffffcffcf7ccfcffff668fc66cc666ffffccfcfcfff
ffff6cffbfffcfffffcfffc8888cccfffffffc7bddfffffffff88fffd9cfff8c66cc68ff66c666996966cc6966669cffc666c666ffcc6ccf66cf6dbfcf6fffcccfffc76c8fffffffffcccdb7767dddddddddddd766bdbcffffccfffffff866cff8666ff66ff66666ffc66cff8c6cfffffffff66666f66cf666cfffcfcffccbddd7cfcf8fcddbddddcccfffffcffffcff7b7cffff866ff6bcffffffccfcfffff
cbfc8cccccff8ffcbbc7bcfff88cffffff8fffcccffffffffffff8f8c6ddcffffc66fc688ccd9696968cc6799968fc9dc8c66fcccfffffc6cfc6666fcf8ffffc67c7cccfffffffffffcd77767ddddddddddddddddb666bdcff8ffccffffff8c66ff8667fffc66666ffccc66cff866cffcbfff66666cff6666fffffffffcdddbccfff8f8fcddddbbccfffffffffffffffcccffccfff8666ffffcbccccfcfffff
ffd68ff6ffff8ffbddddecccffffffffcfcffffbdbcffffffffffffcfc8699cffff66f8696666666f668699666f8996696888c6c866fcc8fb96ccf8fcfc7cffff8c88ffffffccfffbd766fcddddddddddddddddddddccf67deffcfccffffffffc66fff866cff8fffc66666f866ff866bffff86888ff6667cf6ffffffffc7b7c8ffff8fcffcbdb78ffffff8cccfffffffffffbb7cffffffffccfccf8ffffffcc
ffff89cfffff8fffccd7cfffcff8ffffff8ffffccc8fffc7ccbffcf8fff886696ff88c9966966fc6c6996698cc69969968866cfc6fc6fc99688fff8fcf8ffcffff8fffffccffffcddb6ffc6dddddddddddddddddddd7cfffbddcfffffcbffffffff66fff866cfcffcc6666fff666ffc866cff88fffc66666cfffffffffcccffcbfffff8ffcccccffffffffccfffffffffffffccffffffcfcbcfffffffffffcf
fffffcfffffffbbffcc6ffccfff8ffffffffcdfcff8fcfcf8f8ccfccfffff888696ff6666968c66699996c8c669666688cb6699cf6ccd968f8ffffffc8fccfccffffffcccffccffcfbddbc67dddddddddddddddddd76cbddbfccc8f8cffffcfffffff66cffc6667f66666f6766c666ffff66ccfcdff6c88ffffcccfffffcfccddddcfccffcccccfffffffcffccccfcd777cffccfcbfffffcccfffffffffccff
fffff8ffffcbbcfffc66fffffff8fff8fffffffcffcf8fcfffcfffcfffffffff8869dcfcccc66966666c8699699666f66699998cccb968ffffffffffcffcfcff8cffcccffccc8ffcffccc1dc677ddddddddddddb76cddcffffcfcccfffffccfffffffffc6cffc866cf6cc66666cfff66cfffc6ccfbffccfff6777ffccffffcccbdbddccfffcccfffffffffccfcfcd76666fccfffffccffffffffffffcbcffcb
ffffffffcbd7cbbcfcc6fffffff8fff8ffcc8ffcffcfcfcfffffbd1dbcffffffff8866dccc669669688c699696ccc666696668cb96688fffffffffffcffcfcccc68ccffcccfc7bfcccffccbddb677ddddddddb76cbdb6cffffffccc6cffffffccffffffff86cff8666cff66666fc66cf66cfff86ccccffccc868cfccfffffffffcbbcbdbcfccffff8ffffcccfcd768cf686ffffffcccccfffffffcbffffcccf
ffffffcdd76cff67dbeefff88ff8fff8ff8ffffcffcfcfcfffbddd7dbbfffffffffff866dccfcd66cc6996666cf666996668fb968fcfffffffffffffcfffcbbbefcfcccffff7ccfffccf8ffcbddc667dddd76c7dd76fffffc8ff77cccffffffccdbbcffffff866cff8c6cf8cff66666cffc7ccfffcfffcccf888cffffffcfffffccffd7ccfcccffffffffcfbdcc6667fcccccc6ffcfffcccfffffffccfffccc
ffffcdb768ffc6cc66bbcfcffff8fff8ff8ffffcffcf8fcffcc77dd77cfffffffffffff8869bc88c996666ccf66699666fcb6688fffffffffffffffcffcbbccccbccccccccfcfffff88fccfffccbdcfc77cfcddcccff86cf8fffcffcccfccfbb76fcbbcffffffc66cffcc66cff66668ff6668ffffffffcfffcfffffccccffffffffffccffccccffffffffbd76ccccccfbbdbc6688fbcfcfffffffffff6dcfff
ffbd77b76ccc677ff67cddcffff8fff8ff8ffffcff8f8ffbbcccccccfffcdddffffffffff88699cfc6696ccc6699986fcd668ffffffffffffffffcffcd7c69668fcdccccccfcffffffffcffffffffcb6ffcdbff8ffff88ff8fcffffff6cfbd677676cccdcffffff8866fffc66cf88ff668ffffc6ffffcffc8ffffffccffcfcffffffffffffcffffffffdd666668fccbd7c6cbbcbb66cffffffccffffff7fc7c
bd7c66c777ccfffc77fc6f7dbff8ffffff8ffffffffffd7cfffcccffffdddbbdbffffffffff8c899cff68866669c8fc19688fffffffffffffffcffbdb6699668bbffcdbefcfcfffffcff7cffffcfcfbdd11bfcffffff88cfffffffffffdbe6766677776fcbdffffff8c66ffff66cf6688fffc6ffffffff6ff8ffcccffccfffcccfffffffffff8ffffdd7c8f88f7fc777ccfbbbb68f88ffffffffccffffff77e
7cf8cccc67d6cfbefffff6cc7dbfffffffcfffffffcb7efffffffffbbfddbdbccffffffffffff88866bfc6699cffbd988fffffffffffffffffffbdc6669666cfccbcffcbdffcfffffccfcffffffffcffffffffffffff88fffffffffcdbe6777766666ccfce7dbfffffff866ffcf66cffff66cffffffc6ffcffbbfffccfcfccffffccffffffffffcddc66cd66dffcccccbcb7cccc8cfcbc6ff7fffffcffffcff
66fcfcc666fcb6cc6fc7cffcfc7dbcffffcdcfffcbccfffff8fffbbeffcddbcfffbbfffffffff8f888699ff6fc696c8cffffffffffffffcffcbb6669966ccc66cfcccccfcbbcffffffffffffffffffffffffffffffff88fffffffcdb6677766677766fc7cc7ccbdcffffff866666fffc668ffffffccc88ccf8ffebfffcbfffcbcfffccffffcfcbbc866bbf88cccfccfccd7c8fcccfccfccffccccfffccffcff
8cbc7bfcccff67d77cf76cfc7cfccbdcffffcbccccffffffffcbbefffffccffcbbccffffffffffffff88696c69688fffffffffffffffcffcbb6699966cccbcfc6cccccccccc7dbcffffffffffffffffcffffffffffffffffffccbc677776677776fccb6f67ddd777bcffffff86fffc66cffffffccfccfffccffffffecfffccfffc7ffffccfcd7f867f66c8fccc6fcffcc7ccffccc7ccbcfcdddcfcccfcccfff
8c7cf66cffc7d77677bcc76766ccfc77dbcfffcbccfffcffcbbefffffffffcbbccffffffffffffffffff886668f8ffffffffffffffcffbdccc86666666ccffcc7cccffccccb77cbbcffffffffffffffcfff8ffffffffffffcbbec76677677776fc77cf677767d7cfcdbffffffffc66fffffffbcfccccc6cfffcffffffccfffccfcffcccfbdcf86ccccbef6cccccfcffccbcfffccccfffcbcc667ffccccfffff
cffc66cbc7d766fcfc7bbec66cc8cccc777bcfffcbbcfccbbccccffff8fcdbccffff8ff8fcffffffffffff88fffffffffffffffccffbdcccccffc866668c7ccfcccc7cfcb77c7cfccbcffffffffffcffffffffcdbcffffcbbcc77f666f7776ccb766cbddd776ffbbbccfcffffff68ffffccffccfccfffccccffcccffffffcfffffccccbdd666cccccf6fcccffbcfcffcc7ccffccccfdffbff666fffcccffc77
d7cffff7d76fffbccfc7cbdcfcfccccfcfc77bbfffcbbbfcc7cbfff8cbdccffff8cfccfff8ffffffffffff88ffffffffffffcfcfffddcfccccccfffc8cccfcccccfcccb77cccc7b7fecdbffffffffffffffffcbee8ffcbbfff6c7776776cf7bcffcdddd7778cbb78ffcffcccfffffffff8cccfcffffffffffcccffcfffcfcffffcfffc7768f66cccbfcf6fccfcffcffcc7cffcccffccffcffcfff8fcfcffc76
86dd7dd7ccf8fcfcccccfcc7dccfcfcccfccf77ddcffccdbfccc7ccbbecffff88fcccf677fcffcfffffffff8fffffffffffffcfcccfc7dbccccc7cffc8fc7ccccccfcbc666c76cf67e7ccbdffffffccfffffffcfffcd7cfcbbcc7c877fcc7cffcc7bd7778fbdcfffffcfcf6ccffffcbffffccccffff6cff77cffffcc8ffcfff8ffcd7f8fc6cff6d66fff6dccfcffcffccffffccfffccffcffcfffcfcffbdcfc
8cc7d7f6f8fcf6cbfbcccccc6bdcffccc7cccffc7bdcfffcbcccfbbccffffccfcfcffcf66fcdd7ccfffffff8fffffffffdcfffccfcfffcbdbff7cfb7fc7c6ccfcfcbddd7cc6cff87cfcbecdddfffffffffffffcfffbccffffc7cfc7cfb7ccf7d6fe776fcdbc8ffffffcfccfc6cfbbfccffffffffffffc77fffff688fccffccfffffcfffffccc7d66fcc77fbffcfccccccffcfcffcfccffcffcfffcfcfc6668c
c7d7ccffbcccc6c6fbc8fccccc67dbeec6ffcdcffccbdcfffc7bbccffffccccccfffc6cfcbddddbcfccffff8ffffffcdbccdbcccfcfffffc7bbcccccccfccccc7dde676666ff66cfccccbdcccfcfffffffffffcfffcffcbbcffc7cfcbcfc7777776fccdbcfffffffffcfcccccbbfc8669cffffffffc76cffffcffffcfffcccc778ffcffffccf66ffc9966cf6fccfccffcffcfcccccffffcfccfffffc8c666fc
77cc68cfbfccccfcf7fcccffcccff7bbccbb7ccffcfcc7dcfffccffffcfccccdddcfcfcccbbdbddbdcf8ffffffffcddccbbecdbcfffffffffccbdccccc7ccc7776776fccfc676fccfcbbcfffcfffffffffffffcffffcbfbbfffffcb7cfc667d77cccbccfffffffffffcfcfcbbeecc8c668fffffc77cc8fffffcfccc8cffff6ff6ffffffcfcffffbc8666fccccccccccccffcccfccfccc6fcddbfccc6fc666fc
cffcc8cf8f7cfbfcff77cfc67fccccf67d7ccf6cc77cfcccdbffffffccccbff7776ccffcbcbbddbc7cfc88ffffcdbcccc7cfcccbdcfffffffffccbdbccccb97666666cc66cccccfcd7ccfffffffcbcf8ffcffffffcbbcffcbdccffff77cff77c7bbcf88fffffffffffffcb7c868ccfcccffcfcc7cfffffc6ccfcccffcc7cffffffffcc6ffffffc7ddc66ff77fccccccccfcccfffcc666cc77767f666fc6c8cb
ccfccccfcfccfcc6c7cfcc66fccccf6cfc7d7bcfc6ccccfff7dbcfcfccfccff66fcbcfffccccbcccfffff86cfbdbcbbccbbbccccccdbcfffffffffc7dbec766797fccc7ccf7cfcd76ffffffffcbbccffffffccccbb7ffcbbcfffffbffcbcfffbccffff8fffffffffffcbcc88666cffc66ffc76c8ffffc76ccfcbcfc7cf6fffffffc6cffffffffc777bd768fffbd77cfcccffc6cccff6677ccc86f666f8ccbb6
cc8c7fc6cccccc7ccfbc66cfccfccb7cfff77b77ccfc6c7ffcc7ddcfc7fccff88fffcfbbffffcfcfccbbefcccccddbcffffcbbbcbcfcdbcffffffffcccbbee66cccfc76c66fcd7cf8ffffffcdbcffffcbcccccff7cffdbcfccfffb77bfbdffffffffffffffffffffcbcf66fc6cccffcffc7688ffffccccfffc977cc6ffcffbdbcbccccccccffff6777776cfb7776767cfc7cfc6fcc7ff8666f86f6ccfcdb668
c7c6cc6ff66ccccfff67cfccffcdddcfc7fc66bd7d7ffc777c77777ffcff8fffffffcfccffffffcfffbbbfccffffcbdbcffffcbdcbbcccbdbfffffffffccbdcfcffc7cccccb7cffffffffcdbcffffbddbb1dbeffcfffbcfcbbffffc7cf7fffffffffffffffffffc7fc8f666cfccfcffc7c8ffffc66ffffbdbe777cfffffddcccdd1dffffffccfffc6666cdddbf6677676cccf7ffcf7f6ddc6fccfcfcd766ccf
c6ccffcbefcf6cff767ffc6fcffbbbcc6ff66cc77777dffc7776cfffc6ffcfffffffcffffcbfffcfff8ff88cffffffcbdbcffffccbbccdcfbdbffffffff886bdbfc7fcfbdccffffffffcdcfffffddddbcc7d11dccfffcfefccfbdfffffbd7fffffffffffffff7bc8c866fcfcffccfc768f8fff66fffffc777c776fffcddccffccdbb7cccdeffcfffff6cc7777ddcf6767decf6f76f6f7777ffc8fbd6666ff67
ccccbefc6ffcccc7fccccffccc8666ccfc66ffc7777777bcc7ffffffcccffccffcfcffffffccfcfccf88fffccfcfffccccddcfffffcdccccbfc1cffffffff8fccdbcccdcc8ffccfffcd7fffffdddbcccffcccdd1dcffcfffffffbdcffffcdbfffffffffffcdcfff896cff88ffff77c8ffffc66ffffcdcf777c666fcdbccffffffcccbd1becfffcfffcccf666777ddbc666fcfcf7686f6766fccbd7666cfc67c
fbccc6cf7cc7cffccfcbfc77cfff8cccccc77cffc777777bcffffccfcfccccfcbbcfcfffffccffcfff8fccccff8fffccfffcddcfffcfcbcccdbcffffffffffff866cccc8fffd7bbddccfffcddddcccffffffccebdd1bcfffffbbeebeffffccfffffffffcbcff666fffcff8ffc6688ffffc66fffffcb77f776ccccdbccfffffffffcffcccfffcffccf77cfff667777bdbcffcf8f7786f666fcdd666cffc77fff
fcfcfcfbfcfc7ccff6ccccccccccffccffcffcccccc6766ffcffffffcffcfcbcccbbcfcccfddbffccfcf77dcffffffccfbdcfcbdbcffffbdbcffffffffffffffffc88cffffcfc7dccfffbdddd7ccfffccc86cfcccbd11dcffffccfcfffff88fffffffcbcfcccccfffccfcc666ccffffcccffff7bc6777f66fcbdbccfffffccccfffffcffffcfcc6cf67cfccff66677777fffff67786f68cbd668fff6c7cfc7c
fcfccbfbc666c7cccfffcccfcccfccfcfccf6fcbb7cccff8ccffffffcffcbbcbcccfcbccffccff88fcffc6ffffffffccfbccfccfcbbcbdbcfcccff8fffffffffffffffffffcfffffffbdddddddbff66766776ffbddd1111dcfffffcfffff8ffffffb7ef66f6cfccffffcc66cfffffc6cfffffc7776766fccdbcccfffffcbd1dccffffffffffcf8cff68fcf6cfffc667886bb77f76f8fcdb66fccfcbcfc67ff8
fcf88cf6cffcccc7c6ccffbbfccccfcc7ccfcdbc66cffff8ffffffffcccfcccccdcbcfcbbfffffccfccfc8fffffffffcfcccfcb77cccbcffbbcddbfcffffffffffffffffffcfffffffcddd7fcbddbc67777cfbdd7ccbddbeefffcfcfffff8ffffc7cffc666fffcfff666ccffffcc6cfffffbcc777666ffccccfffffffcf7ccffffffffffc6fccfc6ff8f6fcffffcf8ff7dd7b776cfbd766f8c7fc6cbdccc676
cfb6fcf6ffcfcccf7cfffc6cc6ffffccfccdbc6fcff8ccfffffffffffffffcffcbcfc6ccbcfffffcffcff8fffffffffcfccffff7cffccfbdcccfccdbcfcffffffffffffffffffffffc8fcbcf8cccd1bccccddd7ffffcdcf66ccfffcfffff8fffffcf66cfcc8ffffcc6c8ffffc66cfffffcf7c6766cfffffccffffffce7fcfcffffcfff6fff68cfcccc67ffffc7ccffff7777766fbd766f77ffcccb7ccfccccf
c6fcfbfc6cd7ffc6cfcdcf6cffccffcf7d76cfcfff888fffcbcffffccbdefcffffcbccbbcfffffccffc8ffffccff8fffffcffcfccffccfbcdbcdcbfcbbcf8cfffffffffffffffcddbdcc87c8cdc8f7d1ddddcffcc7f67effcddcbffffffffff88ff66cff8cccc66688ffcfc76fffffffccfccf6cffb1cf8cfffffc7dccffffffffbddefccfffccfffff8ffc7688fffff6676ccbdcccfff66cdc8ffccffcffff
ecc6fccfc6cfccccc66fccffc7cccfbd76ffffff88ffffff7fcbfffcc7beffffcfffbbec8ffcccfc76ffccfcfc6fcc8ffffffffccffccfbfccbbbccccfbdcffcfffffffffffcbddccccff768fc7c7cccddcffcecc7f67ef77cfdd1dcfcccffc8cffffffffffc7688ffcfc66ffffffffc6fffcffccff8cffcffccccffffffffffbcccfffcccff7ccfffff776fffffc7cffccfbdc66fccbcfc6cffcfccffcffff
bdcfcccc7cffccc7ccfccf67ccccbd766c8fff8fffffffffff767bcfffc7bcfffccfccfffffccdbbcfc6cfccfc6cfff88ffffffccfffcfbff88fbcbbcccfbdbccccffffffcdddccccffff768fccc77eedbfc77c777f67effff6cdddddcfcf8ffffffff8fc66cffffffc66cfffc7cffffffffcfbbcffffffffcfcfffffffffcbd7ccffffccfcffccffc76cfffffdff8fccfbdc6cffffc666cffccffcfffff765
667dbccccfcc6c6cccccfc7ffcdd766ff8fffcfffffffffff8fccc7d7cffccbcffffccfffcd7cfc7bbccfccccccbd7cccfffffffcfffcfbfffff8ccbbcbcbfbdbccffffffbdefccffffff768f77c77c7ddebc77777f67effff6c6ccbbdffcfccfffffcf66cfffffcc6cffffcccffffffcfcdbffcffffcfe7eefbbbfffcfff7cccfffffffffcccfcc77cfffffffcffffcdbccfccccfccfcccccffc6fffffffcf
f8f7cbbcccccccfccccccfc7d776cfffff88fffffffffffffccc7d777cbcffcc7cffffffb7cfcccc7cbcfc6cc7dcfcc777cfffffffffffbfcffff888cbbbebccb7fcfcfcfccffffffffff7c8f77c77c7ddebecc7c7f67fffffffccfcccccfccccfcffcf8fffffcc6ffffccccfffbffcccfcccffffccfffc7eff7ccfff88cfffcffffcffccccfcc768fffffff8fcffbdbccffc66bcccfffff66bffcfcffcfc76
ffffcc6dbcccff86fc7cfbd766cfff88cffffffffffffffffc77777777ccbfffccfcffffb7bedddccbbfccfcccfcb777cc77cccfffffffcfcffffff88ccbbbbcccfccfccfccffffffffff7cff77c77c7ddfbecc7c7f67cfffffffffcddbdbffff7ffcffffffcccffffccccfffffccccffffffffbbccfcffffffc8ffffffffffffffffccccfc776fffffffccffffbdbcfffc6cffccc7cff7befcbbbbffc77cfc
cffffccccbbccc6c7cfbd766ffffff88ffffffffcbdddcfffc777777cccc6ffffcfcbddfccbdbbbdcfcfcfccccfcc7cc777cf77cffffffcfcffbbffffffcfcffccfcfccfffffffccc7fff7f8fe7c7be7dde7e7ccc7f67fffc77ccffc7ccffffcd7fffcfffc6cfffff7c8fffcccccfffcccfffd7ccfbddddcffff8fff8c8ffcfffffccccfc76cfffffff66ffccfbdcfffc67ccccfcffc7cfccdbcffcbbffcccc
fffff88f88c7dcccfbd766fffffcccffffffffcdd7b7bddefffcc7cfffc88fffbdcfcccfcfcfcb7fffffccffffffffc77ccc7cfccfffcfcffffbbffffffffcfffcffccccffcfcbc7eeccf7ccfe7c7be7ddebe7ccc7ff7fcb77ccdbffcffffcdd6fcffccccffcffcd7cfffccccfffcccccffcccfcbddddd7cffff8fff8fffcfcdcccccfcc6c8ffffffbbeeccccfcc77cccfcfcc7cf6ccccbddeffc6cccbdffcc
ffffffffff8ffcddd7c8fffff888ffffffffcdbdddddddbddcfffffcccbffcffffcffcffcfcffccfffffcfccccfffffcff77cfbccf87cffffffccffffffff8fffffffcffcbcfbdcff4ef66fffc7c77c7ddcbe7cc76fbd766cffc7ddfffffdcfcffffc8cccd1cdb7ccfccccfffcdcccfcffcccffc7ddbcccfffff8fccfccfcbccfcffc7c8fffffffbccccfccc6fcfff77cfc7cffc7ccfb1b6ffc76ccccfcbbcc
ffffccffff88888ff88fffffcffffffffffc7cc7ddddddbccbcffffff8ccffffffcffcffcfcffcfffffffcdcfbdcffffffcfffff6ffccffffffccffffffff8fffff8fcfcccc7cc77ee6667dbfc7ee7c7dd6bcccbff6766767deccccccfffccffffccfffccb11ccfffc7cfffcd7c666cfccccfffffccfcffcffcc8ffccfcbccffffb7ccffffffcfcbc7ffccfccfffffff77cc6c6fcfdd7cffcc6cccbdbccfcbd
ffffffffcffff88fffffffcfcffffccffffcfcbccbdddccbcffcdbcffffcffffffcfffffcffffcfffffcdcccccfcbbffff8ffffffcfffffcfffccfffffffffffbb7fcffcccc7cfc66fffcc9cc7ef7cc7dd67ec7fe76fc7cffc77fcc766ffffffcbccffffbeecfffffffffbd7cc86cfffccfcffffffffffffffcffccfcbccfffffff8fffffcfbbc768ffffbbffffffffff677c6ccdd777777ccccb1ddddfccfc
cffffcfffccff88fffcccfcfcffffffffffffcfcbccccbfffffc7cffffbbcfffffffffffffcbbdbbccbcccccbeccccbcffffffff67cfcccfffffffffffffffc7ccfffcb7ee7cfc7cccbffcc776cf7c77dd6bec7f7e7beffbccf6c677ff777ffffccbccfffc6cfffffffbdbc6c68fffffccffffccffffffffff6ccfebcffccffffffffffcccbfccccffffcccccffffffcfffcccb7777776ccccd1ddd7777cfff
cf8fffffffccc88ff8ffcfcfffffffffccffcffffcccccfffffccffffcb77ffffffcfcffcbb677777beccbcccbbcfffcffffffcfffcbcc6cccffffffffccc7ccfcc77ccfc7cc7cccbcce7b7cc6cf7c77dd6bef7f7eec7b7fcbc7fc7c7b66c7eeffff77ccffffffffcfbecfcfcfffffffcfbdbffffffffffffffcb7cffc668ffccfffffcb7cc6fffcffffcccbcbccfffffcffccc77776cfcbddddd7677cf66fc
bbcfc8fffffff888ffffffffffffffccfbcfcccffc8fccfffffffffffccfcfffffcccfcbc67777766c7dbfcdbbcffffff8cfffccbffccbccccf77cffbd1dccffc77ccfcc777fcbbcfb7c7c6686cfbcc7dd6bec7ecc7cccc77ccc77ff6ccffc777eeeeedddcfffcffcfecfffccbffffffbbccfcbcfffffffffcbccff696cffcccccccfcccc77cfffcffcbcbcfccdcfffffffccfff6cffcbddddd767c6fffcccc
66cdbcccffffff88fffffffff88fccfbd7fff8fccffffcffcbbffffffcfffffccccfbd767766666677667dbcccffffffcfc6cfbdccfffccbbcdcffcdddd7ffcbecccf67d6fcccccc7bee66666fc76b77dd6b7c7fccc77ccbecdcfbdffc77cffbec766f7ddddeffcccfebffffffffffcbcffcdbfffffffffebcffc696cffcc6cccfffcccfccfffffcfffcc7ffccfcffffffffffffffff7cfbdc777cfffffccfc
c68ccdbcfcffffffffffffff8fccfddcffffccffff8ffffffccffffffcffffccfcbd777766666fc6c67776cdbfffffccf66fdb66cffcfffc8cffbcc7ccccfc76cdd677cccdcfcbfc766667bfeb7fcc77dd6be7777efcc7bec7f7ccccbcfcc7bceccccf6ffdbbdccccfffbcffffffcbeffbdcfffffffffbbcff89668ffcccfccfffcf6ccfccffffccfbcffcffcffffffffffffffcffff7cf7cc77cffffc7fc7c
66866ccbdbfffffffffffccccfcdbefccfff8cffc8ff88fffccffffffcffcffcdd7677666cc7b77db66667776bdcfc66cbdbfccfc6cfcffffcdc7fcffcf7bcfff777cfcdcfcdcffc7c677cc77ccfbc77ddcbeccfcfbcfcc77effcccbfcbcff677efcccc7ffffc7cbcffffcdcffcbcffdbcffffffffcbbcffc966fff76fccfffbec7cfccfcfffcfccbefffcff8fffff666666ffffffff67d7cc76fffcccf8cc7
666c66cfcbdcfcffffccff7ccdbcccfccccfccff88fff8fff88ffffffffffcd776676666c7d7c7ccddec66677767dbccccc6cff6cccfccfcddbccfccd7fcff677cfcc7df7ccffc6cf6f67fceb6cccf77ddcbcc7fccfc7defccc7cffbcfc7b7fc677eccc8c77ffccc7dbfffccbbcfcdbcffffffffcb7fff696cfff7cfc6fff77cf7cfcccfffffffbc8bcbfcffffffc666ff666f6fffff8666cc67bccc6bcfff6
6d6c866cbcbdbfcfcfccfcfddccccfccccfcfffffcbcffc77cffffffffffd767777666fbd77d7ccd7ddbc66667776bdbf6fffeefc6cccbddbccffbeef7fc777ffccccedeefcb6666fcb7cfccbccccc77ddceec7fc7fbccc7cfc666cfc7bc77feecfc77cfdefcbefcb7dddcffccbbbcffffffffcbcffc696cffc6cfcfffcc7c6ccff66fcfffffffccccfcfcfff66c666f6666666ffffffffccc6fc7bbeec7cff
6f6c666cd766cfccc6cffcfcc7dbcccccccff6ffff76ffcffffffccfffffcbb66777668c77ddddddbd7cc666666cbbccfcfcfffccccbdd77f7cfcd77f7fcbff7ccccccdc7cc666cc7bccbcc7bccccfc7ddcbcc7fc7fbfccfcc7ff667cfbcb7fc6ffbe6cfdecc7fcf7fd7b1dcffffffffffffbbcff66668ffc66f6fffccc66cccfccf6cffffffffcfccfcfcff6666fff666666fffffffffffffcfff667bcfc6c
f6c666bb68fffffccfccfcffffccbdcc7cfc7cccffcfff8ffffcbcccffffffcbbc66668f8677ddd776c8f67766bbccf8fccffc6ccbddd777f77f7d77f7fcbc7cc7cfccbeccccfcb7cf7cc7cebcccbf77ddcbcc7fccfbcccbcccb7eccccfcbbfc6c7fc6cfdecc7fcf7cdeed11dcffffffffbbcff6666fffccccccff7cc66ccffcccccfcfccfffcccfccfffffcf66ff6666fff6666ffff8fedbfffffff667dcfc
f6fcdb68ffffffffccffccffffffcc7dcc6cccccc8ffffffcbdccffcbffffffccbbcc776cf866766cff6776cb7c8fffffffccccd11ddd777f77f7d77f7fcbfccbbffcd7ccdccdcccb7c7ccbcbcccbf77ddcbcc7fc7cbcbcccbbfc7bccbcc77ffcbcbcccfdecc7fcf7fde7dd111dcfffcbbffc666cfffccfc7cfccccfcccfffcccccc7ffffccfff8f8cfffff66fff67666fcf66666fffffccfbcfffffffc67dc
dcd766ffffbcfccffffcffffffffffccbdbcccfccccf8ffbdccff6966cffffff8fccdcc776cf868fc6766cb7ccfffffffcccfcdbbbdddcc7bc7fcdc7f7fc7ccffcbbffcddcc7fcdcccfcd7cc76ccbf77ddcbcb7fcf7dee7cccc7ccc7db77ccbb7ff676ffdecc7fcf7edfcbbbbbbddebcfff696cfffc7ffffcc7cfccccffccccfffffccccfffcff8f8fffc67766fff66f6666ffffffff8fcfcebfffffff8f667
c76ffff68fffcffccf77dbffffffffffcc7dbcb6cc6ffbdcfffb99686cfffffffffffcdbf677cf6776c77cfffffffffffcfbddfb7ccfc77ffddccdccf7c77ccccc7cddff6ccbc6fffbdef7bec6ccbf67ddcbcc7f67cc77cc7bf6fc7cc6ccbdccb77efe776ccc7fcfdbf77ccff6cfb1dff6968ffff7ffcc8ffffc7ccfffcfccfccfcfffcc7cffff8cfff66f6666f6766f66666fffffff8fcffceffffffffffcc
fcffb6cffccffffccccccffffffffffffffccddccffbbcffcc6688688cfffffffffffcfcd766777667d7ffffffffffffccdbcc7ccfc76ff7ecbccdccfdfccbbfccccccddccc86cf7bee76fcc66fccdcbddfbcbe7cc67cfcbcccbfcc8cbd7ccf96ff77eec6ccc7fcf7e7fcc777ffccc7ddbfffffcfcfd76fcfcfff7cfccffdeeeccfcc88fccffff66ffff66fff6f66fff666f6fffffffffcfffcffffffffffff
fcfccffccf6f7776ffffffffffffffffffff8ccddddcfff666688888ffbbcffffffffffffc7b66c7bc8fffffffffffcbdbeddcfc7bc6fc7cbc7ccdccfdff7befccc66ccdbdcfc77ccc6cccccc7bccfc7ddfbccbebccc66cfc7cfc7cbdb666666cbccfdcc67cc7fcf7eeccccfc77cc7deebdbccccfcfc6fbccccfccffccccfccccccfccc7f666f67676cfffffffccfffffffffff77bffc8ffffcffffffffffff
fffc6cffffc676667cfffffffffffffffffffffccbdcff86668888fcbbcccdcfffffffffffff777cffffffffffffcbdbcbdefcbccff86ffcde7ccdccfdff7bcccccccc6dbbdccccccf66ffcc77ccbcc7ddfcbcccccbcffc67ccccbbbdd696cfccfcc7bfc77f77fcf7c7cfccfccf77cceb7cbdbffcff6fffc777fffffccf7ccfccccc66cff6676f676f66ffffcd11dbfffffffffcccfc7cffffff8fcfffffffc
fffff66776fff6666ffffff6fcccfffffffffffffcccdbcf868ffcbcffbbcfcbbcffffffffffffffffffffffffbdbecd7cf77cfc66b66cbfde7ccdccfdcbcbfdffdcf76dbbdcccffccccc7cccccccff7bdc7fbcfc7ccbccfc76f8cbcdd6666fdbfbfcc7c67f77f7f7c7cbfcbd6ccfc7cccbbe7dbcfffcffcf6ffffccccfc7cccfcccf6f6666f6666fffffcbdddddbbcfffffffffffffc77cfcfccc8f8fffffb
ffffff6666ffcfff67666ccfc6cff8fffffffffffffcccbdcffcdcfcbbccbbcfcbbcfffffffff8ffffffffffbdbcccccc777cfc891196cbfdc7bcdeee77fccb7ffcc7c6dbbdccc6cccd166cccccccb7fbbfcbccbccbccb1dcfc6cbbcdd6666f7cfbcbeeccbec7ecf7c7cbc6999b6ccfcbbccccf7ddcffffcffffc6666cffcffcc7ff66f6676ff6f6fffcd1ddddb7cfcffcffcc8fffffffcc7cfccccccfccfcc
cff666cff6ffffff66666fc6cfc66ffcfffffffffffffcccbdbcfcbeccbbcccbbfcbdbfffffff8fffffffcbdbeccfcb7fc7c776866666cbfc7ccbcccbccccecdfcbefecdbbbcccc776c66ffc66cbcfb7cc77fccfccfccc66c7cf67bcdd6d66c77f7fcbeb7c77c7cfccccb666d9666c66ffcdbcffccddcfffffff666668ff6fcfccfcf6f66f6c8ffffffedddd7ccfcffffc7cffccffffffffcccfccfccccc6cf
6fc6766ffffffcffffffffffcccfccccfccfffffffffffffcccddcfcbcffbdfccdcffbdbfffffffffffcdd7c7ffcbcfcdbccc6666cc86cbdcfc7fc7bfc7ccfcdfc76cffcdbddefec8866cc7cfccccbcccccccb7cccc7cffc7cccccddbd676c6f7fc77fc7dcf7c77fcccb77ff66fc777cbbbcfc7bdcfcddcffff66fffffffcfffcfcff8f6f68fffffffffc7bbcffffcfffffc77cfccccfccffccfcccfc6bcfff
6f6666f66cf67776ffffccfcccccccccccffffffffffffffffcccddcfcbccffdcfccbbfcdbcffffffcdbcccccd7ffc77fc7befcfdee76cfc7dbffbcc76cc7dc7fcd7c766cbbebdcffc6ccffccfcbcccffff6cccccfccfc6fc6ffddbcb66b68c77fc7c7ccfcc7cfcccd7ccccccc7ffcbc7cfccc6cde7cfc7ddfffffffffffc66c67676ffffffffffffffffcfccffcffccfffffc7bffcc7fffccffcfcb6cffffb
ff66667666fff66cffffccffc7cfcfcbccccf8fffffffffffffffccbdcffbbccccbccbcfbdbffffbdbcd9cf7c7ffc7cc77cc7ccbbccc66fffbddff76fff77f77ccc7bcc666fcdccdbeec6bcf7cfc77cfbdf67bcfbbcccc7cfcdbc766666fcb7cfb7eeccbe8fbcfb1bc8ccc67ff7cbccccc7ccccfcccf6bbccddcfffff6ff6cc6666666ffffffcc8f7cfffcfffffffcc67cffffff67cffcccfffccbccfffcbde
ff6ff66666fffffff8cfcccccccccccccecfcccffffffffffffffffccbdbfcccccccccbdccfffbdbfc9119ccf7c7eeeccccccc7cbbcfc77cfc77cc7cf6b7c7cc77ccfccbcc66ccb7cbdecccccc7777cfff8677defccccfcedbcccc666c7bcfc7bccfcddbccf77c7cc77cc7cfcdb7bcccbcccccbcccffd11dcfcbdcfcccfcfff8666fffffffccfcccfffffcfffffbbffc86ccfffffffc7cffcccc66cffcbdef6
fffff6666f8ffffffcfcccccfccecbccbecbcfcccfffffffffffffffffccdbcccbccbdccffcddbcfffc67cccc7ccc777ccc77cc7cc7dccc7ccb7ee7c7ccc6bcc7ccbcffcc77cc66c7cbbbcccc7c777cfccc7777667cffbbbc6ccc6cccbcbfc7ccfcb7cccbcf7cc77c7cccccb7ec7fcd7cccc7cff7c7666666cfcc7dccfcc7cffffffffffcfccccffccfffdbcfffecffff8fc7777fffffcccfc76cffcb7cf66f
ccfffffff8ffffffcfccfccfcbcccbc7cbeeebcfcccfffffffffffffffffccbbccbdcfffbdbbcc7bcfc67776bbccc7cf777cfc7cc77c7bcfccb7ec7fccccf66bb6cbcfcbcffcc86ccfc7cfccccc7776fcc8c77776ffcfbcbcccccc7eecbfff7ffcbc7fff7cf77c7becccbbcf7ccc7cff777cb6c667fcc66cfc77767cddcfcccfffffffcccccccbccffccfcfcbcffcfffffff88cfffccffffb6cffbbbcfc7fcd
f6ccfffffffccccccfcfbebbcccdcc7bebcbccbccfccfffffffffffffffffffcb7ccffbdb7ffcbe777bffcfdcbc6ffc7ccc7befc7cfcbccb7cb77cc77efc7cc666dbefccfcdc66c7bfcbccfc76c666ffffff676ff7cccbcbebcc7ccbbfcbcf7bbcc7fccccbbccbc7cc77ccbccc68fccb7cc76fccfcd766fc776f77ccfcddbfcccfffcfcccfffccfcbddbffcfffffcffffffffffffff6ccffcffbdcfcfcccdd7
ccf8cccffffc77fccccfcbcccbcfbbeeeebcfbbbffcfccfcfccffffffffffffccfffbddc777ccc7c77777fcf6cbdcc7fff7cc77cff77cc7bbcbccbbef7bcfcccbbccbcfbbc66fcbe7bcbcfc767cdc6fcddbffcdc7f77fbb7cc7dcf7cfcbff7fcddcfbffd7cc77eebcc77cccd7fcbeedfcbecccdcdd66fc776c776fcdbccccdbfcccccccffccffff677768fffffffffcccfcffffcccfffcfcddbcf6fcccddccf
7cfcccff6fcc767fcfcfccccbccbcf7beffbbfcccfccffcc6cffffffffffffffffbdc7cc77f67def767debcfccc7cc7f77efcfbd7bccccc77cbfcff7dcfcdbcdbfcffbec6fbb7cccfc77ffcc6cfcfcddddddbfffcccfb7b7cfccdcbcfcc7bfc7cfdcfcbffd7fcffdcc67fc7fbdfc7cfc7ccfcccbef6c77fc77f77d7f6767c7cdbcc7cffcb6fffff8f66ffffffccffcccc6ccccfcccbbffffccbdcfccddbcfff
fc6cff6ffccfffcfcccffcfccccccccccbccccfccfffccffc7fffffffffffffcbdcf6777ccb76777cc777c7dfcc6f676cfc7cccfccfcccc77fcc6f6cfcbbcccd7ccbccffcbeedbff7cfc7cc66ffbddddb7ddbdbfcfccf7cfc7ccccccbccfc7dfcbbfdfbbccccc7cffc67fc7ffc76cccc7ccd7fc77c777777fc7b76677ccc76cfedbcfcb6fffffcffff8fffcfffc7cfccffccffb9cffcbccffffcbd1bccfffff
ccff6cfccffccfcfffcffffffccccccbccccccffcffffcccfffccffffffffc1d7ffc7cc67ccc7666776ccdedfcc6cc77c7cc7cc77cccccc77c77c6cc66fcbccc77c7fcd7cbb7cc76ffcfcccfcbdbddbdd1dbddbddcff7cf77cc7cbccc7ebcfc7dbbccbfecc7cfcc7cc67fc7fbcfcbeef7ddef77ccc7677c66766c77fc77ccccfff7ddcfffff6cffcffffccffcccfffcfccfcdbe866fffcdcfffffccffffffff
efcfcf7efccfcffccccfffffffccfcccfcfffffffffcc6fffccfcccccfcbddcc67ccc7cc66777cccfcccf7edccc7c77ccccfc77cff66ccc77c7677c7ccdccc7cb7c7fbccbee7ccccc666cfcbdbdddbdddddddbbddddccc6ccbcfccfcbcfcbef7bccccbefccfc77ebec67fc7ccf7bfcbe7cc677fc7cbc7fcdcfcc7cc776c77cffc7cc7ddcfc6ffccfccfffcccfffcc6ccfcbccfc667d6cfcfffffffffffcccbf
bbcff6ccf7cffcff6cc6cffffffffccccfffbbfffccfffbb6ffcccffcbddee6fffc67cfccccfc7c66ccc6d7ccccccc6677c67ccc67ccccc7cff6667c67c6cc7cb7c7fbbcc6cccccccfcccbdddd7bd1ddddbdd1d7dd1ddbf8cccccccccc7c7cfcdbcdcbc7cc7cc7cffcc7fc7ccccc76fc6c77cf7ccfc7cbcccbcf7776c777fc7ccffffcbddbcccf7deefccccffc6ccfcbbc886bf61966cffffffffffffcccfcf
fcbbcfcbffffcfcfcfcfc6ffffffffffffcbcfffcfffdbccffcffcfb11dddfccdfffc67ccf7bcfc77cccfcccdbfcbcc6666f6fdbccc7db7766fffc677776cc7cb7c7fbbcc7c6ccbffcccddffddddb7dddd1dbbbdddffddbbc8fcccfc7ccbbffcdbcbcbef677cfffcf77777f77fcbfcfc766c6bcf7def7ecbcc77cfbc6c6c76ccfdbfcbddd1dfcff6cfccffcccf6ffbbcccf666d966fffffffcb6fccffffffff
cccfddcfc7f6cfcccffccff6cfffffffffc7ffffffff6ccfbffccffcbbffddeeefbcffcc6bccbbcfcbc7bbfcccbcfcbcf8ffcf7ccbbec6fffccbcff8fcfcccccb7c7fbb7fc7cccbe7ffccddddddcbdcbddd7dd7ddddddccccbcdfcbccccb7cfcdbcccbfc6ccfcccbecbccc76677fccf66fbbff77ff7cfb7e7ccfcbecbcc6666dcccfbdfccbccfffccfffcfffcccfcbd6cc6c8c688ffffffcb6c8fcbcfffffcf
ffddbcfcffccffcfc7cff77ff6ccfffffffcffc6fccfcfffcc7cccfcfc7bbebcffffbddf6cf7bcccbfc76cc6cc6f7ecbbccbff7e76ccccd6bccddccfc7ccccccbcc7fbbccbee6cbc6ffffcfbdddddddb777dddddbdbbfffff6cde6ccbdeb7cfcdbbbcbf7cff76dd1cccc66cccc6b6ddcddefbdfccccb7c77ffcb6fbccdc61c86cfbdccbbbcffcffffffccfc7ffcfffcb968ccfffcb66cffccfffffffffffffc
bdccffffccffc7cfff67cffcfcffccfffcfffffffccfcfff7feffffcffffffcbdccc6767f67ccb7ccccfc77efccbf7dffc7c7c77e67cfc666bff67f67cbcc7ccbcc7fbbbccccffbcccffffcffbddb7ddd7ddbbbdbcfffffffccdc8fffcc77ffcdbbbcbf76cff7bfcc66666ffcccfccdcfccfc7ccc7fcd6fcdcc76cc77c6766ffcd7ffffffffffffffffcc7cff7ccffff869688cbd6ffc1befffffffffccfc1d
bcffffffffccffcccffcf7cffccccfc7cfffffffcccfffffcfffccffffffffffcbbcfc677cfc6cccbccccfcc7bcc777eccccc7ccbbcfff88c6f7cf67cbccc7ccbcc7fbcbcfc6dcbcc6ffffffffcbddb7ddb7dd7cfffffffffbcdcccccbeebffcdbbbcbf777ccfcbf66666f8fcbbccfc77fcd7cc7fc7cccccfcbec7fccccccccd7fffffffffffcccccffccfbdbffc7cffffc69d96fffff888ffffffffffbbccf
fffffffdbbffcccfcccffffc7cffff7ffffccffccccffcfccfccfffcfffffffcfcc7dccf676fccc7c67cfccfffcbccc7bec6ccccccbbccfcbc6667cc7ffccbccbcf7fcc77bbcffbbcfbccffffffcccbddbdbccfffffffff66ccdfccccccfc6fcdbbbcbccc6677f66fcbeffcbcc7cc7cccdbf77cc6cff7cfccccbcccccfcfcd7fffccffffffcbff776fffcccccffffc7cfffffffffbb6ff8fffffccfcbdbcbcc
fffffffbfcffffc7cff6ccffcc66cfcffcccfccfccccbcffccfccffccfcfffffccffc7dbff676ffccccc7cf7cffccbbeee77cc7bcccc7bcfc77cccc7ccfcc7cbbcb7ee6ccfccbbfcbfccccccffffffccbbccfffffffffc67cbbccbcccc77ccbbbbbbcbfc6cccc6fcb7fcb7ccccc7cfcbcffccc6ffcbffccce76cfcccfcbbccfffcfffffcbcff7cfccffc6fccfffbcffccccffffc6cfffffffcccccdbeecccbb
ccfffffcfffccfffc7ccccccffff7ccccfffffc7cfccfcccfc7cfffcffffffffffcccfccbbcfcffffcbcfccc7bcf8fc7bbfc77ffcbcccc7b7ee77ffccccccdbcc7cc777fc777cf7cbfcfcfffccffffffcccfffffffcc6cf6fdcbcf677cfc7b7fcccbbbeeffccfbbefcb7fccfc7cc7beee7d7cffcbcc6fcebcff8fffcbbcffffc688fffffc7bcffffff6ffccffffcfcffffcbbf66cfffffffcfcfdbec7fffbbc
fffffffffff88cffffc77ffccfffbcf6cfcfcccccccccffccffc6ffcffffffffffffccfffcbdcfffcc667776fc67cffc667fcce7efccbefcc7bf7ccffccdbc7bcccc7ccb7ec67cbc7f7dccfcccccffffffffffffcccccfcbcdcbf67cc777cfc7ccb7bbdcfcffccfcdcfc7ccbccbbee6cdbcfc777fc6cd7c67cfffcdbcfffc6ffff666ff8ffccbcfff6fc6fcffffcf7fccfc7cffffffffc6ffbcfc77ef7dcffc
fffffcfffffccc7cfffffcccfccfbcffffcfcf7fc7cffc7cfccfccfffffffffffffffffccffcbdcfc677c7f676cc77cfcfcfc7cccbccccbbfccff8cfbdbcbbccccbefccc77d77cdc7ccfc77cccfccfffffffffc67fccbcc7cdcbf77d77cccccccfc7b7ccdbfcfdcccfdcc7fcbcc6fc6c8fc777ff7c6cccc766fbdccffff8ff8ffff869666668ccdbffcffccfffffc6ffcbccfffffcfc6fffbdeffcfcbcccbcc
ffcccffccfffffccccff77fcccfff7efffcfc6cff7ccfffc7cc6cfcccfffffffffffffffcccfcc71cff6cbcc77776f766ddfff86cccbbeccb7ccffddcc7bf6cff6cc7cffc7776cdc7fcccccff677fccfffff6c7cf66fdc7ff7cbf7eebfc7cc7ef6cf776bbcddcffcc7cbfddcf7cf66fc7666fc7bfdffdff8fbdbefffcbcfffffffff8869969968fcbbcccffffcf6ff77c8fffffffc6cfccccffffcffccddccf
ffcccccebdccfffcbdcfccfcccccfffbeffccffff6fccfffffcffc7fffffcfffffffffffccbdecfc7ddcfc7676ff7c877f67cfccfc7ccbcff7ccddcc7bf66fccfefccf7bffe76cdccbefcccf76fcbbc66c666c77cc6fdfebbefbf7cccfccffc7fccfcfc76dccbdcccbffdefc6fccfcccc76fc7ff7776c8c7bcc8cbdecffffffffffffff869d66668ccbdefc766cfc7ccffffffc6cff7cffcc6fcffffcffccdd
ffffcdddccdbcffcc7cffff8cccfccfff77cfccccffffccffff7cfffc7cfffffffffffffcbbccbbffccddcf677776c6fc66c7cccff7ffbfffcbbc7bbe66fcccecccc7ecc7cc76cde78c7ccc8ccdbccc7cfc7cccdb7cfde76fccbf7ee7cccccccebeeeeffc7ccbcbd7fffdfc7fffbbcc77fc7667777cfcbbcccccfccbbcfffffffffffffffc69966968fccbcfcfffcfffffccfcccccfffc7efcccffffcffff7c
cccfc77bbbcbfffccfff7bffcc66ccccfffc7cffcccffffccccffc77cfffccffffffffffcccfcccbbccfcbbef6667cfbdbccc67ccf7ffbfcdbcb7c66ffccccbcfcc7cfeefc77ccdc76cfcfc7dcccbb7cc6cc77bccbdeee76c7c7f7eedee7fc7cccc7bcfccff6ccbcbdcfdffbfbcf677fcdcff76c8fcb7cfcccc7dccf88fffffffffffffffff86699666cffcffc6fcfffccccfcbddddbfffc7cfcc6cfffcffff
ffcffffcbdccf6cccfffcccfcffcccccccfffc7ccffccccccffcbcfffcc6cffc6cffffffcccfcfccffbccfc7bccc677fcccccfc6fc7ccbffed7c7fcccccb7cc7cccfc7cccfb76cbc7cccc7bcfcd7cc77ff67cfc777cc7cfc6fc7f7eedcff77fc7ccccebccc6cccc7bbfcdfb7fcbfc66ccccf767ccd7cffffbbccff8ffcfffffffccfffcffffff8c699668ffffcfccfcccfffbdddddccfffccf7ccffccffffcf
7ccfffffccffffffffffccffcbbcfccccf6cfffcfddccccffbbcfffcb6cffc6cfffccfffcccfcffff6cfffcfccbbfc66666cfbffc7e7777ccccff8ffcbcccccfcccccccf7f776cbccfcd7cf7bcc8fccf6cffcdccfcdbecbcffc7f7eed77ff7cccfccccccbbccccfcc77777c67ccfcf666fc7c6fc7c8fffffccfffffff8fffcc6cffccffffcfffff8668ffffffccfcccffcffccddccfcbbeccfffc7cfc6cffff
cccffffffffffffc7ffccfcbbccbbcffcccfccfffcfcffcb7cffc6dcfff66cffc66fffcffccfcffff8fffbcffff677cf66fcb7f77c777ccc6c7effbbcc77cfffccbefcbcff77ccbecc77cd7cc6ffbfcbfcbcfdcccbfc7dedcfccf7eedffb7fccf7cffcc7ccbdffcbe7ff7777cccc77cfc7c8ffffc8ffffff8ffffffffcffffcccccffccffff8fffffffffffffcfccfffcfffcfcfccb7ccffccffffc7ffff6cf
fccccffffffffcc6cc6ffd7cffffccbcffc6cccffcffbdccffc69cffcb6cffccfffc6ccccfcfcffffcfff6cfc76cfc67efb7f7fc7766f77c6c7fcdcc6cfff7ddccccbcc6bf77ccdebf77cbccf77fc7cfcdbefdceccdefb7dffbbf7eed77ffccccfc1bccfc7ffddfbc76cbcc7777ebfb76fffccffcf8ccfffcffffffff8ffffffffc7cffcccfff8ffffffffffffcffcccff7ccffffffccf7cfcbddcffc7cff66
6fcffccfffffccfc6fcdbcffc6d6cffcdcffcfccfcfbcfffc66cffcdbcfffcfffcccf68fffcc6ffffcfff8fffc8ffbfff776c776ee7b7ff76ccff6767cccccc77cfc7fcfcfd77cdc7c7d7de77fcdcfddfcbddfc7bccbc7cdedecf677dcffc7cfc766cc7ecccccfcdc7cccddccc76bc6cf6c7fffffc7ecbcfffffff8ff8fccffffcfcccfccfccfffcfffffcffcff77fffcccfcffffffffffcdddddddcfff7cff
66fccfcccccfc6cfcdc8ff86966996cffcbcfccffcfccfc968ffcdbcfff7cfcc6f8668ffcfc68ffffcffffffffcffffcccc7d76c7776f77c6cc7bbcc66ecccccccbcfcbdd777cfdffcccccccbbbbb7cccccc77defb7ccdccb6f7ff777cbbecfbe6cc77ccbffcc7cfc7cdcfcdddcccffffcfffffffcc6bccbcfffffffffffcc7fffffccfcfcfffcc8fffffcfcccccffccffffcffffffffffcbd1111bbfcfff7c
ffc66fcfcccccfbdcfffc6bd66d68696cffcbbcffcfccffc66cffcbbcf7ffccc666ffccffc7cffffcbcfffffffffffcffc77cc77ccc77cccceeecc7c7cc776ccccfcb77777ccbe7fffc7ccbbcbb7ccccddbcfccbdbcc7ccc7cfcfcbcc7777ccccc7766cccc7befc7cccbddcccbddcc88ffcffffffffccc77cbbfffffcffffcfcccffffcbcffc7cfc86cccccccfffccfffccccffcccfffcfcfcbbbecf8fcfffc
cfffcccf6cfcbbcfff869966668cfc96666cffbbcffccbcffc6668fccbcffcc6cffccfcc76cfffffbeefffffffffc7cc76fc77ccccccc6ffff7fccccc77cf6cffcbb7c77c7b7ccdfcccbbccb7666ccddbbbddcccc7dbecdccc77ffccbbe777bbcffccc7ccccccbccddbeebddbfccddbfcbbefffffffffccc7cccfffffcccfffccccccffffccfffcccfcccccffccccfcccccffcbffff6fcfffff8cfffcff6ffc
6ccfffccfcbbcffc669966668ffbd6669966ffcbbfcfffcbbcff666cffcbbffccccccccccfffffffcccfccffffbbcc7cc777cfcccf66cccfcfccbcffc7fc7cfcbbc77cc7beeccc7cbccfb7776ccbdb77cc77bddccc77dbfcbbcc7cccccbbcc7cbbeec7fcffc7bfccc7bddcfcb1bcfcbdbcc7bcfffffffff6fcfcfffffffcccffffcccfc7cffccccccff7cffc7effffccccffccccff6fccffffffffffffcfbdc
cccc6cfcdbcffc6697666cfcfbd6699668ffcb7cfffccfcfcbdf88666cffcbdcfccfcccffffccfcfcffc8ffcb6bb7cc77ccfffff8cfff7cc6cfccfcccccfcbddec7ccbbeccc6cfbbefc7776ccddbbb66996c777bdbcc777ccccbbccccccc77cc7c7dccccccfccf8fffcc7ddcccbddcccbddcc7bffffffffc8ffcffffccfffcccffffc7cffccfccffcccffcccffbcccbcccfccfcc7cfc6cfccffffffcffcddcf
fc6cfbdccffc669966688ffb96699668ffcbc8ffffcccffbbc8ffcb9666cfffcbbcccfffcccfc8cfcffffcdcbbcbcbbccfffffffffffcc77ffe666cffccbdcc77cedcc7cfcfcb7ff7cc7ccbddbbb6999911996cb77ddef77cccccbbccc7cc67befcbcdbfcccccfffffffcc7ddbf7cddbcc7ddccffffffffc8ffcffcffcccffffffc7cffccf7fffcccfc76ccfbbccfc7dcffcfccffc77cfccffcffccfbddcffc
6ffbdcfff869d666688ffb96699688ffbbc8fffffcffcbbcff869996666668cdccffcffccff6ccfffffbdcc6bdcb7e8fffffffffffffffff77cc6fffcddcc77c77cfccccccdcfcfcc6ccbdb77bc699919919996cc777d1cfcccc66f7bcc7ccccc7bccc7dbfff6fcfffccffcccbdbfccddbcccddfffffffff8c6cfccccfffc7ffc7fffccfccffc7ffcccfffc7cccfccfccdbfc6cccffff7cfcccfcfffc77dbcf
f7dcfff669d666688fcb96699688fcbbcffffffccfcdbcff8696f69966cfcbccfcffccffcfcfccc86fbc66dccb7c8fffffffffffffffffffc677ccbdbc7b6c77efebf7f7dcfccfccffb1dbbeccff699991999cff6cc7bdddf7c7ff6fcbdccc77ccc77ccc777c6cfffffccfffcccbddeecbdbccfcfccffffffc67dcffcfccfcff77f877f7cfccccf6ffffccccccfc7f6fcfcbdcffcbbfffc7ffcc6ffcffc77d7
7cfff867d96668ffcb96696688fcbccffffffcffcbcfffc96cfc696ccc7dcffff8ffc7cffffcfffc8fccddcbbcffffffffffccffffffcffffffc677c77fe77fc7cccccddcc6ffccccfcdddddbfffff66999cffffffbed1dcfbc6ccffc7bcbccccc77ccb7cc7dcfffffffffffffcccbddeccbfffcfffccffffffc66dbccf6ccffffc7cfcfcccccffcfbccc7cccccccccccccffbdbcfc7bcfff7cf6cff6cfffcd
ff8669966688cfcb66697688fcb6ffffffccffbbcffc696cfc696cccbbcfffffffcccfffcccfcc6ccfcfccccffffffffffbbcbbbfffffcccfff888c77ccfcccfc77cccddbccccccccffccbdbdfffffffccfffffccbdddcccfcccfcdcffbcbcccccfc77fc7bcc7bfffffffffffffffcccdcfcfcfff6cffccffffff866bbcccccffffffccfccfcdcffffcdccc7ccfcccccccccbcccffffccbcffcccfcff86cfff
86997666c88cbd6699668fcb668fffffccfcbbcffc666cfc66ccfcbccfffffffcccfffccfffcccccbccfcfcffffffffcbdbbbcc77bcffff8fff8ffffc777cc7c66c7ccdbbcccfcb7e7cffccbddbbcfffffffffcdddbcccfcc777cffcbbbccc7ccc77ecc76ccdbcccffffffffffffffcbccfcf8ffffc7ccffccfffff8bdb6dbfccccfffcccfbcfff6cfffcbbccccccccfc7bccffffffffffcbcff66fffffffcc
99966688fcbd669966cfcb6cffffffccfcbccffc66cffcd6cffcbccfffffffc6cfffcccff6cfccccfcccccfffffffcbbbbcc7777cccfffffffffffffffcc77c6c7ccb7cbc77cc777766ccffccbddbcbcfffbbbdd7ccffc6c66f67cbbcfbb77ccccfe77cfffffcdbecbcfffffffffffffcffcf8ffffffcc6fffccffbdb66666dbfccccfffcfccffc6fccfffcbbffccfcdbccfffffcccbfffffcbbcfccfffffff
96968fffb76696688fcb6cfffffccffcbccff666cff6d6cffcbcffffffffc6cfff76ffc6cffbccffffccfffffffcdcddee7777cfffcfffffffffffffccf8f677ee7bcf7c77f7cbe8fc76c7cfffc7ddbceeeb1dcccffc6c7ccccc677e7cc7ccb7fcd7cffffccffccbdbcbbfffffffffcfccfffcfffcfffff67cffbdb666c68666ddfcffffcfcfcffcccccccfffbbccddccfffffcdcfffcbcffffcbbffccfffff
d68ffcd66996688fcb68fffffccffbbccff666cffbdcfffb7cfffffffc77fffcc6ffc6cfcb7fffffffffffffcbfcbdcf7776cfffffffffffffffffcffcfccff677bfccf66ff7ccffcbfc6cb7ffffccddccdd7c8fc66ccccccbffccdcf6cffcfed7ecffffffffffffcbdbbbbcffffffcfccfff8fff6cccfffffbd666666c6666666cbbbdfcffcfc7fffc7cc7cfffe7cffffffccccffbfcfccfffffcbbcffccff
8ffcd66666888fcbcffffffccfcdbcff8666cfcbdcffcdbcfffffffcb6ffcbdefccccfcbc8fffffffcdbdcfccffcff7d7cccfffffcbc8ffffffbddbdbcffc6fff6777ccfc6cfc66cfc7f77fcbfc6fffbddbfcffcfc777fceefcddefc7fccfcdcfccfcfffffffffffffccd1bcdfffffcfccfff8fcffc67fcffcdc66666c9cc6c9ccdbcfcbbffdffc7bffc77fffcffffffffbbffbcff7ffcccfbcffffcbbcffcc
fcd669968cffbbcffffffccfcb7cffc666cfc66cffcd68fffffffbbcffcbbbcbcfffcccfffffffcbbe6fccccbcfcff886cffffffff8cfc8cfcddecccbddfffccffffcbbfccc7fccf7ccccc7ccbbcffffccffffc7dcf6fcfbf7beecbeffccd7cffccffffffffffffffffccbdddfffffffccfffcff67fff66fffccbc66666c6ccbd7ccfcccccbefffccebeffcccfccffffcbffcccfff6ffccccccccffffccbcff
d666666cfc6bcffffffccfcdccffc666cfcb6cffc66cfffffffcdccffbdcfcccff77cfffffffcddd77ccccbbcffcfffffffffffffffffffbddccccccccfbbcffc6ffff677effcc7cf7cecc7fdccfffff8ffffffd67f6fcfb7cccccfccb7cffffffffffc7bbccffffffffffbdbfffffffccfff8ffffc7cffccffffcccc66ccbdcccf676c7cccbdcfccfffccccffc6ffcbffcccfffbcc7deffcbffcbcfffffcdc
696668fcbbcffffffccff77fff66666fcb6cfcb6c8fffffffcccbbfcdccbbbddfcccffffcfcdb7d76fcbbcffcffffcffccffffff8cffcbdbccccccecccccfbdcfffccfff8777fccc7ecc7cbf7fcffffffffffff7fcfcfcfbfcc7cfcbbcfffccfffffcbbe77cbbcffffffffffcfffffffcfffffffccffc7cfffcffffcbfcbdcccccccc66cc6c8fcbbcfcffcccccfcccfcccfcfcfcccbc6ccccccfcfccbcffffc
6688fcbbcffffffc8cccf7cfc66666666cfcb6cffffffffccccfcccddbcbbbccfcffff6ff6f77cfccd7ccfffcffffffff8ffffffffcdbbeee7fcccc7cccccccbbbfffc6fffc77bcccbbbcc7fcfcffffffffffffcfcfcccbdcccfbbccfffcccffffc77ffccc7777bcffffffffcffffffffccfffccfcccffcccfc8ffffcdbcccccccccbee66cfc6ccccbcfcccccfccccfccccccccfc66c7cc66fcfcfcfccccfff
88fcbccfffffcbbcfcccf7cf6666666668c6cffffffffffccfcffffcb7bdeffcfcff6cfcccfcfcbbcccfffffffcbd7cffccfffffbbbeccbf7ccc7cccccccbcbddcfffffccffff67dbecbbcff8fcffffffffffffcfcfcc7c67bbdccfffccffffff77bc6ccc776777cbcffffffcfff7bff77bdbcccccfcccffcfccfcbdbcc6fcccccccccccf66cf7fccccdeffcccccccfcfcccfcffcc6ccc6676fccfcfdccfccf
fcbc8fffffbb7777bccff7cf6666666668ccfffffffffcfcfcfffffffccfffffffcfcfccffffffccffffffffcdd776fcb7cffffcddbebec7cfbecdfccfb7bdbcfffffffffcfcfff6c7c6cfffcfcff6c8fff6cffcfcbffcc767cffcffffffffffffc7bde777cfc7e77cbbffffcfff7777fc777ddcccfcfffcfffffbccfc77ccccccccccfcbcc67cc6fc6fcdbfc77fccfcfcfccccccf6ccc76c6bd6fffcfccffd
d6ffffffbb7c66c667cfbbcf666666666f7cffcbbfcccfc6cccffffffccfff8fffcccfcc6cfffffcffffffcb77fc66ddc88ffffcccbdd7cbbcccccccbcddbcfffffff8fffffcffff868fffbcffcd6ffcbb6ffbd7cfc7defccffffcfffffffffffffffcd7e77e667dedd7cfffcfffcc777ccc777dccff7cfffffffcccccf7dcccccccccccfcdef6cf6cccbbccfcfcfffcfffccfcfcdeeecc67f6ffcdccfffcff
ffffffbdcff66ffff677fcbd7fc666666fcccfffcbbff6ccccffbffffcfcdcfffccfcccfffffffccffffffcccccccbcffffffffcffffcddbc7ccccdbbdbcfffffffff8fffffffff67cffbcfbb7dee7befff7dccddbefccbffcbfffcfffffffffffffff8cd7e77cdbb7efffffcfffcccccbcfccfcfcfcfccffccfccfccc7fcbcccccbbcccccc6ccc6ccd7ffffccffccfffbdeffcfccccbeeeecbc67fcdccffcc
ffffbb7fcccff7ccfcccbefccbbcc6666cf866cfffcbbcffffccfffffcffcffcfffcccccbbbcfffffffffff8cfbcfcfffffffffcfffffccddbc7bebdccfffffffffffffffffccffcc8fffffccccdb66beed777bcc7dccffff7cfffcfffffffffffffffff8cbb7777cfffcfffccff8fffccc7ccfffc8ccffccfcd7fbbcccccccccccccccccc6ccc7bccfc8cccfcccffccccc7ffffccfccc7fcf7fccf77eefccc
fccf7d7ccfcccc6cfccfc67cbcc7bcfc696cfc666cffcbbcccfcffcffffffffc7cfffcbdbcc7bcffffffccffc7ccfcfffffffffcfffffffccbdbddccfffffffffffffffffc7cffc668fc6cffc77cfcc6776fcf7dbccffccfffcffff6cfffffffcfffffffff8c7cc8ffffcffffffffffffcccfcffffcccccc7d7ee6eeebdefcccccccccccbc6c96fc7fcfcffcfcf7fccfe7effffffffccccccccfccc7fcccccc
ccffcc7bc66c67cb7cc7eec767cc77bbf86d6cf8666cfffcbbfccccffffffffccccc7d7ccccb7bcffccffcffccfffffffffffffffcff8ffffccccfffffffffffcbbbefffbcff77ccfff8ccfffff7777bccb7cb7cfffffccffccfcccff7ffffbbbbcffffffffff8fffffffffffffcfffffccffcffffcffbb7ff6ccf7cccccdcccccccccccc66ccc8ffc6cfffcff7ccffcccffffffffffcfccccccccfccc7fccc
cfff88cc77c7777fc7fccffccc77c8fbfc8fc6d6ffc66cfffcbbcfccf8fcbcfffcfcfbeffbbbbcffcccbbffff8ffffffffcbdcfffffff888ffff8fffffffffcdcc6cbbcfcfcbcfffc6fcff7cfccfc677ffc7cfffffccf8ffcff8ff66fcffbdcc66bbcffffffffcfffffffff8fffcdbfffffffffffffbdccccffcff7cc777ecbbcccccccc668ccffbfffffffffccfcccfffffccffffffffcfcccccfccccccfff
bcffffffccd7f7777777766c77c8fffcf6968fc666ffc666cffccbcfc6cffffcccffbcfc7bcfffffbdd77dbfffffffffcdbbffccccbffffffff88fffffffddcc6668ccdd7c67ffbcc8ffbcffffccfffccccfff6fffff77fff668fcf7ffbdbccc6666cdcffffff8ffffffbcffbdccfc1bcffffffffcfccbbcf7cf7fffc7e7fcccbbccbccc888fcbffffffffffcccc6fffffffffccfffffffffffcccccfffffff
ccffffffccccbb6777776cd7cffffffcfffc668f86968ffc66fffccbcfc6ccccfccc7cff8ffffcbdb7bd77dddcffffcddeffbdddccffcffffff8fffffcddc66668cbd68fcd7efcc8ffffcffffffffcc8ff8c6fffffffcccffffccffcddc86bdff866c6cbbffffffffffffbdcffcddcfcdbcfffcffcbeefcbbcc7cccb777cfc667fbdcffbfcfdfffffffffffcf6cffffcfcff67cffccffffffffcfcfcfffffff
cffff8ffffccccbbc6ccd7fccffffccffffff6d68ff666cffcb68ffccdcfccfccffffcff8ffcdd777d77dd77ddcfcdbfffbdbccffcdbcffffffffffcdb6c6688fbd6fc6666cdd7ffffffcfffffffffcffcfccfffffffcccffffffdddccc668661cfc6666cddffffffcdffffbddffcbdcffbdccccff7ccfcffbbccccffccc77666fcedbffbeffffffff8ffffcfffccccccccccccfbcfccffffffffcffffffffc
fffff88ffffffcfcbdd7cffffffb777dbffffffc66cff86bc8fc66cffccbcfccfccffffffcdb77d777dd77db76bdbfffffbbffcbbbcffcbbffffffbddcc66cfbb66c668fcdcccddefffffffffcffffffcfffffffffffccfffffbdcc6ddfc866c66bcf88ccbddffccfffbdbfffcbbcffbcffc77bcfccccfccfcfbdcccccc76666cbdcf6ffffffffffff8fffffccccfcccfccccfcfccccfccfffffffffffff666
ffcbcfffcdeffffffcc8ffffcb77776c6cccfffffc6668fc6bccfc666fffcbbfccccfffbd777dd7bdd77d76bbbbdd7cfffcffcbbcfcbdbcfcbbfffccfcdbcc6666668ccd6c66ccfbbfffcffff8ffccff8ffffcffffffccfffcdbcc6c666bcc866c66bccbbc8cfffbdccffbdbcffedffff7779dccfcfffffcfcffccbbc6666ccbdccff8ffffff8ffffffffcccfffc7cffccccfcffcc6ccffccfffffffff696ff
fcbccffffcffbeff888fffcbd777cffc8c67bbfffff8666cfc666cff666cffcbbccccbd77ddd7ddd7bd767cdddb777677ccffcbffbbbffcd7cffffcfffccbbcc868ccd6c668ccfbdefffccfccffffccfffff7cf8ffcfccffffdbcf8c66666bcc866ccdbcff88ffffccdbcffcdcffffff67bdd97dcc6ffffffcccfccc7bcccdbcfff8f8ffffffffffffff8ccccfff8c7cfccffffc666fffccccccfffc666fffb
bfcbcccffcfcb7ff88fffbd7766fcbcfffc68cffffffffc666f8666cff666cffcccbdcf67777b777b76cbbdd77777bd777fccccffbcfcddcfffccfffffffccbdcfc6666688ffbbcffc76cfccccfc7cffffffc7cffbdfc667cffebbcfc666666bffbdcccffffffcfffcccddcffbfff6dd7667ddd79bccffffffffcffcffcbbcfcffffffffffffffffcfffccffccccfffc7cffcccc6cfcbd666cfffcb66fffbbe
c7cfcccffcffccff88fffc76ffccfcfcbfcfc8fcccffffffc696ffc6d68fc66cffc7ccfc6677677766cbd777776dd77766dd7cfffcffcbffffffcfffffff8ffcbdcc6886fcbbeffc76cccfccff7cfffffffffcc7cfccffc777ccfc7dbff86c8fbb7c8cfffffffcc6ffcf7bffffbdc6677db6c691d77dcfffffffffcfcfffcffffcffffffffffffcccfffffcccfffcffffc77ccccff7d77d7cffcd6cfffbbcff
cccffcffffff8cff8cfffcff7cfcdde86cccfccccccfcfffffc696ffc6dc8fc6dfffff6cb7cffffcfbdd7b777dd77766d76dd77dcfffccffffffcffffffffffc8ccbb8ccbbeff77c6cff7cfc7ecffcccffccccffcbfffccff7777ffcedbffcddcc8cfffffffffffcffffcfffbd779dbc69ddb6fcdddddbcffffffffffffffffffffffcf6cffffcfc6f8ccffcc7cffcccfffc6bfcbd77776ffcb6cfffcdcffcc
fffffcfffcfffffffcfffc8fcfcbccccfcbeccffccfccccffffff696ff86968fccfffff66ffffcccd77bb7bdd777fbd671d77ddbcbffccfffff6fffffffffffcfcfcccdbfffcc6cffcdefc7c8fc76cccccccfc7fffc7bfcbcffc776fffcddcccfffffffffffff66fffffcc7ffbd176ddbc6771d7ff7db7ddbffffffffffffffffff68cfffffcfffffc7ccffffffbcfffccffff777b76fffbb6fffffffcdbffc
ffffffffcccccffffcfffcff67cfcbecbcccfffcccccfffccfffff8666cff666cfffffffffffcdd76b777dd776cd977dd7dddccccbfcbffc668cffffffffffffffffcfff6c7dcffbbcfcbcffc7ee7fccfccc7cccbffffbbfcccfffd7c6fffffffffffffffffffffff66ffb7ffbcbbdd771bc677dd7667dd79dbfffffffffffffc6ffffffff8f8ffc7cfffddbdcfff67fffccffff776fcbc88ffffffffffcbbc
ffcccfc6ffcccfffffffcccb76777ccfcffffffffccfcbddcfccfffffc96cffcdffffffffffcb7777f777766cd979dd7ddbcccb7bbddcbd7cffcbdcfffffffffffffcfcfcccfcbcffc7cffc7cc7cc6ccffcccc7ccc7cfffcccfcccfccc8ffffffffffffffffcdcfffcfdb66dbbc7ebddd7bdd7667bd6c867ddbbbfffffffffc6cffffcfcccffccccffcbdefffcdcffcc6cffbcfffffcd6fffffccffcbcfffcb
cfccc7cccccffc6cfccdddbffc7d77cff8fffcffcfcbbcffcbccccfffffcb6cfcffffffffffffcc6676fffcd779d77bdbee7fb7bb66666fcbbecccffc7cfffffffffcfcfcff7cffc7cffcccc7cffcbeffe6eeefccccc7ccfcc7cfcbeffffffffffffffffccffcccfcbb66666bdbbcc7e7ddb7dd78667cfffccc7cfffffffccfffffffcfffcccffcfcbbcffcccc86bbcfccbccfb6ccff8cffffffcbd7ccb7fff
cccfccff7bf8ccfcbdd776cfffcccfcf88ffffffcbcffccfffcbcfccfffffccfcffffffffffffcfc6fffc7cf7d77dd7ccc7b77bd666ccfc66cbbcfcccc6cffffffffcfcfcfffffccffc7cc7ccc6fccc7ee7ccccccfc7cccccf8ccfffffffffffffffffcccfc6fcbbcc66cc6666bbd7cc7c7dd7777cffcbcfccfffffffffc8ffffffff8fcfffcbfcdbcdbc866666cbc6bcffc66ccccffffffffcbbc66666cbbf
fcccffbcffccfcbdd777cfcfffccfffff8ffffbbbfccfcffefffcbbfccffff8ffffffffffffffcfffffb6cccfcddefc7cd7b6996c6ccc6d6866ccdbccccccfffffffcfcfcfffffcf7cc7ccfcccc6cccccccccccccccfc77ccbcffffffffffffffffffcff66fcbbc6866bbc866669dbdb7c777bdd767bfc7fffffffffffff8ffffffff8fffccfbdccfffcdbc666fffccc6bcffccfffffffffcbdeecc77bc66c7
dfccbfcfccfffdb776cfc777ffccffffffffbdcfffccfccfccffcfcbbffcfffffccffffffffffffffffffcf7dbcfccc7776666c6cccdd6668cfbbccbbeffcf7fffffcfcfcffffff7fc7cff7cfccc66ccccccfcfcccfccfcc7fcffffffffffffffffc6fccfcbdcbc886866bbc8666c6bbbbee7f67ddc6cfffffffffffffff8fffffffffcfffbdccbccf8ffcbbcc6666cc6ccdcffffffffffddcfb7ffcfcbccd7
fcbfccccffccf676ff777668ffccfffffcddcfffcccff6c676cfdffffbdfff866cffffffffffffffffffff77cfcccc77cbcccbcffd66666cfcb6666ccbdcfccfbdffffcffffffffcfccfcbcccfcccccc7c7cc7f7cccccbfccfcfffffffffffffcbff68fcdbc6c666c866666dbfc666fdfcdbeeecc7cfffffffffffffffff8ffffffffffcbdbbdcfcddffccfcddf866bf868c6bcfffffffccc7c8ccccccffb76
ffcfffccff7cfffc77766fffff8cfffedbfffdccccccf66ff6ff6ffdfffcdecffffcffcccffffffffffffcffc7fdb6ffffbdcffb666668fcb668866fc687dcfffffffffffffffffcfeeffc7dbecccccc7fccccccccddcffcffcfffffffffffffff6ffbdcff86668669ff66c66cccfbdcffcc7bcfffffffffffffffcfffffffffffcfffbbcfc66dbcfcbbcffc6666ccc666ffd77dffffffcffc7cccbcccbb7cf
ffcfccccdbfffccfc6cffffffffffedcffccfcffcf8cccccc6fcfcc6fccffbdcffcc6ccffffcfffffffff8ffc77ccfcdcffcbbcccc66ff666666ccc76c66cbdbfffffffcfffffffcfecffffc7ddccccc7c7cccccdbcccffcffcfffffffffffff6fcbdfcbc69cc6666c66cc66cccbbcfc76cffc7dfffffffffffffffccffffffbbffcddffcfff6bcbdcfccbdc866866c88cbb7dd7fcbffffffffbccddeeeffff
ddeccccfcfffccccffffffffffcebcfcfccffccccffcf7cbfc6f6fc6ff6fcffcdcccffff6cfffffffffff8fff8fcfccbcf7cfccbbcffb6666cccb766666ccbccdbeccffffcfffffcfecfc7cffccddccc7c7cccdbcf8fccfcffcfffffcccfffcccddc6ccc6666dc88666c66cccdbefcc6ccdcccfcfffffffffffccfffcccfffcffcbbcbdbcfcffc6ccbbb96666c86cfcbd7bdd777ff7dbffffffcc77bbbcffff
777b7cffffc76cfffffffbcfcbbefffcfccfc7ff6ccccfffcfff6cfff66ffcbffcbbff668ffffcfffcfff8fff8ffcccfc6c6cccfcbbc8cc6cc666666cccb66668cbbbccccffcfffcfecfcfffcfcfcbdbcccbdcccfcffccfcfccfffffffccccbbbc8c66bc886666dccc668cbbbffcc667c6ccfff8ffffffffffffc6cfffcccfcbbbffc8c6dbcfccfccb66696c66cfcbbbbdd76ccfcc776fdcffffc8fec8fffff
677777cfffcccfffffcfffcbbcffcbfccfcc88cffbc6c668fc7f6ccfcfc7ffffeffcbdcfffc6cfc66ffffcfffffffffc666cf677cccbdcf8b6c866cfcb666668cb66cdbfcfcffffcfecfcfff6cffffcbdddcc8ffccfffffcccfffffcccfcbddbcfc666666cfc6666bcfcbbcffc7cfff67cc8fff8ffffcfffffffffc6ccffcbdccbdcff8cccbdcfbdd6666666cfcbbcddd76cffcdddd77ffddeffff8ffffcffc
ffc77777cfffffffcc6ccddcffcfccfccff8cccdcccfffccccffdbfe6c66fccfffcfff7dccccc66cfffffffffffffff8cfc6fcc77ccff7dcf886ccb76686ccc66666cccbbeec66dccecfcffffffffff8c688fcfffcfff88ccccdb67cfcddeffcbbcf8666c66cfc68fcdbeffc7dcbccccc8f8ffffffff8cccffccffff6ffcdc8f88cdbbffc8fcbd666696c66fcdbcbe7cccffbdddd7768ff776fffffffffcc7d
cbcf676fccfff7cffffccbbbfcc7fcff6ccc7c7bfffccff7cffbc7bfcccc6f8ccccccffbdcff6cffffcffffccffffffff8ffc67cffcccffcdbffc66666cfcd66cc6cf666cbdcfcdefeffcfffffffffffffcffffffffffffcccc7ccfcdbfcbdeffccbcfc66cc6bcfcdbefcc7cf6cccc88cff8fff8ffffff8c6cffccffcffbfff6fcdcccdbffb9666966c6cccdbebb77cfffcdddd7cccffbd777fbbbfffff6677
777ffffffffccfffcccccffcdbcf67f7f6c7c6cfcccf66bf6cccf66fbc66dcfcfc7ffb17c8fffffcfcffcfcdd6fffffff8ffcff6666fccccfebcfc668fc66866ccfd6cc668fcdbffccf6ffffffffffff888ffffffffffffcfcfffbdccdbfffcbcfffbdcf866ffcdbcfcc7cfbcccfff8fffffffffffffffff88ccffcfcccbddbf8cfcdbffb166696666cfbdc7dd776ffffbd777c8ffcd1db76cfccedbfffff66
ffcfcbffffcffcbbfccfcccfffbdff66fccfffffccbbcc66ccfcfccf6ffcfcccccfbdcffffffcfcccfc7fffccffffffff8fffffff6cfc6ccccfcbdcffb66866fcd66c668fcbbccdbefcffffccfffffff88fffffffffffffcffcdbbbcfffbbcffcbbcffcbbccbd7ffcccfccfccfffcffffffffffffff6cffffffcccfddefffc7dccccffb9666d6666cfbdeedd77cfffbdb7c6cfffc1ddb77ffffbdddecdcffff
ffcffcbcfffcb6cc6cffcfccfffcbbcfc6ccccffffccc6f8cf66cfcffcffcccccbbccfffffffffccfcffcffcfffffffff8fffffffff66fccccccfcbdbf8cbccb66c66cfcbbfffcdbfff7ff7fffffffff88ffffffffccffccffbdeffcb7fffcbcfffbbeffcbdeffc777cccc8fffccbffffffffffccffffccfffffcdbf6bdcffcccdbcd966666666ccbbb7dd7ccffcb11d77cffffbddb7cfffcbddd7cccc7dcff
ff8ffffc6bb6cffffc6cffccfffffc7dcffc66ccf88ff6cfdd766cc66fcccccdbcffffffffffcffccfcb7ffcfffffffffffffffffffff676cccc7cffcdbcfc66c668ccbeeffcdbcfffccf7fffcccffffffffffffcfff7ff6fcfcbbcffcbbcffcbcfffcbbdccf6ccc7cccfffffffc66fffffffffffcccfffccccddcfcffcbdccfccb966666666ccbbec7db7cffcd11b77cfffcbdbc7cfffcd1dd7ccfffc6f7db
fffffffff8fffc6cfffc6cfffffffffccbbcfc66ccfcfffcc7ff6cbcc7ffbbccffffffffffffffccffcfccfffccfffffffffffffffffcfffc66cccccffcbdccf668cbccffcdccfc6cfccf7ffffffccccfffccccff8cf7fc7ff6cfcebbffcbbcffcbccbbefc6666666cfffffffff866dcfffffffffffccccfcbdccbbcfccfcccbd666666c66fbdcc7776fcffcdddd7ccffcbddb7ccfffcdddb7cffffffccc6fc
fff69bcffff6966666ff886cfffffffffcccdefc6cfff6bffcffffccccbbccffffffffffffffcbbbbefccffc6cfffccfffffffffffffccfffc6cec7c6cffcbbcfcbbfffbbbcfc6677ffff7ffffcccff8ff8cffcccfffcfccbc667cfccbbfffcbbfcbbefc66ccc666fff8fffffffff866dcffbcf86cc6ffcddffccccbdcfccc9969666666fcdc676766666cfcbb66cffcd1d777cfffcbbb7c8fffffffffccccf
f666c866cc768fff8696ff886cfffffffffccbdcff6cf8cff7ccccfcbbccfffffffffffffff77cfff7bcffccffcccfffffffffffffffffcfffffc7ccfc77fffbbccffcdccff77cf6c77fffffcccccffffffffccfcfcfccccc76fff67cfcbbcffcd7cff67cbbcccfffccfffffffcffff66ddcfff888cfbdccbbbcfccfccbbd66669666ccbdcc7767666f67676f66ffcdddd7ccfffbdd76cffffffffffc76fffc
968ffffcb96fffffff8696ff886cfffffffffffcdcf6ccbbff66fcbbccffffffffffffffc76cffffffccdcfffc77ffcfcffffcfffffffffc6cfffcffbe8cc7fcfcdbcefcc67cffcc76cc7dcfcfffcccffffc8ffcf7fc76cc7fc78c76cccff7bbbfc8666cdb6fffffffffffffff6fffff866dbff8fcddcfffcfbdcfc6fb6d66666666fbbe67676f66f67667666cffcbd77cfffcd1dd6cffffffffffc7cfcfbff
fffffbbcfffffffc6cff8696cf8866fffffffffffcdbfccffccfdbcfffffffffffffffc76cfffc76cffff7bcfffcffccfffccffffffffffffccfff8fbbcfccffc6fcddccccffc7776fffffcbcfcccffccccffcfff77cffffc67cf6ff6c6cc6cffcfc6c77ffffffcfffffffffffcfffffff66fffcdbcfcdbcfcccbdcc1666c96c6ccbdc77766666f6766666667776fcc6cffcd1dbccffffffffffc7fcffccc87
ffcbbffcbcfffffffc6cff8666cff866ffffffff8ffcdbccfcdbeffffffffffffffbbc6cfffc766777fffffc7bcfffcfc6cffffcfffffffffffc6fffffc6cccc776cfffccccc76cfffbbffffc7cc7ecffffcfccb7efffcbc8fcc776ccce7ccffccde6ccfffffffffffffffffffff8ffffffcffcbdcffccbddcfcfcd666666c68cdbf77666666f66676666f6767766f68fcdddbccffffffffffc6ccffcc6ccdc
c6bfffcffcbeff86cffc6cfffc66cffc868ffffffffffcbbdbcffffffffffffffccccffffccffc66766cfffcc7fccfcccfffcccfffffffffffffcfffffffffc7ccfccfcccc776fffcffcccffffc7cb7777b7777cfffc7ccffffffcc76cccfccfb77ccffcffffffffffffffffffffffcffffcfffffbdbcfffcbbb96666686cccdbc7766666667666666867766666c66776cccccffffffffccfcccffccccbbc8f
cfffc7cffffcdcffc6cff86cfffc666ff886cffffffffffffffffffffffffffcbddbdbcfcccffffc66ccccc77fcc7cffffccffffcc8fffffffffffccffffffffcccccfcc77cfffc7ccffffcbffcb76bdddd76d7efcccffffc7cfffcc7ccffb7cfcfffff8ffffcffffffffffffffccccccffcff66cffbdbcffdd66666666cbbbc6776766ff6766666666666676ff6777666cccffffffffcbdcfccccfcb7ccfff
fff7f666cbcfffbcffc66ffc6cfffc666ff886cffffffffffffffffffffffcbddddbcbdbefccccfff67c77777cffffffccffffcccccff8ffffffffffffffffffffcc7c77cfffbd7fc7ccfffccfb7777dddddc67decfffc66ccccccffcc7bc88ffffffff8ffffffcfffcffffcfcbbccbbcfccff8666cffcbd966666666cbbc67776666867666666667766666f6776f6666c676ffffffccfccff6fccb66cfffff
ff666ffc6c6cffffbbcffc6ff866fff8666cff866fffffffffffffffffffbdbedddbbecedddcccc7cccd7776ffffcfcfcfffcccccccc8ff8ffffffffffffff8ffffffccfffb7ccf6dccc6cffff67777dddd77776fffcc6cc77fcccbefff8fffffffffff8ffffffcffffccffcdbcccccccdeffffff869cc9686666ccffbd77667666cf7766666f66666666f667666666c6666666ffcffcffffccbbc68fffffff
cff666ccf66667cfffbdfffc6ffc66cfffc696ff888ffffffffffffffcdddddb77ccbbbb1dbddcc7ccc776cfffffcfcfffcfcfdcf7cfc6cfffffffc7fffffffccfffffcfbdecccb7eff776cffffc77bbbbdbb6ffffcc777ffc7ccfccbff8fffccffffff8ffffff6cfffffcfbcbccbcc7bebffffffff866688666cfc68cfcdbf68f6776f6666776f6666c67666666f67766666c66666f8cdcfbbcc8fffffffff
fdefff6f666c6c8c7fffcdcff66ffff6cfff696ffff6cffffffffffcd1bdbe7dbbcfd11ddddcbcfcc77cffffffffcfffff7fcfbcfffcccc68fffff7cfffffffcffffffffccffcbffc77cccccbfffffc67776ccccfbbeffcdefffbbff6ff8fffcfffffffcffffff8877fffffbccc77b7fcbcfccfffffff8696f88f869ccfffcbbc6666666f6766676ff67766666f66766f6fff6677666fffdbccffffffffffff
ffcdcfcf66f66c6f6ffcfffdbcfc6cffff6968fcdddc8cfffffffcdddbb7bbdbb7bdddddb7ccccffcc78fffffffffffbcfcffcccfccfc6cfffffc668fffffffffffffccffffccffb7cffcdbcfff8fff8ff88fffffff7bcffc7bfffcffffffffc8ffffff8fffffff8c6bcfcfcccccdbcbccfffcccfffffff869ccb9cfffffff8cb7e666c6776666fc77666666c67666666ff7777666cfbdcccffffffffffffff
ccffcbbfff66f6cf6f7fcfcffbbcffff696ffffc667fffffffcfbbbdddbd77fbd111dcbbccc6869fcc88fffffffffbb7b7eccccfccfcffccffc768ffffffffff8cccff8ffffff6cfffcbbcffcff8fff8fccffffffcffc6bcfffc68fffffffcfc8ffffffffffffffff8cfffffcffcdbfcfcfffcccccfffffffc668ffffffffffffcbde6666676cc66666668f67766666fc6666666cc7d6ccffffffffffffffff
6cffffcbbeffcc6666c6cccccffdef666ffffffcfffffccccbbfbbdbcb77cc7ddddddbcc6cc6d68ff888ffffffffb77eeccccccff8cbbfccc7ccffffffffffffc8c8ff8fffffffffcbbcfcccfffffff8fc8fffffffccffccbcfffffffffffcfcffffffffffc688fcfffffcfffffcfffcffffccccccfffffffffffffffffffffffff67bc666f67676666f677666666666766666ccbdccfffffffffffffffffff
666c7ffffcbcfc66c668666cffcdcfcffcbbcfffffffffcbbeffcfccecccddd1bcbbcc6cc696888ffc8ffffffcbd7cccccbdccdbcffcccffcffffffcffffffffcfccff8ffff88fffccfccc76cffcfffffffffffcffffccffccfffcfffffcfc867fffffffffffcccffffffcffffffcfffffffffbbecbcccbcfffffffffccffff8cffffccb7c66666666c6666766f666666666fcdbc8ffffffffffffffffffffb
6668c6ccfffcdcfc6cf6666ffbbcfffcbbccbdcfffffcbbefccfcfffcc7ddbbbbbe66ccd688888fffcfccffcbdecfcbbbcbcbff7bbcfccffffffccffcc8fffccffccffffffff8ffffffffcfccffffcffffffccffffcccccff8fffcfffff8fffc67cfffcffff8cfc8cfcffcffffffffffffff7ecccc777fe7ccfffffcfffffffffcffffffcb76666f676766666676666666fbdcc8fffffffffffffffffffcbff
6fc666c67cfffcbcffc6cffb7ffffcdccbbdbccdcffddfcc777fcf8fffcc7db766cfc666888888ffcbd9dbbccffcddbb7bcfcfffc777ffffffbcffc76cffc6fff76cffffffff8ffffff8cffc676fffffffffffcff77fff8ffffffffffff8fffffc67cfccccffcffcffffc6fffffffffffffcbfffcd11bfdcfbfffcfcffcfffffffffcfff88cb7e66666666fc66666f68cbdcc88ffffffffffffffffffccfcff
6bcc7f66f6668ffcbbcfcbcfffffdcfdddb7fbd7bdefc777c77fff8f8fff6cc66fc966f888f8fffbdc6699bdbcfcccbcccffcffc6f6cdbffffcf77fffcc6fff778cffffffffffffffffff8cffcc7cf6c6cccccf77cc8cf8ffffffffffff8fffffffc67fffcccfcfffddcfccfffffffffffccc677d1111beecbffcccccffffffceffffffcffff6edc6666ff7766f666cbdcc8fffffffffffffffffffcbcfcfdb
fcccffccc686cffffcbdeffffcbccdccbee7dbbecdbbbe67c8ffffffcfff688fc96888fc8fffcdd6669669977dbcffcfffffcfc67cfffcdbffffcffcccfffb68fffffc8fffff8ffffffffffccfff67cfffffc7cff8c8ffffffffffffffffcfffffffcffc7ffcffcdccfcdbff7ffcfcfffcccbfcccbbbcc7ecbfffcffcfffffffcfc8ffffcfffffc7dcff7667f686fddcfffffffffffffffffffcbbfffcbcfff
bffcff7bc66c76ffcbcffffffbcfcdbeccbd7ccdcccdcc66cf66fffc7fff8fc6888ff8ffffcdd6669b699666667b6fffffffcfccccbceefcbdcfffcccff77c8ffffcbfffcffffffffff8ffffffffff7cccccccfff8fffffff8fffffffccfffbcfffffffffcccbdcfcf7cfcbdcfccffcfcfcfccdcfccccfcccbfccccccffffffffff88fffffccfffff7d7e6666fcd7c8fffffffffffffffffffffbcffffbbfff
fbbcfcccf666ffcbcfffffccccfbccbbdbcccdbccbcfcc6cccc6cc77ccffcf88f88fffffcd97767799969966666c8fffffcfcccceee7ccbefcbdcfccfc6ccfcfffcff8ccfff8cffffff8fffffffffffccccffffffffffffff8fff8cfff8ccffffcfffffffcbdecccccfc66ffbbccccffcfcffceebbbbcbbccfffcccfcddbbffffffffffcffffccff88ccdbefedbcffffffffffffffffffffcdbccfddbfccfff
cffcbcfccfffebcfffffccccfcfffcccccbdcccbccccffcccccbfcc86ccccf88ff8ffffb97666677776766666888cfcfcfccccbceccfcffcbceccdbffcffffffc6fbdcfff6cffffcfff8ffffffff8ff8fff8ffffffffffcfffccfffccfff6fffcfcffffcbbeefcc6ccffff6ccfcdbccccfcffffffccfffffcffccfbdbcbccbbcffffffffcbffffff8cffccbdccfffffffffffffffffffcbcfcfccfcccfcffff
bbcffcbcffebcfffffcbecdcccfffffcfbccbbccfffffcccbcccdbccfcccbcfffffffcf66699b766996c66688f88cf66ccccbccbcffff7ccccceeccdccffffcffcfc6fcc6fffc68ffffcffffffff8f88ff88ffffffffffffffffccfffccfffccccfcfcdbeffc6c8ff66cccccfccccbbcccfffffff88fffffcffcbdebbcbbbbbebbfffffffffffffffcffffffffffffffffffffffffcffcbcffcdbffcffcffff
c6d7fffcbbefffffffcddefccccfffffffcccffcffccc8ccbddbcc7bcffc6ccccffc88f888669967669688888fffcf6cfcbbfcbccccbeefccfcccf7bfffffcffccffc6c6ffc6cffffc8fffffffff8ff8ffcffffffffffffcffffff6ccfcfffc7cffbd7fffc66cfffcfc6ccffcc6c6ccbbfcffffff88ffffffffbccb7bdccbbedbcbbfffffffffffffffffffffffffffffffffffffcbcfffcdcfccffffffffc9
fb76fffffffffcffcfccc7defcc7cfcffffccffffcfcc86bd77c7dccbdccfc66cdcfccf88888666996888fff8fff66fcdeeffcccccfccffcccf776cfffcccc6cfffffcf8c6cffff6cfffcfffffff8ffffffffffffffffffffcffffffcccffffcfcddfccffc66fcbffffccf6c66fffc6fcbbcfffffffffffffffb77cc77bb77bec7edfcffffffffffffffffffffffffffffffcfcdfcfcd7ffcffccfffffcc968
d776ff6cfffcff6cccfffcc7defc7bbcfffc8ffcccddc8cbccbbccbdccccccff667bcbf8f88888888f8f8fffff677ccecffccfccffcff7ecc67ccffccfcff66c66ffffffcfffc6cfffc6ffffffff8ffffffffffffffccccfff8cffffccddeffffffcdbfcccfcc66bccfcfc6ffffcffc8fcccdcffffffffffffccc7bccc7bcbcfcdccfcfccfffffffffffffffffffffffffffcffccfff7efffffffffffb9688f
768fffffccffcccfccfffffccbdcf6cff6cfff6ccccccbbfcbcbdbbbccbcc7efffc66cccfff88f888f8fffffc77ffebfccccccfcbffccccc7ccfffccffccbecbffc6cffff8fcffff668fffcccffffffffffffffffccfffcbdbcffcffcf6f8fffffffccbbfccfff66fccc6cffc76ccccffccffedccffffffccfcccfccbccfcc7dbcfcfcfccfedb7bbbbbccfffffffffff8ffcbccfe7ef6cffffffffc69cfc668
88ffffffccccfcfcccfffffffcccdcfcfffcccccccffbccbcccccbccbbdbcce7cc8f8cbccfffff888fffffcfcccbbefcfcfff7f8fccc7b7ccffffcffffcfffcbfccffccfffff7ffdcfffccfffccfffffffffffffff8cfcdcccbdcfcfffcffccfffffffccbbfccfffcc66ffcccfffcc6ff6cf6cccdbeecffcccccc8fff7bccdcffffcfcfcbbec7bbbbccfbbcffffffcffffcfcbdfffff8fffffffc66cc668888
fffffccccfcccc7cccfffffffcffccdbcc7cfcc6ccffcccccbbeccbddbcbdbccc77ccc8ccbbffff88fffcccfff88cc7cc7ccfffcbbcccc8ffffffffffffffffcfffcccffcfffbffcffcccffffffccffffffff8fffffbbcccccccbdccffcfffccffffffffccbbcccffffc6cfcccff8cc66ff6cfccfcdbccccccfcfcbfffffffffc8fffcbbcccccccccccbccbdffffffcddefffccfffffffffffcd6c666f868ff
fffffccccc7cccfcccffffffffffffccbbccccccccffc8fccfcbdcfccbbccbddbcce7cfcccccbcfffffcccffccfff8cc7ccbccccccccfffffffffecffffccffcf77cffccfcccfffcff6ffcfcccffffcfffffffffcbbccccfcccfcccbbcffffcffffccccccffcbbcfcffccccccfccc66cc66cccc6cfccbbcfcccfffcffffffffff8fffbbccc7dc7dddccbdec7cffffffdeefffccffffffffc6d66c8cc66cfffb
ffffcfbb6cc777efcfffffffffffffffc67dcfc6cfcfffffffbeccbbcccbddbccdbcccb7ffccccbcfcccef777cffffffcb7eccccccffffffffcccfc8cfc7cfcccfff77ffbbcbbfccfccfcddbffccffffccffffcdbcccffcccc6cccffcbbcc8ffccccffffcccfccbbcfccfccfc66668ffffc66cfcf6fcfccdbfcfff8ffffffffff8fffebccdbccdd1d7cc7cfdcffcfcfccffccfcffffffcb66cf8666cfffcbbc
ffffffbdfffceecfccffffffffffffff8fcc7dcccffcccffffcfcccccbbcccbbbccbdbcce7cfccfcb66ccfc88cffffffffccbb76ffcfffffccffccffcc7fc6cfff77cfb7cfcfcdcfcfffc766fcfccccfffffcdbcccfcccccfffcccccfccbdcfffcfffffffffccffccdcfbccff66ccffcccfff66fcfccfcddcfcffffffffffffffffcfbbfc777d1111d777ccdcfcccfffffcfffcffffc968f6968fc8cfcb7e66
ffc6bcfcfffffffccfcfffffffffffffffffcccdbfcfcdcfffcfcfccdccccccccdddccbbcccde868cf67cfcfffccffffffffc6ffccfffcccffcfffc7ffc77ffcc7efbbee7cc8cccdbfcf66fcfccfccfccfbdbcfccfcc88fccfc6ccccfccccbdcfffffcfffffffcfffccbcfcccfcfc6c7cc66cfffccfcd76cff66fffffffcbfffffcfcfcdfcbdd7dd7ddbebdcffcfccfcffffccfffc96886d8fc668fcddcc7fc
fc6fccfffffffc7fbbfcccfcffffffffffffffc6cdbecff6ffffcfcfffbccbbcccccdddccbbccccfcccccfcffffffdbfffffffccfcffffbfcffcccffcccfcc77eee7fcdcffc7cccccdbff68ffccccccfcdec7dbfccccf8cccccccffcccfcb77cffcb77dcffffffffffcccdbffbcffcc676cffcccf7d7cfffff66ccfffffffcbef6f6fffcbcffcbbbbcffddefffcccfcfffcccff696cff66699fffcdbe66f67f
c66ffffc6fccccffccccffccfffffffffffffffff6cddcc6cfffffcfccfcccbcbee7cccddbccbc77cccccbfffffffccffcffffffffffffffc76ffcc7cfbee77ccbcc77f8f77cfc7fcd7effffccfcccbd7c76cc7bbffcccffcccffcfcfc7776ffc7ccbcfcdcfffffffcfffccdbcfccffcccffcccbdcc8ffffff6cffccfccffffcbcfcfffcfcccbbbbbbbbcfffffcfc6cccccfc668c699ccc6cffcdbe66f6ccff
6cffc66cfccbeccfffffdbecfcfffffffffffffffff8cbd7cc6ccfffcfcfccfcbbbcfbbccbdbccccb7cfccccccfffffffdeffffffffffcbbcfc76ffcc7777fcdbeccfffc7ffccfbb7cfffffffcccbdcc66f66ccc7b7cfcccfcffccfc77ccffc77cbcffccfcdcffffffccff6ccbbccccffccccbbcffffffbbcfccccfc6ccccffffcbcffffffffccccccfffffffffdfccfccc666c68fc6668ffcd766ff66fcccf
cccc6cfccb76ffffffffcccffccccffffffffffffffff8c7dbcccccfffcfccccccccbcfcbbcbbdccbccbfc6cccccfffffcfffffffffcdbc77bccc7cc77cccbcc7cffcccccccccb7ffc77ffccfcbbcc66c77bcc6ccccbbcfccfccfc776ffc77cc7cffccccccfcbbcfffffccfcfccbbccccfcbbcffffbbffcccfc6fc6fffccfccffffc7cffffffffffffffffffffcffcfcc6d9ccc86cfccfcbbc66ff76fcfcfcf
ccffccffccfffffccfffcfffccff66cffffffffffffffff867dbfccccffffffccccccbbcccbbccdb66c6ffff6ccccccffffff8cffcbbc66ffccbcf77eebbcc7ccff77ccccfbb7ffc766cfffcdbcc666cfbbccc67ccccc77cfcfc776ccc7ccbbccfcc6ff6cffcccbdcffffffcffffcbbccbbcffffffcbcfffffccccffcffcccccccfffcbcfffffffffffffffffccc7cfffff6696f8ccfcbbc6cfcc6fcfdfcccc
fcccccfffffffc6ff6cfcfffcfbbfffc6cfffffffffffffcffc7dbcfcccffffcfc8cbcf7dbffcbc6cffcbddbfccfbcfcfffcfcfcbbc666ffcffccddfbb7ccfcccc7ccccf7dc8fcb6c8fffcdbccccfbd6cfcffc6cc7cfff77cc776fc77ccbcccfccccc68ffccfcfcfbdcffffcffcffccc7cffffcbcffcffffff66ffc8cc6ffffcfcccfffc6bcfffffffffffffcf6cffcdccfff696cfcbbccff666cfcfcffccff
cccbcfcccffc6ffccccfcffbcfccfccfccccfffffffffc766fff6cbdcfc6cccffffcccbcfcdc868ffbdd77cbd7fffffcfccffbd7ccccffcc76ccbfcdb7c7cccccccccf7dcffc766cfffffbb7fc6ccccc66c666ffcefffcfcccccc7b76ccffc66ccffff666c86fccfcbdcfffffffffcfffcfbcfc7dfffffffff6ffbdefefcddcfccfcccffffcbefffffffffccccffcdccff86968fcdbefc777ffdffcffbcfffc
bbffccccfccfc6cff6fffffcdcfcff7fccffccfffffbd7768fffcf8cbdcccffcfcffcfcfdcf6cffbdcdcccbcbdbcffffccccbbfcc7cfb7ecf6bcccccfddc77e6cfffb76cfc766fffffffffcbdcf6ccfc7bb6c66cffcfcdbcc7777766ffccffcfc6c8ffcff66fcccd7c8cffffffffffffffcccfffcfffffffff6cfccfffff7ccfffccfcccffffcdefffffccccffddcfff8696cfcdbc66ccfffbf6fcfcccf8cff
ffc666cffff6cfccfffbcbff8cffcfcfccccc8cccbd77688ffffffff8c7dccc6ccfcfffcfc8fcdbbbbccbdbc7cccfffcccc7eebbccc76cccbbc77ccfcccbfcb7ccc76cfc768cffffcbbbcfffc6bcfc6cccb6ccffffcbde77777776fcbccccfcfcccc7ef68fcccd7c8ffffffffffffffffffcffffcfffffffffccf6cf86ff6cfbdc8ccfff6cffffcbefffccfcbbcfffc6968fcdbf6fffcbdfffccffdebcffcbc
fcff6ffccccffcfccccfffc7cfcfffcfcccccccb777688ffffffffffffc67dbcc67fcffff8fdbeebb7dbcc7bdcff6696ccfcccfcc77cc7cbcc7ffc76fffcfc7777cccc76ffffffcbccffcbbbffccbbccccc7c8ffcbbee7777777cfbdec7dccfcffccfccfccebc88fffffffffffffffffffffffffffffffffc7cffccffc8ffcfc7ffcfcccffcccfffc7cffcbbcfffc966fcbdcc6cccfcdd76cffcc6cfcfbcccf
fffcfcbcfcf6ccffc66c6ccc66cccccfcccfcb777cfcffffffffffffffff8ccbbfcc7cfffffbcbbbcbbcbbccffc6666666cccffffccbccc7cff777cffcccbd66fffc66ffffffcdccffc7ccb7bcfff6bcfccfffcbccc777777cffcdee77cc7dcccccffccccb7c8ffffffff66cffcbbbbcffffffffffffffcbefcbcfffffbffcf8fffc6bdfeeffcccfffcbbcffff666cffbd7ccffccfcceeeffc6ccffcbccffff
fcfcbcbbcffcc67befcffccccfcccccbbcbbbc66cfffffffffffffffffffff8ccdbccc7ccfcccccdd7c7ccfff666666666bbcfcccccfccff6c77fffcccbb768ffffcffffffbbcffcc77f77ffc7bfffccbcffcbbfc7767776fcbbec77777dcc7dbccccfcbcf88fffffffff6ffcbbfcffcbcffffffffffbbefffffcbcffccfffffffccfccfccfccffcccbcfffc6668fcbdcccfcccfcf8ccccfc7ffffccccffff6
fcb766cc66cffc6cccf66fcfcccffbbbccc7bdbfffffcfcfccffffffffffffcf8ccbbcfccc6cfffcccccffcbd686966666666bcfcccfcffff6cffcccbbcc8fffffffffffbdcfcbddbccbcc77cc7bcfffccb77cffc7ccccfcb7c77777766ffcfc7d7fbdcfffffffffffffffbbefcffccffcbcffffffbbcffc696fffcbbffffbbffffffccfffccccfcbcfff86968fcbdccffcccfccccffccffcccddccfffffc66
c7cffffccccccffccfccfcccfc66fcccddd7cb7fffffcffc7fccfffffffffffffffc6bdcccfcfffccccffbbcccbccc86966666dccccccfccffccccbdc88fffffffffffbbcffddddbc7ccccfc77ccfcbbcffffffffccfffb7cc7777776cffcccf8ccccfffffffffffffffcbcfc6cc6cf6cfffcbfcbbcff8696866cfffc7bcfcffffccfccfccccfbbcfffc696ffbd7ddfc7cfccff76fcccffffcc7ccffff66c76
cff8fffffc6cfffffccccfff67fffcffcdbbefcfffffffccc7cffcfffffffffffffffccbdcfcfffffccfccfcdbccdcc6696cbdcccfc67766cc7fbdc8ffffffffffffddccccd7dbbbfcdccc77cff66cdbdbffffffcccffdbfc777776fffffffff8ffffffffffffffffffccc68ffcdfccfcccffccccffc96cfffff69cffffcdefffdcff8cfcfcb7cfff6968ffbdccffcbdcccffcf8c6cccff6ccfcfffc77cc7ff
fff8ffffffcfffffffcf77b7ecccfccffccfffcfccfffccfc6fbdccccffffffffffffffcf7dcffffffffffcccc6cbbbcc8cdeefffcff6cc7ccdbcc8fffffffffffdbcccbfcffcccf7bef7776cff6cffddecccffffccffcc777776fffffff8cff8fffcffffffffffffcbbbfff69cfccfccccbfffffc66cfffffffffc96ffffcbccfffffcfcdbcfff696cffddcffcbbcfcb7ccc6ffcfffcc6ffffcfffcffd77dc
fccfffffffccccffccccccd1bcffffffffcffffffffccfc7cff6ccbcccccfffffffffffffffcbbcccccfffffcccbccbbbbccfcfff666c77cdbcc8ffffffffffcdbeccccccfcfcccccc77668ffffcccfcccd777cfff8ffcff676ffffffffffffffffffffffffffffcdccffcccfffcfcffccffffcb66cfffcb669bffffc66cfffcbcffffcbbcff8666cfcdbcfccccfc6cfccbbecccff77cfffccfcfffcfffcbeb
6ccccf8ffffcfcccccd1ddbcb1dbcfffff8fffffffc6cffffccfccfcbbcf8cfffffffffffffcc6bbcccccfffffccc76becfcfffff667ccd76cfffffffffffcdcfccccccbdbcc7bcc7766c8ffccf6c6cc7766ccbdcffffcff68ffffffffffffff66cffffffffffcbcfffccffcbcfffcbccffffcbbbfffc66cfffcd6cfff866cfffcbbbbcfffc6668fcbbccfc6fccccfccccfcbbcfcccffffccfcfffcffffffcc
cc767fffcfffccccd1dddbddd77ddcffffffffff7bccc7ccccccccccfc7bcf8cffffffffffffff8cbbecccccffffcccffcfcfcfccccbd76cfffffffffffcdcccccccccbcfcbbc77766c8ffccfc77f77766cbbd777dbfffff88fffc8ffffc88fffcfffffffffcbcffccfcccbcfcbccccfffcddcffffc66cffccfffc66cfff866cfffccfffc6688fcdbccc6ccff6cfc6cfc7fcffcbbcfcfccfccfc6ffcfffffff
ffcc6ffcfcccffbdddbcffc7dddbcbbfffffffffcccbefc7cccffcbdbfccbbcf8cfffffffffffff8ccbbcccccfffffccfcfffccccbdccffffffffffffffbbbccbccbbcfcbcc77766c8ffccfc7cc77776fbd77bdb777bdcffcfffff67cffff8fff8fffffffb7cfccfcccccfccfcfccfffccccccffcb6ffc6969dcfffc66cfffc6dcffffc666ffbdccccfc6fcccff6cccfccfc66ffcbbeecfcccccfccfcfffffc
7fffffcfffbccfccc6ffffffc7bddbcccfffffcccbbcc7ccccccffc6dffccfc7cf88fffffffffffff8ccbdcf66cfcfffffcfcccbd66ffffffffffffff8fcfc7dccccfcbcc77766f8ffccfc7cc67ccf77777671d16cc777cffffffff8cffffcfffcc7cfcbccffffcccccfcfcccbcfffc77cffffc6ccfcb9686666dcfffc69cfff8666666cffbdcccff66cffffccc6cff6fff66666cfcbbcfc7fcc6fcdcffffcc
cffffcfccfcfffcfffc6fffffccddccffcfccfcddeccfcc7ccddfff6cfcc7fcccdcf8cfffffffff8fff88ccdcfcc6cffc67cfdd68fffffffffffffffccfcfffc7dcbcc777666f8ffccfc77f777efff677777e66cc77ccfcdbffffffffffffcfffffccccffffbcffffcbccf7cc8ffbcffffffcbcffcddc86ff888669bfff8696ffffc88fcddcfccf7cfff66f6ffc666f66688666ffffccbdcfcccfccfcc6cfff
fc7ffccccfcffff777ff66cffbdccfff6f6fedbeeccc7ccccfccfffcfcccfccccfcd7f68cfffffffffffff8ccddfc6fc6ffdb68fffffff6cfffffcccfcfcfffffcccc7776cfcffccfc77f6cfcccccfff677777f77fc6cdcf8cffffffffffffddbcfffc7bfffffbbfffcfcfcffff7ccffffcbcffcd666666ffff866669bffff696ffffffbdbfccfdcffcffc6cc666b6fc8c66cfccccdeeffbdbfc7cc66ffccff
fff77fffcffff7777cfffc77d788ffff6ffbbee6fcccfc76fffcffffc7cfccfccccccbbfeccffffffccfffffcccddccccdbc8fffffffffffccffcfccccfcffedfcffc766ffffccfc7cfc7cdbcbdcc6ccffc7777ccbbc7ccffffffffffffcdd6667dbffffcbfffccccffffcff7d6cffffcbcffc19968c668fffc66668c61dcfff69668ffffcddffccffcccf67ccccfccf66fffdcffffc66ccf7dbfc7ccfdffff
fffff6cfffcc7776fffffff88fffffffccfdcccccccbeecfccfffcf6cfc7eecccccccfcb7cccfffffcffffffffc8cbddbcfffffffffffffffcbccccccffffffcfcffccffffccfc7cf66cdddcccb1dcc77effc7cbd77f8f8ffffffffffcdbe67dd767bbcffccccffff8cfffcc6fffffcccffcdd6866966866666f666996c69bcfff666ffff8fcbbef666ccf66cb7f6b6f6cccccfffffffcc6ccfcbbcccccccff
cf8ffccc7777ccfffffcfff8ffffffffcfccb7cff6cfbbccccffccc6cccfcbcc66cfcccccb7efccffffffffffffff888fffffffffffffffffffcbbcccccffffffcffccfffcfc7cc7cccdbdddddddd7ccfc7cffc76cff88fffffffffcbb667bd77dd667bbeffccbcfffcf67cc8fffcbcffcd66668f866996c66666d9668c66699cffffffff8ffccbbcc6cfcf668666cc6cfccffff66666cfcccccfc7becc6fff
fcfccccbb776fffffffff8f8ffffffffcccbbbdcfcfccfbbecccfc6cccc7cfcb66cccf6c6ff7dcfccffffffffffffffffffffffffffffffccffffcbbcfccfffffcffccffff677cccbbcb7d77dd7776fddbcc77cfffffff8ffffffcd7c7d97777766ddd7ccbcfffcbcffffccffcbbffcbd966666fff8c8699666d96c66cfff866d9cffffffffffffcbbcccfcc6666ccc666cffc666777666cfc6cfcfc7bcfccc
ffbcbdd766fffffffffffff8ffffffcccbdcfccbbcfcccfc77ccccbbefccf7fecfccc7f7fccfccdcccfffffffffffffffffffffffffff8ff7ccfffffcbefccfffcff88ffffccc7dbbcf77d77ddd776fcbbbdcffffffff8fffffbdbcff6679d76bd777666fccbbfffcbbfffffbccfcb966998666fcff666669996c6666cffffc66c696ffffffffffffccdbfcccccccccfcf6f66677777776666ffffccff7dcfc
fbddd7c6fffffffcccccffffffffccfcdcfccc7ccbdcffccfc7cfcedef6cbef7ccccfbcccf66cff7dcf8cfffffffffffffffffffcfffccfcfcfc6fffffcbcfccfffff8ffff8ffc7bbbff6677777668ffddcc8ffffffffffffbdcf8cff66666bdb7766688fffccbbfffcbbbbccfcd96688869d66866666669666996c668f6cf8666c699fffffffffffffccdbfccfc6cf7cf67cb77777777768cfcc6cfc6cfcdc
fcb7eeffffffffccccccccffffcfcddefbbccbccccfbdbff77fccfccffcfcfcd7fccfbff7dff6ccf8cdccc8cffffffffffffffffff6cccfccffffc6c8cffcbcfccffffffffffffcfcdbcff8666688fcdcfff8ffffffffffc1bfe7beff8866f67766668c8ffcbcccbbffffcfff9966666ff866696c696699c6cf86966c6666c66c69688fffffffffffffffc7dcccc77ccf866f67d77777666f866f7b76f6fcfc
ffccfffffffcccccccffcccfcfccfcdccbfccccbccbcffdbeccccfccffcccfccfcfcfbccff7dcccccfffdbffccffffffffffdbc8fffcccfffcc6fcccf7ccffcbbfccffffc8ffffcffccdbfffffffc7c8cffffffffffffddcccdccc7ccff88f66668888fffbbeffbbcffffff996866968ffffc8699669d6666cfff66696c696c99668ffffcffffffffffffffccddeffeccfcc6ff67d7ffcffc8fc678bd76ffcc
ffccffffffcccccfcbefffccccffffccdcccccccc7ccccfcddffcfffffcfbfccffc7cbffcccfbb6cccfbccbbcfccfffffffcdccffccffcccfcccccf7cfc76c8fc7bcfccffffffffffffccbbcfcbbccf8ffffffffffcbbccbcffc7cffcbefff68888cffcb7cfcbccfffffcd966699c868ff666688d996886666ffff66c616c99688ffffffccffffffffffffffcfcdbfcc67ffccc8666cfcb66fc686f66cfdbfc
ffccfffffccffcbbffc7cfffffcbcfffcbbbccbccfcbbccbbcfccccfcccf7fcccccfccfccfcccf7c6cccccfcbbcfc8fffffffffc6ccffffc7ccffcffccfffccffffcbcfccfffffffffffccc7dbcfffffffffffffcbbcc76677cffc77cccb7fffffffcb7efcbccfffffbdd6c688c6996866c66c696666966668f686886669968fffffffbbcebcccffffffffffffffcbbeecccccc6cfcc6cccfcd666c6668ccfc
ffffffcccffcbbcfff8cccbfff7ccccfffccbdccbcccebccfffcbbccccffbfcff6bbfbbccccfccccb7cfcff6ffcbee6ffccf8fffff7c6cfffccfff7cfffcccfcccfffcbccccfffffffffffff8fffffffffffffcdbcc667bbc66b7eff7bcfc7bcffcbeecc7c8ffffcbd968666fffc66696666696c6cf866696c66c66666668ffffffcbbffcdcc7bcccffffffffffffccbbccccccfcfcc6cffcfcc7f66ffccffc
cccccccffcbccfff6bcfffccbbfffffccfffccbdccbbccfffffffcbbcc6ccfccf86ccfc77eeccfbdcff7ccccccfcdcfcccccf8ccfc66c8ccccff7cfccc7cff7cffcccffcbbcfcfffffffffffffffffffffffbd7c777776676fbbcb7ffc7bcfc7bbcccb76cffffcb966666666fffc886696996666668ff886996c6669668fffffffbeffc67776fcbbecffffffffffffff67bccc6cccfffffccccfc6cfc7cfccc
fccccffcbefffc66ccffcccffccfffcffbcffffccbccfffffffcfcfcbdcfcccfffcc66ffcbcf7beffccfcccccfbd7cfccfffccfc6cfffc7cfcffccccfccfccfccfff66cffcbbffcfffffffffffffffffffcd7c777767666cbdbecccbbeffcbcffffc7cfffffcd96c6c669686c66666cc696d666666ffc686666699668ffffffcbeebcfcf666667fc7bcf8ffffffffffffcc7bcfccfcc6c6cccf77fcbffc7cfc
ffcff7befffc66f6bccccffbefccbbffffcbbfffffffffffff6fc6cffccbbffccfffffccfcbbcfcfc66fc7ffbbc6cffff6bfffccffccc7fcccfccffc6cfccccffc766ffcffffbdcfcffffffffffffffff77c67c67666ffdbccc7defccbbfffcbbbbcfffffcd966668ff666968c666c966886699c6c8f68668669688ffffffcbccfff77cfff676f7cffcbcfcfffffffffffffccbbfcccdefffccfcccfcccfccf
ffcfbefffc66fcc6cf7cf66fffcf8c7fcfffcdcffffffffccccc677cfcfccdcfc67cc6ccddcfbcf6fff7cfbdcf6ff66ffff7ccfcfc6fccffcc6cc6fcfcdcfc6c66ffcc66ffcfff7dff88fffffffffffffffc6cc77cfcbbbbbfbbccbeeccbbcffffffffffd96c8666cfff88869966996666ff8669d66666669668fffffffcdefc66776fc7cfff66f66ccfc7bccfffffffffffffccbbfcccf7cffffcccfcbcfd1
ffcfbeffb76bccffc888f67766cfc68ccfccfffbccfffc6ffcccfffc7fcfff7bbfc8fcdbffc6fc6ff7cfbd7cfcfcbf66fffffc7cfc6cfffcfffccfcff77eccffcf66fcffb6ffccffcdefccfffffffff8fcfff67cfc7ccccbbecccbccebecf7dcffffffff66699c668f68c66686996c6968ffff86699c869968fffffffbdcfc677777ccfcdddbccbe67cc6fc7becfffffffffffffccdbfccccffccffccccddbe
fcffcb7cfcc6ffcccffc6cf86666cf7cccccffcffcbcfffc6cfffccffc666fffcdb7bbeccfcc6cccccbbcffccccffccf66fffffcccfc6ccccccccccccccfff7ccfcecfccff7ccf6cffcbcff8fffffcc6fcfffcffc7ccfccc7b7ccc7ccccccc67dcffc8ffc88869d6c6666c66996699c8668f8cd686669968ffffffffcdccc677776ffcbd1bbbddff666666cfc7bcfcffffffffffffccdbcccccffccccdd7cdd
ff6ffff7bcfffcf8fcc7ccfffc6ccbcfcc6c7cfffffcbcfcffffcfcfccfc666cffcff6cc6c6cccccbdeeffef7cc7cffcc67cfffffc7cfccfccf77cffccffffccfc7cfffcccfcb6cfffffcbbefffccf8cffffffffcccc7cfccc77776cccc7776ccbd7f88ffff88c6996c6c6696888666668c66666669668ffffffffffcc77bcc66cffcbdb7bdbbbccff66676cfff7dbccffffffffffffccbbcfcccccddccb77f
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
