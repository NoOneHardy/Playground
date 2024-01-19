import { Piece } from "../piece.js";
export class Pawn extends Piece {
    constructor(field, color) {
        let icon = `<i class=\"piece ${color} fa-solid fa-car\"></i>`;
        super(field, color, icon);
    }
}
