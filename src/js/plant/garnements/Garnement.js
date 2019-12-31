class Garnement {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.ctx = options.ctx;
        this.initialAngle = options.angle;
        this.relativeAngle = 0;
        this.fill = options.color;
    }

    update(newX, newY, angle) {
        this.x = newX;
        this.y = newY;
        this.relativeAngle = angle;
    }

    render() {
    }
}

export default Garnement;