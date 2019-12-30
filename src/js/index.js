import App from './App';
import '../scss/index.scss';

const app = new App();
app.run();

document.querySelector('#rerun').addEventListener('click', () => {
    app.initColorPalette();
    app.initPlant();
});