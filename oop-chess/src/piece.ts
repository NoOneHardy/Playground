import { State } from "./enums/state.js";
import { Field } from "./field.js";
import { Game } from "./game.js";

export class Piece {
    protected field: Field;
    protected possibleFields: Field[] = [];
    protected color: string;
    protected readonly icon: string;
    protected state: string[] = [];

    public constructor(field: Field, color: string, icon: string) {
        this.field = field;
        this.color = color;
        this.icon = icon;
    }

    public getField() {
        return this.field;
    }

    public setField(field: Field) {
        this.field = field;
    }

    public getIcon() {
        return this.icon;
    }

    public getFieldId() {
        return this.getField().getId();
    }

    public setState(state: string[]) {
        const piece = document.querySelector(`#${this.getFieldId()}>.piece`);
        if (!piece) return;

        this.state.forEach((className) => {
            piece.classList.remove(className);
        });
        
        // Remove ACTIVE from other pieces
        if (state === State.ACTIVE) {
            Game.getPieces().flat().map((otherPiece) => {
                if (otherPiece.getState() === State.ACTIVE) {
                    otherPiece.setState([]);
                }
            });
        }
        this.state = state;
        state.forEach((className) => {
            piece.classList.add(className);
        });
    }

    public getState() {
        return this.state;
    }
}