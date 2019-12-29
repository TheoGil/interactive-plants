
import { Engine, Events, Render } from 'matter-js';
import Plant from './Plant';
import Mouse from './Mouse';

class App {
    constructor() {
        this.engine = null;
        this.render = null;
        this.debugCanvas = null;
        this.canvas = null;
        this.ctx = null;
        this.plant = null;

        this.initPhysics();
        this.initGraphics();
        this.initComponents();
    }

    initPhysics() {
        this.engine = Engine.create();
        this.engine.world.gravity.scale = 0;
    }

    initGraphics() {
        this.debugCanvas = document.querySelector('#debug');
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');

        this.render = Render.create({
            canvas: this.debugCanvas,
            engine: this.engine,
        });

        Events.on(this.engine, 'afterUpdate', () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.plant.update();
            this.plant.render();
        });

        this.fitCanvasToWindow();
    }

    initComponents() {
        new Mouse({ 
            engine: this.engine,
            el: this.canvas,
        });

        this.plant = new Plant({
            ctx: this.ctx,
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            length: 250,
            XDistance: 400,
            YDistance: 200,
            world: this.engine.world,
        });
    }

    fitCanvasToWindow() {
        this.canvas.width = this.debugCanvas.width = window.innerWidth;
        this.canvas.height = this.debugCanvas.height = window.innerHeight;
    }

    run() {
        Engine.run(this.engine);
        Render.run(this.render);
    }
}

export default App;