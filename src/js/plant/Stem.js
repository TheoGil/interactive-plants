import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack.js";
import { Bodies, Constraint, World } from "matter-js";
import getQuadraticCurveLength from "../utils/getQuadraticCurveLength";

class Stem {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.length = null;
    this.dash = {
      offset: 0
    };
    this.pointsRadius = options.pointsRadius;
    this.XDistance = options.XDistance;
    this.YDistance = options.YDistance;
    this.constraints = [];
    this.world = options.world;
    this.ctx = options.ctx;
    this.color = options.color;
    this.width = options.width;

    this.build();

    gsap.to(this.dash, 2, {
      ease: "power2",
      offset: 0
    });
  }

  build() {
    this.start = Bodies.circle(this.x, this.y, this.pointsRadius, {
      isStatic: true
    });

    this.ctrl = this.addPoint(this.start);

    this.end = this.addPoint(this.ctrl);

    World.add(
      this.world,
      [this.start, this.ctrl, this.end, this.constraints].flat()
    );

    this.computeStemLength();
  }

  computeStemLength() {
    this.length = getQuadraticCurveLength(
      this.start.position.x,
      this.start.position.y,
      this.ctrl.position.x,
      this.ctrl.position.y,
      this.end.position.x,
      this.end.position.y
    );

    this.dash.offset = this.length;
  }

  addPoint(previousPoint) {
    const x =
      previousPoint.position.x -
      this.XDistance / 2 +
      Math.random() * this.XDistance;
    const y = previousPoint.position.y - this.YDistance;

    const point = Bodies.circle(x, y, this.pointsRadius, {
      frictionAir: 0.05
    });

    this.constraints.push(
      Constraint.create({
        bodyA: previousPoint,
        bodyB: point,
        stiffness: 1,
        damping: 0.5
      })
    );

    return point;
  }

  render() {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width;
    this.ctx.setLineDash([this.length - this.dash.offset, this.dash.offset]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.start.position.x, this.start.position.y);
    this.ctx.quadraticCurveTo(
      this.ctrl.position.x,
      this.ctrl.position.y,
      this.end.position.x,
      this.end.position.y
    );
    this.ctx.stroke();
    this.ctx.setLineDash([0]);
  }
}

export default Stem;
