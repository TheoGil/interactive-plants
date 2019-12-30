
import { Engine, Events, Render } from 'matter-js';
import Plant from './Plant';
import Mouse from './Mouse';
import niceColorPalettes from './niceColors';

class App {
    constructor() {
        this.engine = null;
        this.render = null;
        this.debugCanvas = null;
        this.canvas = null;
        this.ctx = null;
        this.plant = null;
        this.palette = null;

        this.initColorPalette();
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
            this.ctx.fillStyle = this.palette[0];
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

        this.initPlant();
    }

    initColorPalette() {
        this.palette = niceColorPalettes[Math.floor(Math.random() * niceColorPalettes.length)];
    }

    initPlant() {
        this.plant = new Plant({
            ctx: this.ctx,
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            XDistance: 400,
            YDistance: 200,
            world: this.engine.world,
            color: this.palette[1],
            branchesCount: 3 + Math.floor(Math.random() * 10),
        });
    }

    fitCanvasToWindow() {
        this.canvas.width = this.debugCanvas.width = window.innerWidth;
        this.canvas.height = this.debugCanvas.height = window.innerHeight;
    }

    run() {
        Engine.run(this.engine);
        // Render.run(this.render);
    }
}

export default App;