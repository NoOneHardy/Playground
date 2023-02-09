const boardArea = document.querySelector("#boardArea")

const black = "black"
const white = "white"

class Pawn {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/" + color + "/pawn.png'>"
    }
}

class Rook {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/" + color + "/rook.png'>"
    }
}

class Knight {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/" + color + "/knight.png'>"
    }
}

class Bishop {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/" + color + "/bishop.png'>"
    }
}

class Queen {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/" + color + "/queen.png'>"
    }
}

class King {
    constructor(color, position) {
        this.color = color
        this.position = position
        this.moved = false
        this.dead = false
        this.image = "<img src='icons/" + color + "/king.png'>"
    }
}

class Field {
    constructor(piece) {
        this.piece = piece
    }
}

function createPieces(fields) {
    let pieces = []

    var blackPawns = []
    var whitePawns = []
    var blackRooks = []
    var whiteRooks = []
    var blackKnights = []
    var whiteKnights = []
    var blackBishops = []
    var whiteBishops = []

    var blackKing = new King(black, 14)
    var whiteKing = new King(white, 84)
    var blackQueen = new Queen(black, 15)
    var whiteQueen = new Queen(white, 85)

    for (let pawn = 1; pawn <= 8; pawn++) {
        blackPawns[pawn - 1] = new Pawn(black, 2 + pawn.toString())
        fields[blackPawns[pawn - 1].position].piece = blackPawns[pawn - 1]
        whitePawns[pawn - 1] = new Pawn(white, 7 + pawn.toString())
        fields[whitePawns[pawn - 1].position].piece = whitePawns[pawn - 1]
    }

    blackRooks.push(new Rook(black, 11))
    fields[blackRooks[0].position].piece = blackRooks[0]
    blackRooks.push(new Rook(black, 18))
    fields[blackRooks[1].position].piece = blackRooks[1]

    whiteRooks.push(new Rook(white, 81))
    fields[whiteRooks[0].position].piece = whiteRooks[0]
    whiteRooks.push(new Rook(white, 88))
    fields[whiteRooks[1].position].piece = whiteRooks[1]

    blackKnights.push(new Knight(black, 12))
    fields[blackKnights[0].position].piece = blackKnights[0]
    blackKnights.push(new Knight(black, 17))
    fields[blackKnights[1].position].piece = blackKnights[1]

    whiteKnights.push(new Knight(white, 82))
    fields[whiteKnights[0].position].piece = whiteKnights[0]
    whiteKnights.push(new Knight(white, 87))
    fields[whiteKnights[1].position].piece = whiteKnights[1]

    blackBishops.push(new Bishop(black, 13))
    fields[blackBishops[0].position].piece = blackBishops[0]
    blackBishops.push(new Bishop(black, 16))
    fields[blackBishops[1].position].piece = blackBishops[1]

    whiteBishops.push(new Bishop(white, 83))
    fields[whiteBishops[0].position].piece = whiteBishops[0]
    whiteBishops.push(new Bishop(white, 86))
    fields[whiteBishops[1].position].piece = whiteBishops[1]

    fields[blackKing.position].piece = blackKing
    fields[whiteKing.position].piece = whiteKing
    fields[blackQueen.position].piece = blackQueen
    fields[whiteQueen.position].piece = whiteQueen

    pieces.push(blackPawns)
    pieces.push(whitePawns)
    pieces.push(blackRooks)
    
    pieces.push(whiteRooks)
    pieces.push(blackKnights)
    pieces.push(whiteKnights)
    pieces.push(blackBishops)
    pieces.push(whiteBishops)

    pieces.push(blackKing)
    pieces.push(whiteKing)
    pieces.push(blackQueen)
    pieces.push(whiteQueen)

    return pieces
}

function createBoard() {
    var fields = []
    for (let maxFields = 0; maxFields < 89; maxFields++) {
        fields[maxFields] = null;
    }
    let boardContent = "<table id='board' class='board'>"
    for (let row = 1; row <= 8; row++) {
        boardContent += "<tr id='" + row + "'>"
        for (let col = 1; col <= 8; col++) {
            boardContent += "<td id ='" + row + col + "'></td>"
            fields[row + col.toString()] = new Field(null)
        }
        boardContent += "</tr>"
    }

    var pieces = createPieces(fields)

    console.log(fields)

    boardContent += "</table>"
    boardArea.innerHTML = boardContent
}

createBoard()