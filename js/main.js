const canvas = document.getElementById("game-main");
const ctx = canvas.getContext("2d");

const sideCanvas = document.getElementById("game-side");
const sctx = sideCanvas.getContext("2d");

const queue = new Queue();

let ticks = 0
let activePiece = new Piece();

var next2Pieces = bag.next(2);

function drawBoard() {
    // draw the rest of the board
    ctx.lineWidth = 2;
    for (let y = 0; y < COL_LENGTH; y++) {
        for (let x = 0; x < ROW_LENGTH; x++) {
            let color = colors.get(board[y][x]);

            ctx.fillStyle = color;
            ctx.fillRect(x * 100, y * 100, 100, 100);

            // draw gridline
            ctx.fillStyle = "white";
            ctx.strokeRect(x * 100, y * 100, 100, 100);
        }
    }
    // draw the active piece
    ctx.fillStyle = colors.get(activePiece.color);
    for (let i = 0; i < activePiece.coordinates.length; i++) {
        let c = activePiece.coordinates[i];
        ctx.fillRect(c.x * 100, c.y * 100, 100, 100);
    }

    // draw the next 2 pieces
    sctx.fillStyle = 'white';
    sctx.fillRect(0, 0, 500, 2000);
    for (let i = 0; i < 2; i++) {
        let nextPieceNum = next2Pieces[i];
        let nextPiece = pieceNumToCoordinates(nextPieceNum);
        sctx.fillStyle = colors.get(nextPieceNum);

        const yOffset = (i === 1) ? 0 : 400;
        for (let j = 0; j < nextPiece.length; j++) {
            let c = nextPiece[j]
            sctx.fillRect(-250 + (c.x * 100), 100 + (c.y * 100) + yOffset, 100, 100);
        }
    }
}

function gameplayLoop() {
    if (ticks % 30 === 0) movePieceDown = true;
    if (++ticks >= 60) {
        ticks = 0;
    }

    handleInput();
}

let gameLoopIntervalID;
let drawBoardIntervalID;

function gameOver() {
    console.log("Game Over")
    clearInterval(gameLoopIntervalID);
    clearInterval(drawBoardIntervalID);
}

function main() {
    gameLoopIntervalID = setInterval( () => { gameplayLoop() }, 16.67 );
    drawBoardIntervalID = setInterval( drawBoard, 16.17);
}

main();