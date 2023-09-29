import { State } from "./enums/state.js";
import { Game } from "./game.js";
export class Piece {
    field;
    color;
    icon;
    state = [];
    constructor(field, color, icon) {
        this.field = field;
        this.color = color;
        this.icon = icon;
    }
    getField() {
        return this.field;
    }
    setField(field) {
        this.field = field;
    }
    getIcon() {
        return this.icon;
    }
    getFieldId() {
        return this.getField().getId();
    }
    setState(state) {
        const piece = document.querySelector(`#${this.getFieldId()}>.piece`);
        if (!piece)
            return;
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
    getState() {
        return this.state;
    }
}
