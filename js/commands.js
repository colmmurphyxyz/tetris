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
            notify("pieceLockIntoPlace");
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

handlers.push(
    {
        event: "hold",
        callback: () => {
            const temp = activePiece;
            activePiece = holdPiece;
            holdPiece = temp;

            const deltaX = holdPiece.coordinates[0].x - activePiece.coordinates[0].x;
            const deltaY = holdPiece.coordinates[0].y - activePiece.coordinates[0].y;

            for (let i = 0; i < activePiece.coordinates.length; i++) {
                const square = activePiece.coordinates[i];
                activePiece.coordinates[i] = c(square.x + deltaX, square.y + deltaY);
            }
        }
    }
)