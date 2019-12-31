import getQuadraticCurvePoint from '../utils/getQuadraticCurvePoint';
import mapRange from '../utils/mapRange';
import Leaf from './garnements/Leaf';
import Berry from './garnements/Berry';

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
        this.berriesColor = options.berriesColor,
        this.garnementsStructure = options.garnementsStructure;
        this.garnementsTypes = options.garnementsTypes;
        this.isEven = options.isEven;
        this.index = options.index;
        this.totalBranches = options.branchesCount;
        this.stemWidth = options.stemWidth;

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
        if (this.index == this.totalBranches) {
            this.createSymmetricalGarnements();
            return;
        }

        switch (this.garnementsStructure) {
            case 'symmetrical':
                this.createSymmetricalGarnements();
            break;
            case 'alternate':
                this.createSingleSidedGarnement();
            break;
            case 'random':
                Math.random() > .5 ? this.createSymmetricalGarnements() : this.createSingleSidedGarnement();
            break;
        }
    }

    createSymmetricalGarnements() {
        const garnementType = this.garnementsTypes[Math.floor(Math.random() * this.garnementsTypes.length)];

        switch (garnementType) {
            case 'berries':
                this.garnements.push(new Berry({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: 90,
                    stemWidth: this.stemWidth,
                    fill: this.berriesColor,
                }));
            break;
        }

        /*
        this.garnements.push(new Leaf({
            x: this.x,
            y: this.y,
            ctx: this.ctx,
            angle: -40,
            length: this.computeLeafLengthBasedOnPosition(),
            maxLength: this.referenceLeafLength,
            color: this.leavesColor,
        }));

        this.garnements.push(new Leaf({
            x: this.x,
            y: this.y,
            ctx: this.ctx,
            angle: 40,
            length: this.computeLeafLengthBasedOnPosition(),
            maxLength: this.referenceLeafLength,
            color: this.leavesColor,
        }));
        */
    }

    createSingleSidedGarnement() {
        this.garnements.push(new Leaf({
            x: this.x,
            y: this.y,
            ctx: this.ctx,
            angle: this.isEven ? -40 : 40,
            length: this.computeLeafLengthBasedOnPosition(),
            maxLength: this.referenceLeafLength,
            color: this.leavesColor,
        }));
    }

    computeLeafLengthBasedOnPosition() {
        const leafShape = 1.5;
        return this.referenceLeafLength * (1 - Math.pow(Math.abs(mapRange(this.position, 0, 1, -.8, .8)), leafShape));
    }
}

export default Branch;