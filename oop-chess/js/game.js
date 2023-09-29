import { Field } from "./field.js";
import { Pawn } from "./pieces/pawn.js";
import { Color } from "./enums/color.js";
import { Rook } from "./pieces/rook.js";
import { Knight } from "./pieces/knight.js";
import { Bishop } from "./pieces/bishop.js";
import { King } from "./pieces/king.js";
import { Queen } from "./pieces/queen.js";
export class Game {
    constructor() { }
    static fields = [];
    static pieces = [[], [], [], [], [], [], [], []];
    static getPieces() {
        return this.pieces;
    }
    static getPiece(id) {
        let row = Number(id.split('-')[1]);
        let col = Number(id.split('-')[2]);
        return this.pieces[row][col];
    }
    static addPiece(piece) {
        if (this.pieces[piece.getField().getRow()] === undefined) {
            this.pieces[piece.getField().getRow()] = [];
        }
        this.pieces[piece.getField().getRow()][piece.getField().getCol()] = piece;
        return piece;
    }
    static addField(field) {
        if (this.fields[field.getRow()] === undefined) {
            this.fields[field.getRow()] = [];
        }
        this.fields[field.getRow()][field.getCol()] = field;
        return field;
    }
    static displayPieces() {
        this.getPieces().flat().forEach((piece) => {
            if (piece === undefined)
                return;
            const field = document.getElementById(piece.getFieldId());
            if (!field)
                return;
            field.innerHTML = piece.getIcon();
        });
    }
    static init() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                let field = this.addField(new Field(row, col));
                if (row === 1) {
                    let pawn = new Pawn(field, Color.BLACK);
                    this.addPiece(pawn);
                }
                else if (row === 6) {
                    let pawn = new Pawn(field, Color.WHITE);
                    this.addPiece(pawn);
                }
                else if (row === 0) {
                    this.setStartRow(col, Color.BLACK, field);
                }
                else if (row === 7) {
                    this.setStartRow(col, Color.WHITE, field);
                }
            }
        }
        this.displayPieces();
    }
    static setStartRow(col, color, field) {
        if (col === 0 || col === 7) {
            let rook = new Rook(field, color);
            this.addPiece(rook);
        }
        else if (col === 1 || col === 6) {
            let knight = new Knight(field, color);
            this.addPiece(knight);
        }
        else if (col === 2 || col === 5) {
            let bishop = new Bishop(field, color);
            this.addPiece(bishop);
        }
        else if (col === 3) {
            let king = new King(field, color);
            this.addPiece(king);
        }
        else if (col === 4) {
            let queen = new Queen(field, color);
            this.addPiece(queen);
        }
    }
}
