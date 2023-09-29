import { Field } from "../field.js";
import { Piece } from "../piece.js";

export class King extends Piece {
    public constructor(field: Field, color: string) {
        let icon = `<i class=\"piece ${color} fa-solid fa-truck-monster\"></i>`
        super(field, color, icon);
    }
}