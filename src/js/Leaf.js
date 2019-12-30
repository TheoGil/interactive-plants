import mapRange from "./mapRange";

class Leaf {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.ctx = options.ctx;
        this.initialAngle = options.angle;
        this.relativeAngle = 0;
        this.length = options.length;
        this.maxLength = options.maxLength;
        this.thickness = (options.thickness || 20) * mapRange(this.length, 0, this.maxLength, .2, 1);
        this.fill = options.color;
    }

    update(newX, newY, angle) {
        this.x = newX;
        this.y = newY;
        this.relativeAngle = angle;
    }

    render() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.initialAngle + this.relativeAngle)* Math.PI / 180);
        this.ctx.translate(-this.x, -this.y);
        
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.quadraticCurveTo(this.x + this.length / 2, this.y - this.thickness, this.x + this.length, this.y);
        this.ctx.quadraticCurveTo(this.x + this.length / 2, this.y + this.thickness, this.x, this.y);
        this.ctx.fill();

        this.ctx.restore();
    }
}

export default Leaf;