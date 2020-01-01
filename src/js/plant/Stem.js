import { Bodies, Constraint, World } from 'matter-js';

class Stem {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.length = options.length;
        this.pointsRadius = options.pointsRadius;
        this.XDistance = options.XDistance;
        this.YDistance = options.YDistance;
        this.constraints = [];
        this.world = options.world;
        this.ctx = options.ctx;
        this.color = options.color;
        this.width = options.width;

        this.build();
    }

    build() {
        this.start = Bodies.circle(this.x, this.y, this.pointsRadius, {
            isStatic: true,
        });
        
        this.ctrl = this.addPoint(this.start);
        
        this.end = this.addPoint(this.ctrl);
        
        World.add(this.world, [
            this.start,
            this.ctrl,
            this.end,
            this.constraints
        ].flat());
    }

    addPoint(previousPoint) {
        const x = previousPoint.position.x - (this.XDistance / 2) + Math.random() * this.XDistance;
        const y = previousPoint.position.y - this.YDistance;

        const point = Bodies.circle(x, y, this.pointsRadius, {
            frictionAir: .05,
        });

        this.constraints.push(Constraint.create({
            bodyA: previousPoint,
            bodyB: point,
            stiffness: 1,
            damping: .5,
        }));

        return point;
    }

    render() {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.position.x, this.start.position.y);
        this.ctx.quadraticCurveTo(
            this.ctrl.position.x,
            this.ctrl.position.y,
            this.end.position.x,
            this.end.position.y
        );
        this.ctx.stroke();
    }
}

export default Stem;