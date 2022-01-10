const canvas = document.getElementById("game-main");
const mainCtx = canvas.getContext("2d");

const sideCanvas = document.getElementById("game-side");
const sideCtx = sideCanvas.getContext("2d");

function drawSquare(ctx, x, y, color) {
    ctx.lineWidth = 2;

    ctx.fillStyle = color;
    ctx.fillRect(x * 100, y * 100, 100, 100);

    if (typeof color === 'number') {
        color = colors.get(number);
    }
    
    // if (color === "white")
    ctx.fillStyle = "gray";
    ctx.strokeRect(x * 100, y * 100, 100, 100);
}

function drawBoard() {
    // draw non-active pieces
    mainCtx.lineWidth = 2;
    for (let y = 0; y < COL_LENGTH; y++) {
        for (let x = 0; x < ROW_LENGTH; x++) {
            drawSquare(mainCtx, x, y, colors.get(board[y][x]))
        }
    }
    // draw the active piece
    const activePieceColor = colors.get(activePiece.color);
    for (let square of activePiece.coordinates) {
        drawSquare(mainCtx, square.x, square.y, activePieceColor);
    }
    // for (let i = 0; i < activePiece.coordinates.length; i++) {
    //     let c = activePiece.coordinates[i];
    //     ctx.fillRect(c.x * 100, c.y * 100, 100, 100);
    // }

    // draw the next 2 pieces
    sideCtx.fillStyle = 'white';
    sideCtx.fillRect(0, 0, 500, 2000);
    for (let i = 0; i < 2; i++) {
        let nextPieceNum = next2Pieces[i];
        let nextPiece = pieceNumToCoordinates(nextPieceNum);
        const color = colors.get(nextPieceNum);

        const yOffset = (i === 1) ? 0 : 4;
        for (let coord of nextPiece) {
            drawSquare(sideCtx, coord.x - 2, coord.y + 1 + yOffset, color);
        }
    }
}