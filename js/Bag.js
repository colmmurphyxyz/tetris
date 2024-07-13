/**
 * each number in the 'bag' represents a piece
 * when a new piece is chosen, the computer chooses a random piece from the bag, and replaces it when empty
 */
 class Bag {
    #bag = this.#shuffle([1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7]);

    /**
     * Get the next element in the bag.
     */
    pop() {
        let next = this.#bag.pop();
        if (this.#bag.length < 10) {
            this.#bag = [...this.#shuffle([1, 2, 3, 4, 5, 6, 7]), ...this.#bag]
        }
        return next;
    }
    /**
     * Get the next n elements in the bag, without removing them.
     */
    next(n) {
        if (n > 7 || n < 1) throw "Bad Input for function Bag.peek, input should be in [1, 7]";
        return this.#bag.slice(n * -1);
    }

    /** 
     * Get the nth next element in the bag, without removing it.
     */
    peek(n) {
        if (n > 7 || n < 1) throw "Bad Input for function Bag.peek, input should be in [1, 7]"
        return this.#bag[this.#bag.length - (n + 1)];
    }

    // taken from https://bost.ocks.org/mike/shuffle/
    #shuffle(array) {
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