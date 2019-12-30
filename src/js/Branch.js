import getQuadraticCurvePoint from './getQuadraticCurvePoint';
import mapRange from './mapRange';
import Leaf from './Leaf';

class Branch {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.ctx = options.ctx;
        this.position = options.position;
        this.angle = 0;
        this.referenceLeafLength = 100;
        this.garnements = [];
        this.leavesColor = options.leavesColor,

        this.initGarnements();
    }

    update(start, ctrl, end, angle) {
        // Update this branch position based on the stem's curve
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

        // Update the garnements with the new position
        this.garnements.forEach((garnement) => { garnement.update(this.x, this.y, angle); });
    }

    render() {
        this.garnements.forEach((garnement) => { garnement.render(); });
    }

    initGarnements() {
        const leftLeaf = new Leaf({
            x: this.x,
            y: this.y,
            ctx: this.ctx,
            angle: -40,
            length: this.computeLeafLengthBasedOnPosition(),
            maxLength: this.referenceLeafLength,
            color: this.leavesColor,
        });

        this.garnements.push(leftLeaf);

        const rightLeaf = new Leaf({
            x: this.x,
            y: this.y,
            ctx: this.ctx,
            angle: 40,
            length: this.computeLeafLengthBasedOnPosition(),
            maxLength: this.referenceLeafLength,
            color: this.leavesColor,
        });

        this.garnements.push(rightLeaf);
    }

    computeLeafLengthBasedOnPosition() {
        const leafShape = 1.5;
        return this.referenceLeafLength * (1 - Math.pow(Math.abs(mapRange(this.position, 0, 1, -.8, .8)), leafShape));
    }
}

export default Branch;