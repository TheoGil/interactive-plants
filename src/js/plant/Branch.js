import getQuadraticCurvePoint from '../utils/getQuadraticCurvePoint';
import mapRange from '../utils/mapRange';
import Leaf from './garnements/Leaf';
import Berry from './garnements/Berry';
import Flower from './garnements/Flower';

class Branch {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.ctx = options.ctx;
        this.position = options.position;
        this.angle = 0;
        this.referenceLeafLength = options.leavesLength;
        this.garnements = [];
        this.leavesColor = options.leavesColor,
        this.leavesThickness = options.leavesThickness;
        this.berriesColor = options.berriesColor,
        this.berriesRadius = options.berriesRadius,
        this.flowerColor1 = options.flowerColor1,
        this.flowerColor2 = options.flowerColor2,
        this.flowerRadius = options.flowerRadius;
        this.flowerStrokeWidth = options.flowerStrokeWidth;
        this.garnementsStructure = options.garnementsStructure;
        this.garnementsTypes = options.garnementsTypes;
        this.isEven = options.isEven;
        this.index = options.index;
        this.totalBranches = options.branchesCount;
        this.stemWidth = options.stemWidth;
        this.distance = options.distance;

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
                    radius: this.berriesRadius,
                }));
                this.garnements.push(new Berry({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: -90,
                    stemWidth: this.stemWidth,
                    fill: this.berriesColor,
                    radius: this.berriesRadius,
                }));
            break;
            case 'leaves':
                this.garnements.push(new Leaf({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: -40,
                    length: this.computeLeafLengthBasedOnPosition(),
                    maxLength: this.referenceLeafLength,
                    thickness: this.leavesThickness,
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
                    thickness: this.leavesThickness,
                }));
            break;
            case 'flowers':
                this.garnements.push(new Flower({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: 90,
                    length: this.computeLeafLengthBasedOnPosition(),
                    maxLength: this.referenceLeafLength,
                    stroke: this.flowerColor1,
                    fill: this.flowerColor2,
                    radius: this.flowerRadius,
                    strokeWidth: this.flowerRadius,
                }));
                this.garnements.push(new Flower({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: -270,
                    length: this.computeLeafLengthBasedOnPosition(),
                    maxLength: this.referenceLeafLength,
                    stroke: this.flowerColor1,
                    fill: this.flowerColor2,
                    radius: this.flowerRadius,
                    strokeWidth: this.flowerRadius,
                }));
            break;
        }
    }

    createSingleSidedGarnement(side) {
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
                    radius: this.berriesRadius,
                }));
            break;
            case 'leaves':
                this.garnements.push(new Leaf({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: this.isEven ? -40 : 40,
                    length: this.computeLeafLengthBasedOnPosition(),
                    maxLength: this.referenceLeafLength,
                    color: this.leavesColor,
                    thickness: this.leavesThickness,
                }));
            break;
            case 'flowers':
                this.garnements.push(new Flower({
                    x: this.x,
                    y: this.y,
                    ctx: this.ctx,
                    angle: this.isEven ? -270 : 90,
                    length: this.computeLeafLengthBasedOnPosition(),
                    maxLength: this.referenceLeafLength,
                    stroke: this.flowerColor1,
                    fill: this.flowerColor2,
                    radius: this.flowerRadius,
                    strokeWidth: this.flowerRadius,
                }));
            break;
        }
    }

    computeLeafLengthBasedOnPosition() {
        const leafShape = 1.5;
        return this.referenceLeafLength * (1 - Math.pow(Math.abs(mapRange(this.position, 0, 1, -.8, .8)), leafShape));
    }
}

export default Branch;