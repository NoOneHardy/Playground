import { Piece } from "../piece.js";
export class Rook extends Piece {
    constructor(field, color) {
        let icon = `<i class=\"piece ${color} fa-solid fa-train\"></i>`;
        super(field, color, icon);
    }
}
