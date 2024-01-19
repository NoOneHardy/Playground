import { Piece } from "../piece.js";
export class Queen extends Piece {
    constructor(field, color) {
        let icon = `<i class=\"piece ${color} fa-solid fa-plane\"></i>`;
        super(field, color, icon);
    }
}
