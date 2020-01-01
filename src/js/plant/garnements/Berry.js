import Garnement from './Garnement';
import circle from '../../utils/circle';

class Berry extends Garnement {
    constructor(options) {
        super(options);
        this.radius = options.radius;
        this.stemWidth = options.stemWidth;
        this.fill = options.fill;
    }

    update(newX, newY, angle) {
        super.update(newX, newY, angle);
    }

    render() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((this.initialAngle + this.relativeAngle) * Math.PI / 180);
        this.ctx.translate(-this.x, -this.y);

        circle(this.ctx, this.x + this.stemWidth + (this.radius / 2), this.y, this.radius, this.fill, true);

        this.ctx.restore();
    }
}

export default Berry;