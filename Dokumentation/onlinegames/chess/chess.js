// Important variables
var col = 0
var row = 0
var boardContent = "<table  class='chessboard'>"
var activeFieldID = 0
var blackTurn = false;
var whiteTurn = true;
var activePieceType = ""
var field = document.getElementById("activeFieldID")

//Important constants
const chessboard = document.getElementById("chessboard")
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
            if (pieces[activeFieldID] == ""){
                occupancy[activeFieldID] = false
            }
            else {
                occupancy[activeFieldID] = true
            }
            boardContent += "<td class='piece' onclick='move(" + activeFieldID + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
            col++
        }
        boardContent += "</tr>"
        row++
        col = 0
    }
    boardContent += "</table>"
    chessboard.innerHTML = boardContent
}

function move(startPosition) {
    if (occupancy[startPosition] == false) {
        alert("Hier steht keine Figur.")
        return
    }
    boardContent = "<table  class='chessboard' id='chessboard'>"
    row = 0
    col = 0
    activeFieldID = 0

    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            if (pieces[activeFieldID] == ""){
                occupancy[activeFieldID] = false
            }
            else {
                occupancy[activeFieldID] = true
            }
            boardContent += "<td class='piece' onclick='toHere(" + activeFieldID + ", " + occupancy[activeFieldID] + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
            col++
        }
        boardContent += "</tr>"
        row++
        col = 0
    }
    boardContent += "</table>"
    chessboard.innerHTML = boardContent
    chessboard.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"
    activeFieldID = startPosition
}

function toHere(finalPosition, activeOccupancy) {
    if (activeOccupancy == false) {
        let type = pieces[activeFieldID];
        pieces[activeFieldID] = "";
        occupancy[activeFieldID] = false;
        pieces[finalPosition] = type;
        occupancy[finalPosition] = true;


    } else if (activeOccupancy == true && finalPosition != activeFieldID) {
        alert("Hier ist schon eine Figur.")
        return
    }

    row = 0;
        col = 0;
        boardContent = "<table  class='chessboard' id='chessboard'>"
    
        activeFieldID = 0
        while (row < 8) {
            boardContent += "<tr>"
            while (col < 8) {
                if (pieces[activeFieldID] == ""){
                    occupancy[activeFieldID] = false
                }
                else {
                    occupancy[activeFieldID] = true
                }
                boardContent += "<td class='piece' onclick='move(" + activeFieldID + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
                col++
            }
            boardContent += "</tr>"
            row++
            col = 0
        }
        boardContent += "</table>"
        chessboard.innerHTML = boardContent
    
        chessboard.style = "border-right: outset 5px #000000; border-left: outset 5px #2d2d2d; border-bottom: outset 5px #000000; border-top: outset 5px #2d2d2d"
}

CreateChessboard()
