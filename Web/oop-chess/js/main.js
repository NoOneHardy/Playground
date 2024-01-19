import { State } from "./enums/state.js";
import { Game } from "./game.js";
Game.init();
console.log(Game.getPieces());
function loadClickEventListeners() {
    document.querySelectorAll('.col').forEach((htmlCol) => {
        htmlCol.addEventListener('click', () => {
            console.log('hoi');
            let piece = Game.getPiece(htmlCol.id);
            piece.setState(State.ACTIVE);
        });
    });
}
loadClickEventListeners();
