import { Bodies, Events, Mouse as MatterMouse, Body, World } from 'matter-js';

class Mouse {
    constructor(options) {
        this.engine = options.engine;

        this.body = Bodies.circle(0, 0, 40, {
            isStatic: true,
        });
        World.add(this.engine.world, [this.body]);

        this.mouse = MatterMouse.create(options.el);

        Events.on(this.engine, 'beforeUpdate', () => {
            Body.setPosition(this.body, {
                x: this.mouse.position.x,
                y: this.mouse.position.y,
            });
        });
    }
}

export default Mouse;