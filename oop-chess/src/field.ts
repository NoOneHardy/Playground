export class Field {
    private readonly id: string;
    private readonly col: number;
    private readonly row: number;

    constructor(row: number, col: number) {
        this.col = col;
        this.row = row;
        this.id = `col-${row}-${col}`;
    }

    public getCol() {
        return this.col;
    }

    public getRow() {
        return this.row;
    }

    public getId() {
        return this.id;
    }
}