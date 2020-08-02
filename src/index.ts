import P5 from "p5";

window.isMatrix = false

const sketch = (p5: P5) => {
    const scale = 10;
    const cols = 120;
    const rows = 90;
    let capture: P5.Element;
    p5.setup = () => {
        p5.createCanvas(cols * scale, rows * scale)
        capture = p5.createCapture(p5.VIDEO);
        capture.size(cols, rows);
        capture.hide()
    };

    p5.draw = () => {
        p5.background(0)
        // TODO : check p5 typing
        capture.loadPixels()

        for (let y = 0; y < capture.height; y++) {
            for (let x = 0; x < capture.width; x++) {
                const index = (capture.width - x + 1 + (y * capture.width)) * 4;
                const r = capture.pixels[index + 0];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                const bright = (r + g + b) / 3;
                const w = p5.map(bright, 0, 255, 0, 255);
                p5.noStroke();
                if (window.isMatrix) {
                    p5.fill(0, 255, 65, w)
                } else {
                    p5.fill(r, g, b);
                }
                p5.textSize(scale);
                p5.text(p5.random() < 0.5 ? '0' : '1', x * scale, y * scale)
            }
        }
    }

};

new P5(sketch);
