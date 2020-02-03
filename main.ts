interface CursorPosition {
    col: number;
    row: number;
}

const COLUMNS = 8
const ROWS = 3
const pixelKind = SpriteKind.create();
const cursorKind = SpriteKind.create();

const cursorImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . 1 1 . . . . 1 1 . . . .
    . . . 1 . . . . . . . 1 1 . . .
    . . 1 1 . . . . . . . . 1 1 . .
    . . 1 . . . . . . . . . . 1 . .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . . 1 . . . . . . . . . . 1 . .
    . . 1 . . . . . . . . . . 1 . .
    . . . 1 . . . . . . . . 1 . . .
    . . . . 1 1 . . . . 1 1 . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . . . . . . . . . . . . .
`
const tempoSprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . b 5 5 b . . .
    . . . . . . b b b b b b . . . .
    . . . . . b b 5 5 5 5 5 b . . .
    . b b b b b 5 5 5 5 5 5 5 b . .
    . b d 5 b 5 5 5 5 5 5 5 5 b . .
    . . b 5 5 b 5 d 1 f 5 d 4 f . .
    . . b d 5 5 b 1 f f 5 4 4 c . .
    b b d b 5 5 5 d f b 4 4 4 4 b .
    b d d c d 5 5 b 5 4 4 4 4 4 4 b
    c d d d c c b 5 5 5 5 5 5 5 b .
    c b d d d d d 5 5 5 5 5 5 5 b .
    . c d d d d d d 5 5 5 5 5 d b .
    . . c b d d d d d 5 5 5 b b . .
    . . . c c c c c c c c b b . . .
`)
tempoSprite.vx = 30
const columnSprite = sprites.create(image.create(18, 64))
columnSprite.image.drawRect(0, 0, columnSprite.image.width - 1, columnSprite.image.height - 1, 6)
columnSprite.z = -1
const cursorSprites = [sprites.create(cursorImage, cursorKind), sprites.create(cursorImage, cursorKind)] 
cursorSprites[1].setImage(cursorSprites[1].image.clone())
cursorSprites[1].image.replace(1, 5);
for (const sp of cursorSprites) {
    sp.data["pos"] = <CursorPosition>{
        col: 0,
        row: 0
    }
    sp.z = 100
}
const columns: Sprite[][] = []
const redImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 4 4 4 4 . . . . . .
    . . . . 4 4 4 5 5 4 4 4 . . . .
    . . . 3 3 3 3 4 4 4 4 4 4 . . .
    . . 4 3 3 3 3 2 2 2 1 1 4 4 . .
    . . 3 3 3 3 3 2 2 2 1 1 5 4 . .
    . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 .
    . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 .
    . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 .
    . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 .
    . . 4 2 3 3 2 4 4 4 4 4 2 4 . .
    . . 4 2 2 3 2 2 4 4 4 2 4 4 . .
    . . . 4 2 2 2 2 2 2 2 2 4 . . .
    . . . . 4 4 2 2 2 2 4 4 . . . .
    . . . . . . 4 4 4 4 . . . . . .
    . . . . . . . . . . . . . . . .
`
const greenImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 7 7 7 7 . . . . . .
    . . . . 7 7 7 5 5 7 7 7 . . . .
    . . . b b b b 7 7 7 7 7 7 . . .
    . . 7 b b b b 6 6 6 1 1 7 7 . .
    . . b b b b b 6 6 6 1 1 5 7 . .
    . 7 b b b b 6 6 6 6 6 5 5 7 7 .
    . 7 b b b 6 6 6 7 7 7 7 5 7 7 .
    . 7 7 b b 6 6 7 7 7 7 7 7 7 7 .
    . 7 6 b b 6 6 7 7 7 7 7 7 7 7 .
    . . 7 6 b b 6 7 7 7 7 7 6 7 . .
    . . 7 6 6 b 6 6 7 7 7 6 7 7 . .
    . . . 7 6 6 6 6 6 6 6 6 7 . . .
    . . . . 7 7 6 6 6 6 7 7 . . . .
    . . . . . . 7 7 7 7 . . . . . .
    . . . . . . . . . . . . . . . .
`
const blueImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 6 6 6 6 . . . . . .
    . . . . 6 6 6 5 5 6 6 6 . . . .
    . . . 7 7 7 7 6 6 6 6 6 6 . . .
    . . 6 7 7 7 7 8 8 8 1 1 6 6 . .
    . . 7 7 7 7 7 8 8 8 1 1 5 6 . .
    . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 .
    . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 .
    . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 .
    . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 .
    . . 6 8 7 7 8 6 6 6 6 6 8 6 . .
    . . 6 8 8 7 8 8 6 6 6 8 6 6 . .
    . . . 6 8 8 8 8 8 8 8 8 6 . . .
    . . . . 6 6 8 8 8 8 6 6 . . . .
    . . . . . . 6 6 6 6 . . . . . .
    . . . . . . . . . . . . . . . .
`
const offImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . c c c c . . . . . .
    . . . . e f c e e c c c . . . .
    . . . e e e e c c c c c c . . .
    . . e e e f e f f f e e c c . .
    . . e e e e e f f f e e e c . .
    . c e e e e f f f f f e e c c .
    . c e e e f f f c c c c e c c .
    . c c e e f f c c c c c c c c .
    . c e e e f f c c c c c c c c .
    . . c f e e f c c c c c f c . .
    . . c f f e f f c c c f c c . .
    . . . c f f f f f f f f c . . .
    . . . . c c f f f f c c . . . .
    . . . . . . c c c c . . . . . .
    . . . . . . . . . . . . . . . .
`
const colorImages = [redImage, greenImage, blueImage]
const rowEffects = [effects.fire, effects.bubbles, effects.coolRadial];

const MARGINX = 8
const MARGINY = 36
const PADDING = 4
columnSprite.top = MARGINY - 16 / 2 - PADDING
tempoSprite.top = 4;
tempoSprite.left = MARGINX;
for (let ci = 0; ci < COLUMNS; ++ci) {
    const column: Sprite[] = [];
    for (let j = 0; j < colorImages.length; ++j) {
        const c = sprites.create(offImage, pixelKind);
        c.x = MARGINX + ci * (c.width + PADDING)
        c.y = MARGINY + j * (c.width + PADDING)
        column.push(c);
    }
    columns.push(column);
}

game.onUpdate(function () {
    for(const sp of cursorSprites)
        setCursorPosition(sp);
    if (tempoSprite.left > screen.width)
        tempoSprite.right = 0
    tempoSprite.top = 6 + 2 * Math.sin(tempoSprite.x / (16 + PADDING) * 2 * Math.PI)
    for(let i = 0; i < columns.length; ++i) {
        if (Math.abs(columns[i][0].x - tempoSprite.x) < 10) {
            columnSprite.x = columns[i][0].x;
            break;
        }
    }
})

function setCursorPosition(sprite: Sprite) {
    const pos = sprite.data["pos"] as CursorPosition;
    const c = columns[pos.col][pos.row];
    sprite.x = c.x;
    sprite.y = c.y;
}

[controller.player1, controller.player2].forEach((ctrl: controller.Controller, index: number) => {
    ctrl.left.onEvent(ControllerButtonEvent.Pressed, function () {
        const sp = cursorSprites[index];
        if (!sp) return;
        const pos = sp.data["pos"] as CursorPosition;
        pos.col = (pos.col - 1 + columns.length) % columns.length;
    })
    ctrl.right.onEvent(ControllerButtonEvent.Pressed, function () {
        const sp = cursorSprites[index];
        if (!sp) return;
        const pos = sp.data["pos"] as CursorPosition;
        pos.col = (pos.col + 1) % columns.length;
    })
    ctrl.up.onEvent(ControllerButtonEvent.Pressed, function () {
        const sp = cursorSprites[index];
        if (!sp) return;
        const pos = sp.data["pos"] as CursorPosition;
        pos.row = (pos.row - 1 + ROWS) % ROWS;
    })
    ctrl.down.onEvent(ControllerButtonEvent.Pressed, function () {
        const sp = cursorSprites[index];
        if (!sp) return;
        const pos = sp.data["pos"] as CursorPosition;
        pos.row = (pos.row + 1) % ROWS;
    })
    ctrl.A.onEvent(ControllerButtonEvent.Pressed, function () {
        const sp = cursorSprites[index];
        if (!sp) return;
        const pos = sp.data["pos"] as CursorPosition;
        const p = columns[pos.col][pos.row];
        if (p.image == offImage) {
            p.setImage(colorImages[pos.row]);
            rowEffects[pos.row].start(p);
        } else {
            p.setImage(offImage);
            effects.clearParticles(p)
        }
    })
})




