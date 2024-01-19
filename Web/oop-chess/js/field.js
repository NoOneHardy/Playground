export class Field {
    id;
    col;
    row;
    constructor(row, col) {
        this.col = col;
        this.row = row;
        this.id = `col-${row}-${col}`;
    }
    getCol() {
        return this.col;
    }
    getRow() {
        return this.row;
    }
    getId() {
        return this.id;
    }
}
