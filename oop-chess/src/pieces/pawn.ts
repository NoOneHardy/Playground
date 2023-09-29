import { Field } from "../field.js";
import { Game } from "../game.js";
import { Piece } from "../piece.js";

export class Pawn extends Piece {
    public constructor(field: Field, color: string) {
        let icon = `<i class=\"piece ${color} fa-solid fa-car\"></i>`
        super(field, color, icon);
    }

    public calcPossibleFields() {
        
    }

    public getNextField(direction: number) {
        let id = this.getFieldId();
        let nextId = `col-${this.getField().getRow() + direction}-${this.getField().getCol()}`;
        console.log(Game.getPiece(nextId));
    }
}