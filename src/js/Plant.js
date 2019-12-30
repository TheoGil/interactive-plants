import Stem from './Stem.js';
import Branch from './Branch';
import mapRange from './mapRange';
import getAngle from './getAngle';

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
        this.color = options.color || '#a9ba7b';
        
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
            color: this.color,
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
                leavesColor: this.color,
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