let pod = 0;
let col = 0;
input.buttonA.onEvent(ButtonEvent.Click, function () {
    pod = (pod + 1) % 4;
    sendColor()
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    col = (col + 1) % 8;
    sendColor();
})
serial.setBaudRate(BaudRate.BaudRate9600)

function sendColor() {
    light.photonForward(1)
    for (let i = 0; i < 4; ++i) {
        const c = pod | (i << 2) | (col << 4)
        sendByte(c)
        pause(20)
    }
}

function sendByte(b: number) {
    const code = ~(b << 1);
    const buf = control.createBuffer(1)
    buf.setUint8(0, code)
    serial.writeBuffer(buf)
    console.log(`pod ${pod} color ${col} code ${code}`)
}
