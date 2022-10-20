// Important variables
var col = 0
var row = 0
var boardContent = "<table  class='chessboard'>"
var fieldId = 0
var blackTurn = false;
var whiteTurn = true;

//Important constants
const chessboard = document.getElementById("chessboard")
const startButton = document.getElementById("startButton")
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

    startButton.style="display:inline"
}

//Figuren aufstellen
function StartingPosition() {
    fieldId = 0
    while (fieldId <= 63) {
        for (let x = 0; x < 8;) {
            var activeField = document.getElementById(fieldId)
            if (activeField.id <= 15 && activeField.id >= 8) {
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

            if (activeField.id <= 55 && activeField.id >= 48) {
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
    
    startButton.style="display:none"
}
CreateChessboard()
