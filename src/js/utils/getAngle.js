// Returns the angle in degrees between two points
// a: { x: x, y: y }
// b: { x: x, y: y }
function getAngle(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}

export default getAngle;
