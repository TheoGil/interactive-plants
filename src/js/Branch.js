import getQuadraticCurvePoint from './getQuadraticCurvePoint';
import mapRange from './mapRange';

// Returns the angle in degrees between two points
// a: { x: x, y: y }
// b: { x: x, y: y }
function getAngle(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}

class Branch {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.ctx = options.ctx;
        this.position = options.position;

        // Use a parametric function to compute the length of the vein
        const leafShape = 1; // Tweeak this value to change the shape of the leaf
        const position = mapRange(this.position, 0, 1, -.9, .9);
        this.leafLengthMultiplier =  Math.pow(Math.cos(Math.PI * position / 2), leafShape);

        this.veinAngle = 130;
        this.leafLength = 100 * this.leafLengthMultiplier;
    }

    update(start, ctrl, end) {
        const point = getQuadraticCurvePoint(
            start.x,
            start.y,
            ctrl.x,
            ctrl.y,
            end.x,
            end.y,
            this.position
        );
        this.x = point.x;
        this.y = point.y;
    }

    render() {
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

export default Branch;