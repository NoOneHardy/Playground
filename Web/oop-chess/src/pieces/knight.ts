import { Field } from "../field.js";
import { Piece } from "../piece.js";

export class Knight extends Piece {
    public constructor(field: Field, color: string) {
        let icon = `<i class=\"piece ${color} fa-solid fa-rocket\"></i>`
        super(field, color, icon);
    }
}