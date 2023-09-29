import { Field } from "../field.js";
import { Piece } from "../piece.js";

export class Queen extends Piece {
    public constructor(field: Field, color: string) {
        let icon = `<i class=\"piece ${color} fa-solid fa-plane\"></i>`
        super(field, color, icon);
    }
}