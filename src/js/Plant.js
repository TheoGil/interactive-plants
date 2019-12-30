import Stem from './Stem.js';
import Branch from './Branch';
import mapRange from './mapRange';

class Plant {
    constructor(options) {
        this.ctx = options.ctx;
        this.x = options.x;
        this.y = options.y;
        this.pointsRadius = options.pointsRadius || 10;
        this.XDistance = options.XDistance || 200;
        this.YDistance = options.YDistance || 200;
        this.world = options.world;
        this.branchesCount = options.branchesCount || 4;
        
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
            }));
        }
    } 

    update() {
    }

    render() {
        this.stem.render();

        this.branches.forEach((branch, i) => {
            branch.update(this.stem.start.position, this.stem.ctrl.position, this.stem.end.position);
            branch.render();
        });
    }
}

export default Plant;