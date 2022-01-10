let board = Array()

for (let i = 0; i < COL_LENGTH; i++) {
    let row = Array()
    for (let j = 0; j < ROW_LENGTH; j++) {
        row.push(0);
    }
    board.push(row);
}

// function drawBoard() {
//     // draw the rest of the board
//     ctx.lineWidth = 2;
//     for (let y = 0; y < COL_LENGTH; y++) {
//         for (let x = 0; x < ROW_LENGTH; x++) {
//             let color = colors.get(board[y][x]);

//             ctx.fillStyle = color;
//             ctx.fillRect(x * 100, y * 100, 100, 100);

//             // draw gridline
//             ctx.fillStyle = "white";
//             ctx.strokeRect(x * 100, y * 100, 100, 100);
//         }
//     }
//     // draw the active piece
//     ctx.fillStyle = colors.get(activePiece.color);
//     for (let i = 0; i < activePiece.coordinates.length; i++) {
//         let c = activePiece.coordinates[i];
//         ctx.fillRect(c.x * 100, c.y * 100, 100, 100);
//     }

//     // draw the next 2 pieces
//     sctx.fillStyle = 'white';
//     sctx.fillRect(0, 0, 500, 2000);
//     for (let i = 0; i < 2; i++) {
//         let nextPieceNum = next2Pieces[i];
//         let nextPiece = pieceNumToCoordinates(nextPieceNum);
//         sctx.fillStyle = colors.get(nextPieceNum);

//         const yOffset = (i === 1) ? 0 : 400;
//         for (let j = 0; j < nextPiece.length; j++) {
//             let c = nextPiece[j]
//             sctx.fillRect(-250 + (c.x * 100), 100 + (c.y * 100) + yOffset, 100, 100);
//         }
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