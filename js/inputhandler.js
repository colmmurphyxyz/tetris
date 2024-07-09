// array used for handling user input, [up, down left, right, space, hold, undo]
let key = [0, 0, 0, 0, 0, 0, 0];
/*
to debounce the horizontal keys, we must ensure a piece is not moved in one direction less than `keyDebounceTime_ms`
later than the last time it was moved in that direction.
This is achieved using a Map, where the time a piece was last moved in a direction is saved under they key "left" or "right"
*/
const keyDebounceTime_ms = 120;
// set initial values to -1, this will be overwritten soon
let keyDebouncer = new Map([
    ["left", -1],
    ["right", -1],
    ["up", -1],
    ["down", -1],
]);

// predicate to check if a key satisfies the debouncer
// i.e return true if more than `keyDebounceTime_ms` ms has elapsed since the key's handler was last executed
/**
 * 
 * @param {string} key key identifier e.g "left", "up"
 * @returns {boolean} true if more than keyDebounceTime_ms has elapsed
 */
function checkDebouncer(key) {
    const currentTime = Date.now();
    if (currentTime - keyDebouncer.get(key) < keyDebounceTime_ms) {
        return false;
    }
    keyDebouncer.set(key, currentTime);
    return true
}

let movePieceDown = false;

let ticksOnGround = 0;

const ticksOnGroundThreshold = 2;

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

        case "KeyX":
            key[6] = to;
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
        activePiece.coordinates[i].x += to;
    }
}

function moveActivePieceDown() {
    if (!collisionCheckVertical(activePiece, 1).includes(Collision.None)) {
        if (++ticksOnGround < ticksOnGroundThreshold) {
            return;
        }
        ticksOnGround = 0;
        console.log("new piece")
        lockIntoPlace(activePiece);
        activePiece = new Piece();
        return;
    }
    for (let i = 0; i < activePiece.coordinates.length; i++) {
        activePiece.coordinates[i].y += 1;
    }
}

function holdActivePiece() {
    const temp = activePiece;
    const fulcrumCoords = activePiece.fulcrumCoords;
    if (holdPiece === undefined) holdPiece = new Piece();
    const deltaX = fulcrumCoords.x - holdPiece.coordinates[0].x;
    const deltaY = fulcrumCoords.y - holdPiece.coordinates[0].y;
    for (let i = 0; i < holdPiece.coordinates.length; i++) {
        const square = holdPiece.coordinates[i];
        holdPiece.coordinates[i] = c(square.x + deltaX, square.y + deltaY);
    }
    activePiece = holdPiece;
    holdPiece = temp;
}

document.addEventListener("keydown", (e) => { changeKey(e.code, 1) } );
document.addEventListener("keyup", (e) => { changeKey(e.code, 0) } );

/**
 * The order in which inputs are handled is important.
 */
function handleInput() {
    if (movePieceDown) {
        new Move(0, 1).execute();
        movePieceDown = false;
    }
    if (key[0]) { // rotate
        const currentTime = Date.now();
        if (currentTime - keyDebouncer.get("up") > keyDebounceTime_ms) {
            activePiece.rotate()
            key[0] = 0; // require user to release and re-press the up key to rotate again
            keyDebouncer.set("up", currentTime)
        }
    }
    if (key[1]) { // down
        executeMoveIfSatisfies(new Move(0, 1), checkDebouncer, "down");
    }
    if (key[2]) { // left
        executeMoveIfSatisfies(new Move(-1, 0), checkDebouncer, "left");
    }
    if (key[3]) { // right 
        executeMoveIfSatisfies(new Move(1, 0), checkDebouncer, "right");
    }
    if (key[4]) { // spacebar
        while (!(collisionCheck(activePiece, 0, 1).includes(Collision.Floor)
            || collisionCheck(activePiece, 0, 1).includes(Collision.Block)))
        {
            new Move(0, 1).execute();
        }
        key[4] = 0;
        notify("pieceLockIntoPlace");
    }
    if (key[5]) { // C
        notify("hold");
        key[5] = 0;
    }
}

function executeMoveIfSatisfies(move, predicate, key) {
    if (!predicate(key)) {
        return;
    }
    move.execute();
}