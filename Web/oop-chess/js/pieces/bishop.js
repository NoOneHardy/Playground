import { Piece } from "../piece.js";
export class Bishop extends Piece {
    constructor(field, color) {
        let icon = `<i class=\"piece ${color} fa-solid fa-ship\"></i>`;
        super(field, color, icon);
    }
}
