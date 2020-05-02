// Adapted from https://riptutorial.com/fr/html5-canvas/example/18923/longueur-d-une-courbe-quadratique

function getQuadraticCurveLength(x1,y1,x2,y2,x3,y3) {
    // var a, e, c, d, u, a1, e1, c1, d1, u1, v1x, v1y;
    let a = null;
    let e = null;
    let c = null;
    let d = null;
    let u = null;
    let a1 = null;
    let e1 = null;
    let c1 = null;
    let d1 = null;
    let u1 = null;
    let v1x = null;
    let v1y = null;
    let b = null;
    //let c = null;

    v1x = x2 * 2;
    v1y = y2 * 2;
    d = x1 - v1x + x3;
    d1 = y1 - v1y + y3;
    e = v1x - 2 * x1;
    e1 = v1y - 2 * y1;
    c1 = (a = 4 * (d * d + d1 * d1));
    c1 += (b = 4 * (d * e + d1 * e1));
    c1 += (c = e * e + e1 * e1);
    c1 = 2 * Math.sqrt(c1);
    a1 = 2 * a * (u = Math.sqrt(a));
    u1 = b / u;
    a = 4 * c * a - b * b;
    c = 2 * Math.sqrt(c);
    
    return (a1 * c1 + u * b * (c1 - c) + a * Math.log((2 * u + u1 + c1) / (u1 + c))) / (4 * a1);
} 

export default getQuadraticCurveLength;