function circle(ctx, x, y, r, color, fill) {
    fill ? ctx.fillStyle = color : ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    fill ? ctx.fill() : ctx.stroke();
}

export default circle;