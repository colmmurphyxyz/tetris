let board = Array()

for (let i = 0; i < COL_LENGTH; i++) {
    let row = Array()
    for (let j = 0; j < ROW_LENGTH; j++) {
        row.push(0);
    }
    board.push(row);
}

// function lockIntoPlace(piece) {
//     if (c.y < 0 || c.x < 0) gameOver();
//     for (let i = 0; i < piece.coordinates.length; i++) {
//         let c = piece.coordinates[i];
//         board[c.y][c.x] = piece.color;
//     }
// }

function checkLines() {
    for (let row = 0; row < COL_LENGTH; row++) {
        let isCleared = true;
        for (let i = 0; i < ROW_LENGTH; i++) {
            if (board[row][i] == 0) {
                isCleared = false;
                break;
            }
        }
        if (isCleared) {
            for (let i = 0; i < ROW_LENGTH; i++) {
                for (let j = row; j > 0; j--) {
                    board[j][i] = board[j - 1][i];
                }
                board[0][i] = 0;
            }
        }
    }
}

handlers.push(
    {
        event: "pieceLockIntoPlace",
        callback: () => {
            if (c.y < 0 || c.x < 0) notify("gameOver");
            for (let i = 0; i < activePiece.coordinates.length; i++) {
                let c = activePiece.coordinates[i];
                board[c.y][c.x] = activePiece.color;
            }
            checkLines();
            activePiece = new Piece();
        }
    }
)