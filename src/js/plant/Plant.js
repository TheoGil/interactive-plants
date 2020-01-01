import Stem from './Stem.js';
import Branch from './Branch';
import mapRange from '../utils/mapRange';
import getAngle from '../utils/getAngle';

class Plant {
    constructor(options) {
        this.ctx = options.ctx;
        this.x = options.x;
        this.y = options.y;
        this.pointsRadius = options.pointsRadius || 10;
        this.XDistance = options.XDistance || 200;
        this.YDistance = options.YDistance || 200;
        this.world = options.world;
        this.branchesCount = options.branchesCount || 10;
        this.stemColor = options.stemColor;
        this.leavesColor = options.leavesColor;
        this.berriesColor = options.berriesColor;
        this.flowerColor1 = options.flowerColor1;
        this.flowerColor2 = options.flowerColor2;
        this.garnementsStructure = options.garnementsStructure;
        this.garnementsTypes = options.garnementsTypes;
        this.stemWidth = options.stemWidth || 5;
        
        this.stem = null;
        this.branches = null;
        
        this.build();
    }

    build() {
        this.stem = new Stem({
            x: this.x,
            y: this.y,
            ctx: this.ctx,
            pointsRadius: this.pointsRadius,
            XDistance: this.XDistance,
            YDistance: this.YDistance,
            world: this.world,
            color: this.stemColor,
            width: this.stemWidth,
        });


        this.branches = [];
        for (let i = this.branchesCount; i > 0; i--) {
            const position = mapRange(i, 0, this.branchesCount, 0, 1);
            this.branches.push(new Branch({
                x: 0,
                y: 0,
                ctx: this.ctx,
                position,
                branchesCount: this.branchesCount,
                leavesColor: this.leavesColor,
                berriesColor: this.berriesColor,
                flowerColor1: this.flowerColor1,
                flowerColor2: this.flowerColor2,
                garnementsStructure: this.garnementsStructure,
                garnementsTypes: this.garnementsTypes,
                isEven: i % 2 === 0,
                index: i,
                stemWidth: this.stemWidth,
                distance: (this.YDistance * 2) / this.branchesCount,
            }));
        }
    } 

    update() {
    }

    render() {
        this.stem.render();

        this.branches.forEach((branch, i) => {
            // Compute the branche new angle based on the stem's curvature
            const nextPoint = this.branches[i + 1] ? this.branches[i + 1] : { x: this.x, y: this.y };
            const newAngle = getAngle(nextPoint, branch);

            branch.update(this.stem.start.position, this.stem.ctrl.position, this.stem.end.position, newAngle);

            branch.render();
        });
    }
}

export default Plant;