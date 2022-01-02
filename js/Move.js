class Move {
    static Down = new Move("down");
    static Left = new Move("left");
    static Right = new Move("right");
    static Rotate = new Move("rotate");
    static Drop = new Move("drop");
    static Hold = new Move("hold");

    constructor(name) {
        this.name = name;
    }
}