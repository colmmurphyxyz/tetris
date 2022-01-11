class Piece {
    coordinates = [];
    color;
    fulcrumCoords;
    constructor() {
        // check if a line is full, and remove all filled lines
        checkLines();

        let col = bag.pop();
        next2Pieces = bag.next(2);
        this.color = col;

        const relativeCoordinates = pieceNumToCoordinates(col);
        for (let coord of relativeCoordinates) {
            this.coordinates.push(c(coord.x + 4, coord.y));
        }

        this.fulcrumCoords = this.coordinates[0];

        // check for collision
        for (let i = 0; i < this.coordinates.length; i++) {
            let c = this.coordinates[i];
            if (c.y < 0 || c.x < 0) break;
            if (board[c.y][c.x] !== 0) {
                gameOver();
            }
        }
    }

    /** DEPRECATED
     * rotate a piece 90 degrees clockwise
     * this function just works, don't try to modify it
     */
    rotate_old() {
        const fulcrumX = this.fulcrumCoords.x;
        const fulcrumY = this.fulcrumCoords.y;
        for (let i = 1; i < this.coordinates.length; i++) {
            let c = this.coordinates[i];
            c = [c.x - fulcrumX, c.y - fulcrumY];
            // rotate each square of the piece 90 degrees clockwise, excluding the fulcrum
            let newCoord = [c[1] * -1, c[0]];
            this.coordinates[i] = new Coord(newCoord[0] + fulcrumX, newCoord[1] + fulcrumY);
        }
    }

    /**
     * rotate a piece 90 degrees clockwise
     * This function will fail silently if a wall or another piece blocks the rotation.
     * this function just works, don't try to modify it
     */
    new_old_rotate() {
        const fulcrumX = this.fulcrumCoords.x;
        const fulcrumY = this.fulcrumCoords.y;
        let newCoords = [this.coordinates[0]];
        for (let i = 1; i < this.coordinates.length; i++) {
            let c = this.coordinates[i];
            c = [c.x - fulcrumX, c.y - fulcrumY];
            // rotate each square of the piece 90 degrees clockwise, excluding the fulcrum
            let newCoord = [c[1] * -1, c[0]];
            newCoords[i] = new Coord(newCoord[0] + fulcrumX, newCoord[1] + fulcrumY);
        }
        if (collisionCheckCoords(newCoords).includes(Collision.None)) {
            this.coordinates = newCoords;
        }
    }

    /**
     * https://i.redd.it/6b7und8rs1v21.png
     */
    rotate() {
        const transform = (coords, deltaX, deltaY) => {
            let newCoords = [];
            for (let coord of coords) {
                newCoords.push(c(coord.x + deltaX, coord.y + deltaY));
            }
            return newCoords;
        }

        const fulcrumX = this.fulcrumCoords.x;
        const fulcrumY = this.fulcrumCoords.y;
        let newCoords = [this.coordinates[0]];
        for (let i = 1; i < this.coordinates.length; i++) {
            let c = this.coordinates[i];
            c = [c.x - fulcrumX, c.y - fulcrumY];
            // rotate each square of the piece 90 degrees clockwise, excluding the fulcrum
            let newCoord = [c[1] * -1, c[0]];
            newCoords[i] = new Coord(newCoord[0] + fulcrumX, newCoord[1] + fulcrumY);
        }

        if (collisionCheckCoords(newCoords).includes(Collision.None)) {
            this.coordinates = newCoords;
            return;
        }

        if (collisionCheckCoordsAt(newCoords, -1, 0).includes(Collision.None)) {
            this.coordinates = transform(newCoords, -1, 0);
            this.fulcrumCoords = this.coordinates[0];
            return;
        }

        if (collisionCheckCoordsAt(newCoords, 1, 0).includes(Collision.None)) {
            this.coordinates = transform(newCoords, 1, 0);
            this.fulcrumCoords = this.coordinates[0];
            return;
        }

        if (collisionCheckCoordsAt(newCoords, 0, 1).includes(Collision.None)) {
            this.coordinates = transform(newCoords, 0, 1);
            this.fulcrumCoords = this.coordinates[0];
            return;
        }
    }
}