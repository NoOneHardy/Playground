// Important variables
var col = 0
var row = 0
var boardContent = "<table  class='chessboard'>"
var activeFieldID = 0
var blackTurn = false;
var whiteTurn = true;
var field = document.getElementById("activeFieldID")

//Important constants
const chessboard = document.getElementById("chessboard")
const startButton = document.getElementById("startButton")
const occupancy = []

const pieces = []
for (let x = 0; x < 64;) {
    pieces[x++] = ""
}

pieces.splice(0, 16,
    "Turm schwarz",
    "Pferd schwarz",
    "L&auml;ufer schwarz",
    "K&ouml;nigin schwarz",
    "K&ouml;nig schwarz",
    "L&auml;ufer schwarz",
    "Pferd schwarz",
    "Turm schwarz",
    "Bauer schwarz",
    "Bauer schwarz",
    "Bauer schwarz",
    "Bauer schwarz",
    "Bauer schwarz",
    "Bauer schwarz",
    "Bauer schwarz",
    "Bauer schwarz",)

pieces.splice(48, 16,
    "Bauer weiss",
    "Bauer weiss",
    "Bauer weiss",
    "Bauer weiss",
    "Bauer weiss",
    "Bauer weiss",
    "Bauer weiss",
    "Bauer weiss",
    "Turm weiss",
    "Pferd weiss",
    "L&auml;ufer weiss",
    "K&ouml;nigin weiss",
    "K&ouml;nig weiss",
    "L&auml;ufer weiss",
    "Pferd weiss",
    "Turm weiss")

//Create the chessboard
function CreateChessboard() {
    activeFieldID = 0
    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            occupancy[activeFieldID] = false
            boardContent += "<td id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
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

function startPosition() {
    activeFieldID = 0

}

CreateChessboard()
