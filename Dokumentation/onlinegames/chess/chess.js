// Important variables
var col = 0
var row = 0
var boardContent = "<table  class='chessboard'>"
var fieldId = 0
var blackTurn = false;
var whiteTurn = true;
var activeField = document.getElementById("fieldId")

//Important constants
const chessboard = document.getElementById("chessboard")
const startButton = document.getElementById("startButton")
const occupancy = []
const opportunity = ["Buffer"]

//Important objects
const WhitePawn1 = { field: 48 }
const WhitePawn2 = { field: 49 }
const WhitePawn3 = { field: 50 }
const WhitePawn4 = { field: 51 }
const WhitePawn5 = { field: 52 }
const WhitePawn6 = { field: 53 }
const WhitePawn7 = { field: 54 }
const WhitePawn8 = { field: 55 }

const WhiteRook1 = { field: 56 }
const WhiteRook2 = { field: 63 }

const WhiteKnight1 = { field: 57 }
const WhiteKnight2 = { field: 62 }

const WhiteBishop1 = { field: 58 }
const WhiteBishop2 = { field: 61 }

const WhiteQueen = { field: 59 }
const WhiteKing = { field: 60 }

const BlackPawn1 = { field: 8 }
const BlackPawn2 = { field: 9 }
const BlackPawn3 = { field: 10 }
const BlackPawn4 = { field: 11 }
const BlackPawn5 = { field: 12 }
const BlackPawn6 = { field: 13 }
const BlackPawn7 = { field: 14 }
const BlackPawn8 = { field: 15 }

const BlackRook1 = { field: 0 }
const BlackRook2 = { field: 7 }

const BlackKnight1 = { field: 1 }
const BlackKnight2 = { field: 6 }

const BlackBishop1 = { field: 2 }
const BlackBishop2 = { field: 5 }

const BlackQueen = { field: 3 }
const BlackKing = { field: 4 }

//Create the chessboard
function CreateChessboard() {
    fieldId = 0
    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            occupancy[fieldId] = false
            boardContent += "<td id='" + fieldId++ + "'></td>"
            col++
        }
        boardContent += "</tr>"
        row++
        col = 0
    }
    boardContent += "</table>"
    chessboard.innerHTML = boardContent

    startButton.style = "display:inline"
}

//Figuren aufstellen
function StartingPosition() {
    fieldId = 0
    while (fieldId <= 63) {
        for (let x = 0; x < 8;) {
            activeField = document.getElementById(fieldId)
            if (activeField.id <= 14 && activeField.id >= 9) {
                activeField.innerHTML = "<img onclick='showPossibilityBlackPawnMiddle()' class='piece' src='Icons/black_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 15) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 8) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 0 || activeField.id == 7) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_rook.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 1 || activeField.id == 6) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_knight.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 2 || activeField.id == 5) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_bishop.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 3) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_queen.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 4) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_king.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id <= 54 && activeField.id >= 49) {
                activeField.innerHTML = "<img onclick='showPossibilityWhitePawnMiddle(" + fieldId + ")' class='piece' src='Icons/white_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 48) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 55) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 56 || activeField.id == 63) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_rook.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 57 || activeField.id == 62) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_knight.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 58 || activeField.id == 61) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_bishop.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 59) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_queen.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id == 60) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_king.png'>"
                occupancy[fieldId] = true
            }
            fieldId++
            x++
        }
    }

    startButton.style = "display:none"
}

//Weisser Bauer Mitte Möglichkeiten anzeigen
function showPossibilityWhitePawnMiddle(piece) {
    if (piece <= 54 || piece >= 49) {
        for (let x = 1; x <= 2;) {
            if (occupancy[piece - 8] == false) {
                opportunity.push(piece - 8)
                document.getElementById(opportunity[opportunity.length - 1]).style="background-color: #00AA00"
            }
            else {
                x = 2
            }
            x++
        }
    }
}

CreateChessboard()
