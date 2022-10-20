// Important variables
var col = 0
var row = 0
var boardContent = "<table  class='chessboard'>"
var fieldId = 0

//Important constants
const chessboard = document.getElementById("chessboard")
const occupancy = []

//Important objects
const WhitePawn1 = { field: 01 }
const WhitePawn2 = { field: 11 }

//Create the chessboard
function CreateChessboard() {
    fieldId = 0
    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            boardContent += "<td id='" + fieldId++ + "'></td>"
            col++
        }
        boardContent += "</tr>"
        row++
        col = 0
    }
    boardContent += "</table>"
    chessboard.innerHTML = boardContent
}

//Figuren aufstellen
function StartingPositionPawns() {
    fieldId = 0
    while (fieldId <= 63) {
        for (let x = 0; x < 8;) {
            var activeField = document.getElementById(fieldId)
            if (activeField.id <= 15 && activeField.id >= 8) {
                activeField.innerHTML = "<img class='piece' src='Icons/black_pawn.png'>"
                occupancy[fieldId] = true
            }

            if (activeField.id <= 55 && activeField.id >= 48) {
                activeField.innerHTML = "<img class='piece' src='Icons/white_pawn.png'>"
                occupancy[fieldId] = true
            }

            fieldId++
            x++
        }
    }
}


CreateChessboard()
StartingPositionPawns()