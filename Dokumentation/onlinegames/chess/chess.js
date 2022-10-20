// Important variables
var col = 0;
var row = 0;
var boardContent = "<table  class='chessboard'>"
var fieldId = 00;

//Important constants
const chessboard = document.getElementById("chessboard")

//Important objects
const WhitePawn1 = {activeCol: 2, activeRow: 1}

//Create the chessboard
function CreateChessboard() {
    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            boardContent += "<td id='" + fieldId++ + "'></td>"
            col++
        }
        boardContent += "</tr>"
        row++
        fieldId += 3 
        col = 0
    }
    boardContent += "</table>"
    chessboard.innerHTML = boardContent
}

CreateChessboard()