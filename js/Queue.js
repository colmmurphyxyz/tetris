class Queue {
    elements;
    constructor() {
        this.elements = [];
    }

    push(e) {
        this.elements = [e, ...this.elements];
    }

    poll() {
        return this.elements.pop(); 
    }

    get size() {
        return this.elements.length;
    }

    get isEmpty() {
        return this.size == 0;
    }
}