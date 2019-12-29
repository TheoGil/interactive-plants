import { Bodies, Constraint, World } from 'matter-js';

class Plant {
    constructor(options) {
        this.ctx = options.ctx;
        this.x = options.x;
        this.y = options.y;
        this.length = options.length;
        this.pointsRadius = options.pointsRadius || 10;
        this.XDistance = options.XDistance || 200;
        this.YDistance = options.YDistance || 200;
        this.constraints = [];
        this.world = options.world;
        this.build();
    }

    build() {
        this.startPoint = Bodies.circle(this.x, this.y, this.pointsRadius, {
            isStatic: true,
        });
        
        const ctrlPointX = this.startPoint.position.x - (this.XDistance / 2) + Math.random() * this.XDistance;
        const ctrlPointY = this.startPoint.position.y - this.YDistance;
        this.ctrlPoint = Bodies.circle(ctrlPointX, ctrlPointY, this.pointsRadius, {
            frictionAir: .05,
        });
        this.constraints.push(Constraint.create({
            bodyA: this.startPoint,
            bodyB: this.ctrlPoint,
            stiffness: 0.01,
            damping: .5,
        }));
        
        const endPointX = this.ctrlPoint.position.x - (this.XDistance / 2) + Math.random() * this.XDistance;
        const endPointY = this.ctrlPoint.position.y - this.YDistance;
        this.endPoint = Bodies.circle(endPointX, endPointY, this.pointsRadius, {
            frictionAir: .05,
        });
        this.constraints.push(Constraint.create({
            bodyA: this.ctrlPoint,
            bodyB: this.endPoint,
            stiffness: 0.01,
            damping: .5,
        }));
        
        World.add(this.world, [this.startPoint, this.ctrlPoint, this.endPoint, this.constraints].flat());
    } 

    update() {
        // this.isIdle = this.startPoint.isSleeping && this.ctrlPoint.isSleeping && this.endPoint.isSleeping;
    }

    render() {
        this.ctx.strokeStyle = '#a9ba7b';
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPoint.position.x, this.startPoint.position.y);
        this.ctx.quadraticCurveTo(
            this.ctrlPoint.position.x,
            this.ctrlPoint.position.y,
            this.endPoint.position.x,
            this.endPoint.position.y
        );
        this.ctx.stroke();
    }
}

export default Plant;