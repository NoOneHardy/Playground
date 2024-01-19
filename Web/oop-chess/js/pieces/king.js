import { Piece } from "../piece.js";
export class King extends Piece {
    constructor(field, color) {
        let icon = `<i class=\"piece ${color} fa-solid fa-truck-monster\"></i>`;
        super(field, color, icon);
    }
}
