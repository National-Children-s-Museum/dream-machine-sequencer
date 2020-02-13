game.consoleOverlay.setVisible(true)
interface CursorPosition {
    col: number;
    row: number;
}
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
    . . . 8 8 8 8 6 6 6 6 6 6 . . .
    . . 6 8 8 8 8 8 8 8 1 1 6 6 . .
    . . 8 8 8 8 8 8 8 8 1 1 5 6 . .
    . 6 8 8 8 8 8 8 8 8 8 5 5 6 6 .
    . 6 8 8 8 8 8 8 6 6 6 6 5 6 6 .
    . 6 6 8 8 8 8 6 6 6 6 6 6 6 6 .
    . 6 8 8 8 8 8 6 6 6 6 6 6 6 6 .
    . . 6 8 8 8 8 6 6 6 6 6 8 6 . .
    . . 6 8 8 8 8 8 6 6 6 8 6 6 . .
    . . . 6 8 8 8 8 8 8 8 8 6 . . .
    . . . . 6 6 8 8 8 8 6 6 . . . .
    . . . . . . 6 6 6 6 . . . . . .
    . . . . . . . . . . . . . . . .
`
const brightImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . d d d d . . . . . .
    . . . . d d d 4 4 d d d . . . .
    . . . 5 5 5 5 d d d d d d . . .
    . . d 5 5 5 5 5 5 5 1 1 d d . .
    . . 5 5 5 5 5 5 5 5 1 1 4 d . .
    . d 5 5 5 5 5 5 5 5 5 4 4 d d .
    . d 5 5 5 5 5 5 d d d d 4 d d .
    . d d 5 5 5 5 d d d d d d d d .
    . d 5 5 5 5 5 d d d d d d d d .
    . . d 5 5 5 5 d d d d d 4 d . .
    . . d 5 5 5 5 5 d d d 5 d d . .
    . . . d 5 5 5 5 5 5 5 5 d . . .
    . . . . d d 5 5 5 5 d d . . . .
    . . . . . . d d d d . . . . . .
    . . . . . . . . . . . . . . . .
`
const offImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . c c c c . . . . . .
    . . . . c c c f f c c c . . . .
    . . . c f f f f f c c c c . . .
    . . c f f f f f f f f f c c . .
    . . c f f f f f f f f f f c . .
    . c f f f f f f f f f f f c c .
    . c f f f f f f f f f c f c c .
    . c c f f f f f f f f c f c c .
    . c f f f f f f f f f c f c c .
    . . c f f f f f f f c c f c . .
    . . c f f f f f c c c f c c . .
    . . . c f f f f f f f f c . . .
    . . . . c c f f f f c c . . . .
    . . . . . . c c c c . . . . . .
    . . . . . . . . . . . . . . . .
`
const cursorImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . 1 1 1 . . 1 1 1 . . . .
    . . . 1 1 . . . . . . 1 1 . . .
    . . 1 1 . . . . . . . . 1 1 . .
    . . 1 . . . . . . . . . . 1 . .
    . 1 1 . . . . . . . . . . 1 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 1 . . . . . . . . . . . 1 .
    . . 1 . . . . . . . . . . 1 . .
    . . 1 1 . . . . . . . . . 1 . .
    . . . 1 . . . . . . . 1 1 . . .
    . . . . 1 1 1 . . . 1 1 . . . .
    . . . . . . 1 1 1 1 . . . . . .
    . . . . . . . . . . . . . . . .
`
const tempoImage = img`
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
`

const colorImages = [
    redImage,
    greenImage,
    blueImage,
    brightImage
]
const rowEffects = [
    effects.fire,
    effects.bubbles,
    effects.coolRadial,
    effects.fire
];


function gamer() {
    const MARGINX = 8;
    const MARGINY = 40;
    const PADDING_X = 4;
    const PADDING_Y = 2;
    const COLUMNS = 8;
    const ROWS = 3;
    const CURSOR_WIDTH = 16 + 2;
    const CURSOR_HEIGHT = (ROWS + 1) * (16 + PADDING_Y) + 2 * PADDING_Y;
    const TEMPO_SPEED = 30;
    const MOSAIC_INTERVAL = ((CURSOR_WIDTH + PADDING_X) / 30 * 1000) | 0
    const LOW_BRIGHTNESS = 0x40;
    const HIGHT_BRIGTNESS = 0x60;
    const pixelKind = SpriteKind.create();
    const cursorKind = SpriteKind.create();

    const tempoSprite = sprites.create(tempoImage)
    tempoSprite.vx = TEMPO_SPEED
    const columnSprite = sprites.create(image.create(CURSOR_WIDTH, CURSOR_HEIGHT))
    columnSprite.image.drawRect(0, 0, columnSprite.image.width - 1, columnSprite.image.height - 1, 6)
    columnSprite.z = -1
    const cursorSprites = [
        sprites.create(cursorImage, cursorKind), 
        sprites.create(cursorImage, cursorKind)
    ];
    cursorSprites[1].setImage(cursorSprites[1].image.clone())
    cursorSprites[1].image.replace(1, 5);
    cursorSprites.forEach((sp: Sprite, index: number) => {
        sp.z = 100 - index
        sp.say("P" + (index+ 1), Infinity)
        sp.data["pos"] = <CursorPosition>{
            col: (COLUMNS / 2 + index) | 0,
            row: (colorImages.length / 2)
        }
    })
    cursorSprites[0].data["note"] = Note.A;
    cursorSprites[1].data["note"] = Note.B;
    const columns: Sprite[][] = []

    columnSprite.top = MARGINY - 16 / 2 - PADDING_Y + 1
    tempoSprite.top = 4;
    tempoSprite.left = MARGINX;
    for (let ci = 0; ci < COLUMNS; ++ci) {
        const column: Sprite[] = [];
        for (let j = 0; j < colorImages.length; ++j) {
            const c = sprites.create(offImage, pixelKind);
            c.x = MARGINX + ci * (c.width + PADDING_X)
            c.y = MARGINY + j * (c.width + PADDING_Y)
            column.push(c);
            c.z = -1
        }
        columns.push(column);
    }

    const togglePixel = (col: number, row: number) => {
        const p = columns[col][row];
        const off = p.image == offImage;
        if (off) {
            p.setImage(colorImages[row]);
            rowEffects[row].start(p, 500)
        } else {
            p.setImage(offImage);
            effects.clearParticles(p)
        }
    };   

    let k = 0;
    for (let i = 0; i < columns.length; ++i) {
        for (let j = 0; j < ROWS; ++j) {
            if (i % 2 == 0 && j == k) {
                togglePixel(i, j)
            }
        }
        if (i % 2 == 0)
            k = (k + 1) % ROWS;
    }    

    const setCursorPosition = (sprite: Sprite) => {
        const pos = sprite.data["pos"] as CursorPosition;
        const c = columns[pos.col][pos.row];
        sprite.x = c.x;
        sprite.y = c.y;
    };

    game.onUpdate(() => {
        for (const sp of cursorSprites)
            setCursorPosition(sp);
        if (tempoSprite.left > screen.width)
            tempoSprite.right = 0
        tempoSprite.top = 6 + 2 * Math.sin(tempoSprite.x / (16 + PADDING_X) * 2 * Math.PI)
        for (let i = 0; i < columns.length; ++i) {
            const column = columns[i];
            if (Math.abs(column[0].x - tempoSprite.x) < 10) {
                const x = column[0].x;
                const changed = columnSprite.x != x;
                columnSprite.x = x;
                if (changed) {
                    // send color to mosaic
                    let c = 0;
                    for(let k = 0; k < ROWS; ++k) {
                        if (column[k].image != offImage)
                            c |= (0x70 << (8 * (ROWS - 1- k)));
                    }
                    dreamMachine.pod0.setColor(c);
                    // send brightness
                    let b = LOW_BRIGHTNESS;
                    if (column[ROWS].image != offImage)
                        b = HIGHT_BRIGTNESS;
                    dreamMachine.pod0.setBrightness(b);
                }
                break;
            }
        }
    })

    const ct = (ctrl: controller.Controller, index: number) => {
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
            pos.row = (pos.row - 1 + colorImages.length) % colorImages.length;
        })
        ctrl.down.onEvent(ControllerButtonEvent.Pressed, function () {
            const sp = cursorSprites[index];
            if (!sp) return;
            const pos = sp.data["pos"] as CursorPosition;
            pos.row = (pos.row + 1) % colorImages.length;
        })
        ctrl.A.onEvent(ControllerButtonEvent.Pressed, function () {
            const sp = cursorSprites[index];
            if (!sp) return;
            const pos = sp.data["pos"] as CursorPosition;
            const note = sp.data["note"] as Note;
            togglePixel(pos.col, pos.row);
            music.playTone(note, 20)
        })
    }

    [controller.player1, controller.player2].forEach((ctrl, index) => ct(ctrl, index));

    dreamMachine.setUpdateInterval(MOSAIC_INTERVAL)

    //dreamMachine.debug = true
    //dreamMachine.setUpdateInterval(5000)
}

storyboard.microsoftBootSequence.register();
storyboard.registerScene("home", gamer);
storyboard.start();
