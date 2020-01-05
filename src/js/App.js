
import { Engine, Events, Render, World } from 'matter-js';
import Plant from './plant/Plant';
import Mouse from './Mouse';
import niceColorPalettes from './utils/niceColors';
import pickRandomElementsFromArray from './utils/pickRandomElementsFromArray';

class App {
    constructor() {
        this.engine = null;
        this.render = null;
        this.debugCanvas = null;
        this.canvas = null;
        this.ctx = null;
        this.plants = [];
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

            this.plants.forEach((plant) => {
                plant.update();
                plant.render();
            });
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
        this.plants.forEach((plant) => {
            plant.stem.constraints.forEach((con) => {
                World.remove(this.engine.world, con);
            });

            World.remove(this.engine.world, plant.stem.start);
            World.remove(this.engine.world, plant.stem.end);
            World.remove(this.engine.world, plant.stem.ctrl);
        });
        this.plants = [];
        for (let i = 0; i < 4; i++) {
            this.initColorPalette();
            
            for (let x = 0; x < innerWidth; x += 50 + Math.random() * 50) {
                const garnementsStructure = ['symmetrical', 'alternate', 'random'][Math.floor(Math.random() * 3)];
                const garnementsType = ['leaves', 'berries', 'flowers'];
                const garnementsTypes = pickRandomElementsFromArray(garnementsType, Math.ceil(Math.random() * garnementsType.length));
        
                this.plants.push(new Plant({
                    ctx: this.ctx,
                    x,
                    y: this.canvas.height - 100,
                    XDistance: 40,
                    YDistance: 20 + Math.random() * 60,
                    world: this.engine.world,
                    stemColor: this.palette[1],
                    stemWidth: 2,
                    leavesColor: this.palette[1],
                    leavesLength: 40,
                    leavesThickness: 10,
                    berriesColor: this.palette[2],
                    berriesRadius: 3,
                    flowerColor1: this.palette[3],
                    flowerColor2: this.palette[4],
                    flowerRadius: 5,
                    flowerStrokeWidth: 3,
                    branchesCount: 1 + Math.floor(Math.random() * 5),
                    garnementsStructure,
                    garnementsTypes,
                }));
            }
        }
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