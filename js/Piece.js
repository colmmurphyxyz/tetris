/**
 * each number in the 'bag' represents a piece
 * when a new piece is chosen, the computer chooses a random piece from the bag, and replaces it when empty
 */
class Bag {
    bag = this.shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);

    /**
     * Get the next element in the bag.
     */
    pop() {
        let next = this.bag.pop();
        if (this.bag.length === 7) {
            this.bag = [...this.shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]), ...this.bag]
        }
        return this.bag.pop();
    }
    /**
     * Get the next n elements in the bag, without removing them.
     */
    next(n) {
        if (n > 7 || n < 1) throw "Bad Input for function Bag.peek, input should be in [1, 7]";
        return this.bag.slice(n * -1);
    }

    /** 
     * Get the nth next element in the bag, without removing it.
     */
    peek(n) {
        if (n > 7 || n < 1) throw "Bad Input for function Bag.peek, input should be in [1, 7]"
        return this.bag[this.bag.length - (n + 1)];
    }

    // taken from https://bost.ocks.org/mike/shuffle/
    shuffle(array) {
        var m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
    }
}
let bag = new Bag();

class Piece {
    coordinates;
    color;
    fulcrumCoords;
    constructor() {
        // check if a line is full, and remove all filled lines
        checkLines();

        let col = bag.pop();
        if (bag.length === 0) {
            bag = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);
        }
        this.color = col;

        switch (col) {
            case 1: // Z piece
                this.coordinates = [
                    c(4, 1), c(4, 0), c(3, 0), c(5, 1)
                ];
                break;
            case 2: // R piece
                this.coordinates = [
                    c(4, 1), c(3, 1), c(3, 0), c(5, 1)
                ];
                break;
            case 3: // S piece
                this.coordinates = [
                    c(4, 1), c(3, 1), c(4, 0), c(5, 0)
                ];
                break;
            case 4: // L piece
                this.coordinates = [
                    c(4, 1), c(3, 1), c(5, 1), c(5, 0)
                ];
                break;
            case 5: // I piece
                this.coordinates = [
                    c(4, 1), c(3, 1), c(5, 1), c(6, 1)
                ];
                break;
            case 6: // O piece
                this.coordinates = [
                    c(4, 1), c(4, 0), c(5, 1), c(5, 0)
                ]
                break;
            case 7: // T piece
                this.coordinates = [
                    c(4, 1), c(3, 1), c(4, 0), c(5, 1)
                ]
                break;
            default:
                alert("something has gone awfully wrong");
                break;
        }
        this.fulcrumCoords = this.coordinates[0];

        // check for collision
        for (let i = 0; i < this.coordinates.length; i++) {
            let c = this.coordinates[i];
            if (board[c.y][c.x] !== 0) {
                gameOver();
            }
        }
    }

    /**
     * rotate a piece 90 degrees clockwise
     * this function just works, don't try to modify it
     */
    rotate() {
        const fulcrumX = this.fulcrumCoords.x;
        const fulcrumY = this.fulcrumCoords.y;
        for (let i = 1; i < this.coordinates.length; i++) {
            let c = this.coordinates[i];
            c = [c.x - fulcrumX, c.y - fulcrumY];
            // rotate each square of the piece 90 degrees clockwise, excluding the fulcrum
            let newCoord = [c[1] * -1, c[0]];
            this.coordinates[i] = new Coord(newCoord[0] + fulcrumX, newCoord[1] + fulcrumY);
        }
    }
}