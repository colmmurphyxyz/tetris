class Collision {
    name;

    constructor(n) {
        this.name = n;
    }

    static Floor = new Collision("floor");
    static LeftWall = new Collision("leftwall");
    static RightWall = new Collision("rightWall");
    static Block = new Collision("block");
    static None = new Collision("none");
}

function collisionCheck(piece) {
    let result = [];
    for (let i = 0; i < piece.coordinates.length; i++) {
        let c = piece.coordinates[i];
        if (c.y == COL_LENGTH - 1)      result.push(Collision.Floor);
        if (board[c.y + 1][c.x] !== 0)  result.push(Collision.Block);
        if (c.x == 0)                   result.push(Collision.LeftWall);
        if (c.x == ROW_LENGTH - 1)      result.push(Collision.RightWal);
    }
    return (result.length === 0) ? [Collision.None] : result;
}

function collisionCheckCoords(coordinates) {
    let result = [];
    for (let i = 1; i < coordinates.length; i++) {
        let c = coordinates[i];
        if (c.y >= COL_LENGTH)  result.push(Collision.Floor);
        if (c.x < 0)            result.push(Collision.LeftWall);
        if (c.x >= ROW_LENGTH)  result.push(Collision.RightWal);
        try {
            if (board[c.y][c.x] !== 0)    result.push(Collision.Block);
        } catch (e) {}
    }
    return (result.length === 0) ? [Collision.None] : result;
}

function collisionCheckCoordsAt(coordinates, deltaX, deltaY) {
    let result = [];
    for (let i = 1; i < coordinates.length; i++) {
        let c = coordinates[i];
        if (c.y + deltaY >= COL_LENGTH)                     result.push(Collision.Floor);
        if (c.x + deltaX < 0)                               result.push(Collision.LeftWall);
        if (c.x  + deltaX >= ROW_LENGTH)                    result.push(Collision.RightWal);
        try {
            if (board[c.y + deltaY][c.x + deltaX] !== 0)    result.push(Collision.Block);
        } catch (e) {}
    }
    return (result.length === 0) ? [Collision.None] : result;
}

function collisionCheck(piece, deltaX, deltaY) {
    let result = [];
    for (let i = 0; i < piece.coordinates.length; i++) {
        let c = piece.coordinates[i];
        if (c.y + deltaY >= COL_LENGTH)                 result.push(Collision.Floor);
        if (c.x + deltaX < 0)                          result.push(Collision.LeftWall);
        if (c.x + deltaX >= ROW_LENGTH)                 result.push(Collision.RightWal);
        if (
            board[c.y + deltaY] !== undefined
            && board[c.y + deltaY][c.x + deltaX] !== undefined
            && board[c.y + deltaY][c.x + deltaX] !== 0
        ) result.push(Collision.Block);
    }
    return (result.length === 0) ? [Collision.None] : result;
}

function collisionCheckVertical(piece, deltaY) {
    let result = [];
    for (let i = 0; i < piece.coordinates.length; i++) {
        const c = piece.coordinates[i];
        if (c.y + deltaY == COL_LENGTH - 1) {
            result.push(Collision.Floor);
            continue;
        }
        if (board[c.y + deltaY] === undefined) {
            continue;
        }
        if (board[c.y + deltaY][c.x] == undefined) {
            continue;
        }
        if (board[c.y + deltaY][c.x] !== 0) {
            result.push(Collision.Block);
        }
    }
    return (result.length === 0) ? [Collision.None] : result
}