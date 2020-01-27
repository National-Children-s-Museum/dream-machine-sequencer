namespace dreamMachine {
    const PAUSE_PER_BYTE = 5
    const PAUSE_PER_UPDATE = 1000
    const BAUD_RATE = BaudRate.BaudRate9600

    enum Channel {
        Intensity,
        Red,
        Green,
        Blue
    }

    class Pod {
        index: number;
        pixelIndex: number;
        pixels: light.NeoPixelStrip;
        constructor(index: number, pixelIndex: number, pixels: light.NeoPixelStrip) {
            this.index = index;
            this.pixelIndex = pixelIndex;
            this.pixels = pixels;
        }

        private encode(channel: number, value: number) {
            const c = this.index
                | (channel << 2)
                | ((value >> 4) << 4);
            return c;
        }

        update() {
            // compute
            const brightness = this.pixels.brightness();
            const color = this.pixels.pixelColor(this.pixelIndex);

            this.sendByte(this.encode(Channel.Intensity, brightness & 0xff));
            this.sendByte(this.encode(Channel.Red, color & 0xff));
            this.sendByte(this.encode(Channel.Green, (color >> 8) & 0xff));
            this.sendByte(this.encode(Channel.Blue, (color >> 16) & 0xff));
        }

        private sendByte(b: number) {
            const code = ~(b << 1);
            const buf = control.createBuffer(1)
            buf.setUint8(0, code)
            serial.writeBuffer(buf)
            pause(PAUSE_PER_BYTE)
        }
    }

    let pods: Pod[];
    function init() {
        serial.setBaudRate(BAUD_RATE)
        pods = [
            new Pod(0, 0, light.pixels.range(0, 2)),
            new Pod(1, 4, light.pixels.range(3, 2)),
            new Pod(2, 5, light.pixels.range(5, 2)),
            new Pod(3, 9, light.pixels.range(8, 2))
        ]
        setInterval(update, PAUSE_PER_UPDATE)
    }

    function update() {
        for(const pod of pods)
            pod.update();
    }

    init();
}

