export class Game {
    private readonly size: number;
    private readonly cells: Array<number | undefined>;

    public constructor(size: number) {
        this.size = size;
        this.cells = Array.from({ length: size * size });

        console.log(this.cells);
    }
}
