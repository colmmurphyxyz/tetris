const ROW_LENGTH = 10;
const COL_LENGTH = 20;

const colors = new Map()
colors.set(0, "white");
colors.set(1, "red");
colors.set(2, "blue");
colors.set(3, "green");
colors.set(4, "orange");
colors.set(5, "cyan");
colors.set(6, "yellow");
colors.set(7, "purple");

const c = (x, y) => new Coord(x, y)

// const pieceCoordinates = [
//     { // square piece
//         color: 6,    // yellow
//         initialCoords: [
//             c(4, 1), c(4, 0), c(5, 1), c(5, 0)
//         ]
//     },
//     { // L piece
//         color: 4,    // orange
//         initialCoords: [
//             c(4, 1), c(4, 0), c(4, 2), c(5, 2)
//         ]
//     },
//     { // r piece
//         color: 2,   // blue
//         initialCoords: [
//             c(4, 1), c(4, 0), c(4, 2), c(5, 0)
//         ]
//     },
//     { // s piece
//         color: 3,   // green
//         initialCoords: [
//             c(4, 1), c(5, 1), c(5, 0), c(6, 0)
//         ]
//     }
// ];