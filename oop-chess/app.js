const boardArea = document.querySelector("#boardArea")

const black = "black"
const white = "white"

class Pawn {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/black_pawn.png'>"
    }
    /*
    move(field) {
        if (color = "black") {
            
        }
    }
    */
}

class Field {
    constructor(piece) {
        this.piece = piece
    }
}

function createBoard() {
    let boardContent = "<table id='board' class='board'>"
    var pieces = []
    var blackPawn1 = new Pawn(black, 8)
    pieces.push(blackPawn1)

    for (let row = 0; row < 8; row++) {
        boardContent += "<tr id='" + row +"'>"
        for (let col = 0; col < 8; col++) {
            boardContent += "<td id ='" + row + col + "'></td>"
        }
        boardContent += "</tr>"
    }

    boardContent += "</table>"
    boardArea.innerHTML = boardContent
}

createBoard()