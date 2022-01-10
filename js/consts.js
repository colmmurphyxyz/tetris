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

/**
 * Returns a piece represented by an array of the __relative__ coordinates of all its squares.
 * You must add or subtract a constant to all the coordinates in this array before drawing to the screen/board
 */
function pieceNumToCoordinates(col) {
    switch (col) {
        case 1: // Z piece
            return [
                c(0, 0), c(0, -1), c(-1, -1), c(1, 0)
            ];
            break;
        case 2: // R piece
            return [
                c(0, 0), c(-1, 0), c(-1, -1), c(1, 0)
            ];
            break;
        case 3: // S piece
            return [
                c(0, 0), c(-1, 0), c(0, -1), c(1, -1)
            ];
            break;
        case 4: // L piece
            return [
                c(0, 0), c(-1, 0), c(1, 0), c(1, -1)
            ];
            break;
        case 5: // I piece
            return [
                c(0, 0), c(-1, 0), c(1, 0), c(-2, 0)
            ];
            break;
        case 6: // O piece
            return [
                c(0, 0), c(0, -1), c(1, 0), c(1, -1)
            ]
            break;
        case 7: // T piece
            return [
                c(0, 0), c(-1, 0), c(0, -1), c(1, 0)
            ]
            break;
        default:
            alert("something has gone awfully wrong");
            break;
    }
}