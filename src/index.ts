import P5 from "p5";



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

        for (var y = 0; y < capture.height; y++) {
            for (var x = 0; x < capture.width; x++) {
                var index = (capture.width - x + 1 + (y * capture.width)) * 4;
                var r = capture.pixels[index + 0];
                var g = capture.pixels[index + 1];
                var b = capture.pixels[index + 2];
                var bright = (r + g + b) / 3;
                var w = p5.map(bright, 0, 255, 0, scale);
                p5.noStroke();
                p5.fill(r, g, b);
                p5.textSize(scale);
                p5.text(p5.random() < 0.5 ? 0 : 1, x * scale, y * scale)
            }
        }
    }

};

new P5(sketch);
