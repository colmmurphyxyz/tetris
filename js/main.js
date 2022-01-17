const queue = new Queue();

let ticks = 0
let activePiece = new Piece();
let holdPiece = new Piece();

var next2Pieces = bag.next(2);

function gameplayLoop() {
    if (ticks % 30 === 0) movePieceDown = true;
    if (++ticks >= 60) {
        ticks = 0;
    }

    handleInput();
}

let gameLoopIntervalID;
let drawBoardIntervalID;

handlers.push(
    {
        event: "gameOver",
        callback: () => {
            console.log("Game Over")
            clearInterval(gameLoopIntervalID);
            clearInterval(drawBoardIntervalID);
        }
    }
)

function main() {
    gameLoopIntervalID = setInterval( () => { gameplayLoop() }, 16.67 );
    drawBoardIntervalID = setInterval( drawBoard, 16.17);
}

main();