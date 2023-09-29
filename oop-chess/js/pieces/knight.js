import { Piece } from "../piece.js";
export class Knight extends Piece {
    constructor(field, color) {
        let icon = `<i class=\"piece ${color} fa-solid fa-rocket\"></i>`;
        super(field, color, icon);
    }
}
