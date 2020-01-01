import Garnement from './Garnement';
import circle from '../../utils/circle';

class Flower extends Garnement {
    constructor(options) {
        super(options);
        this.length = options.length;
        this.maxLength = options.maxLength;
        this.radius = options.radius;
        this.stroke = options.stroke;
        this.fill = options.fill;
        this.strokeWidth = options.strokeWidth;;
    }

    render() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.initialAngle + this.relativeAngle) * Math.PI / 180);
        this.ctx.translate(-this.x, -this.y);
        
        // Draw peduncle
        this.strokeStyle = this.stroke;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        if (this.initialAngle < 0) {
            this.ctx.quadraticCurveTo(this.x - this.length, this.y, this.x - this.length, this.y - this.length);
        } else {
            this.ctx.quadraticCurveTo(this.x + this.length, this.y, this.x + this.length, this.y - this.length);
        }
        this.ctx.stroke();

        // Draw flower
        this.ctx.lineWidth = 5;
        this.ctx.strokeWidth = this.strokeWidth;
        if (this.initialAngle < 0) {
            circle(this.ctx, this.x - this.length, this.y - this.length, this.radius, this.fill, this.stroke);
        } else {
            circle(this.ctx, this.x + this.length, this.y - this.length, this.radius, this.fill, this.stroke);
        }

        this.ctx.restore();
    }
}

export default Flower;