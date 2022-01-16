class Move {
    deltaX;
    deltaY;
    constructor(deltaX, deltaY) {
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
    execute() {
        const col = collisionCheck(activePiece, this.deltaX, this.deltaY);
        if (col.includes(Collision.Block) || col.includes(Collision.Floor)) {
            lockIntoPlace(activePiece);
            // notify listeners
            activePiece = new Piece();
            return;
        }
        if (!col.includes(Collision.None)) return;
        for (let i = 0; i < activePiece.coordinates.length; i++) {
            let oldCoords = activePiece.coordinates[i];
            activePiece.coordinates[i] = c(oldCoords.x + this.deltaX, oldCoords.y + this.deltaY);
        }
    }
    undo() {
        for (let i = 0; i < activePiece.coordinates.length; i++) {
            let oldCoords = activePiece.coordinates[i];
            activePiece.coordinates[i] = c(oldCoords.x - this.deltaX, oldCoords.y - this.deltaY);
        }
    }
}