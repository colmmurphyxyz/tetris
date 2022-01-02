class Coord {
    elements;
    constructor(x, y) {
        this.elements = [x, y];
    }

    get x() {
        return this.elements[0];
    }
    set x(value) {
        this.elements[0] = value;
    }

    get y() {
        return this.elements[1];
    }
    set y(value) {
        this.elements[1] = value;
    }
}