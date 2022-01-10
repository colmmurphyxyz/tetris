// array used for handling user input, [up, down left, right, space, hold]
let key = [0, 0, 0, 0, 0, 0];
let movePieceDown = false;

function changeKey(which, to) {
    switch (which) {
        case "KeyS":
        case "ArrowDown":
            key[1] = to;
            break;

        case "KeyA":
        case "ArrowLeft":
            key[2] = to;
            break;
            
        case "KeyD":
        case "ArrowRight":
            key[3] = to;
            break;

        case "KeyW":
        case "ArrowUp":
            key[0] = to;
            break;

        case "Space":
            key[4] = to;
            break;
        
        case "KeyC":
            key[5] = to;
            break;
    }
}

function moveActivePieceHorizontal(to) {
            if (collisionCheck(activePiece, to, 0).includes(Collision.LeftWall)
                || collisionCheck(activePiece, to, 0).includes(Collision.RightWall)
                || collisionCheck(activePiece, to, 0).includes(Collision.Block))
            {
                return;
            }
            for (let i = 0; i < activePiece.coordinates.length; i++) {
                activePiece.coordinates[i].x += to
            }
}

function moveActivePieceDown() {
    if (collisionCheck(activePiece, 0, 1).includes(Collision.Floor)
        || collisionCheck(activePiece, 0, 1).includes(Collision.Block))
    {
        console.log("new piece!")

        lockIntoPlace(activePiece);
        activePiece = new Piece();
        return;
    }
    for (let i = 0; i < activePiece.coordinates.length; i++) {
        activePiece.coordinates[i].y += 1;
    }
}

document.addEventListener("keydown", (e) => { changeKey(e.code, 1) } );
document.addEventListener("keyup", (e) => { changeKey(e.code, 0) } );

/**
 * The order in which inputs are handled is important.
 */
function handleInput() {
    if (movePieceDown) {
        moveActivePieceDown();
        movePieceDown = false;
    }
    if (key[0]) { // rotate
        activePiece.rotate()
        key[0] = 0;
    }
    if (key[1] && ticks % 6 === 0) { // down
        moveActivePieceDown();
    }
    if (key[2] && ticks % 6 === 0) { // left
        moveActivePieceHorizontal(-1);
    }
    if (key[3] && ticks % 4 === 0) { // right 
        moveActivePieceHorizontal(1);
    }
    if (key[4]) { // spacebar
        while (!(collisionCheck(activePiece, 0, 1).includes(Collision.Floor)
            || collisionCheck(activePiece, 0, 1).includes(Collision.Block)))
        {
            for (let i = 0; i < activePiece.coordinates.length; i++) {
                activePiece.coordinates[i].y += 1;
            }
        }
        key[4] = 0;
    }
}