import { Field } from "../field.js";
import { Piece } from "../piece.js";

export class Bishop extends Piece {
    public constructor(field: Field, color: string) {
        let icon = `<i class=\"piece ${color} fa-solid fa-ship\"></i>`
        super(field, color, icon);
    }
}