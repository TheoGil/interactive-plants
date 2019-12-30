// Get point alongside a quadratic curve
// Credit: https://stackoverflow.com/a/9195706
function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
    return {
        x:  getQBezierValue(position, startX, cpX, endX),
        y:  getQBezierValue(position, startY, cpY, endY)
    };
}

function getQBezierValue(t, p1, p2, p3) {
    var iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}

export default getQuadraticCurvePoint;