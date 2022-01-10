const canvas = document.getElementById("game-main");
const mainCtx = canvas.getContext("2d");

const sideCanvas = document.getElementById("game-side");
const sideCtx = sideCanvas.getContext("2d");

const gridlineColor = "gray";

function drawGridline(ctx, x, y, color) {
    ctx.fillStyle = (color) ? ((typeof color === 'number') ? colors.get(color) : color) : gridlineColor;
    ctx.strokeRect(x * 100, y * 100, 100, 100);
}

function drawSquare(ctx, x, y, color) {
    ctx.lineWidth = 2;

    ctx.fillStyle = color;
    ctx.fillRect(x * 100, y * 100, 100, 100);

    if (typeof color === 'number') {
        color = colors.get(number);
    }
    
    drawGridline(ctx, x, y);
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

    // draw the next 2 pieces
    sideCtx.fillStyle = 'white';
    sideCtx.fillRect(0, 0, 500, 2000);
    for (let i = 0; i < 2; i++) {
        let nextPieceNum = next2Pieces[i];
        let nextPiece = pieceNumToCoordinates(nextPieceNum);
        const color = colors.get(nextPieceNum);

        const yOffset = (i === 1) ? 0 : 4;
        for (let coord of nextPiece) {
            drawSquare(sideCtx, coord.x + 2, coord.y + 2 + yOffset, color);
        }
    }
}