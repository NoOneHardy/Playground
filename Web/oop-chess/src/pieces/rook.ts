import { Field } from "../field.js";
import { Piece } from "../piece.js";

export class Rook extends Piece {
    public constructor(field: Field, color: string) {
        let icon = `<i class=\"piece ${color} fa-solid fa-train\"></i>`
        super(field, color, icon);
    }
}