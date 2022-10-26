// Important variables
var col = 0
var row = 0
var boardContent = "<table  class='chessboard'>"
var activeFieldID = 0
var blackTurn = false;
var whiteTurn = true;
var activePieceactiveType = ""
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
            if (pieces[activeFieldID] == "") {
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
            if (pieces[activeFieldID] == "") {
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
    var activeType = pieces[activeFieldID];
    if (activeType == "Bauer weiss") {
        if ((finalPosition == activeFieldID - 9 || finalPosition == activeFieldID - 7)) {
            if (occupancy[finalPosition] == true) {
                if (Math.floor((activeFieldID - 8) / 8) == Math.floor((activeFieldID - 9) / 8) && Math.floor((activeFieldID - 8) / 8) == Math.floor((activeFieldID - 7) / 8)) {
                    pieces[activeFieldID] = "";
                    occupancy[activeFieldID] = false;
                    pieces[finalPosition] = activeType;
                    occupancy[finalPosition] = true;
                }
            }
        } else if (finalPosition == activeFieldID - 8) {
            if (occupancy[activeFieldID - 8] != true) {
                pieces[activeFieldID] = "";
                occupancy[activeFieldID] = false;
                pieces[finalPosition] = activeType;
                occupancy[finalPosition] = true;
            }
        } else if (activeFieldID > 47 && activeFieldID - 16) {
            if (occupancy[activeFieldID - 16] != true) {
                pieces[activeFieldID] = "";
                occupancy[activeFieldID] = false;
                pieces[finalPosition] = activeType;
                occupancy[finalPosition] = true;
            }
        }
    }


    /*
    if (occupancy[finalPosition] == true && finalPosition != activeFieldID) {
        alert("Hier ist schon eine Figur.")
        return
    }
     
    if (activeOccupancy == false) {
        pieces[activeFieldID] = "";
        occupancy[activeFieldID] = false;
        pieces[finalPosition] = activeType;
        occupancy[finalPosition] = true;
    */
    row = 0;
    col = 0;
    boardContent = "<table  class='chessboard' id='chessboard'>"

    activeFieldID = 0
    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            if (pieces[activeFieldID] == "") {
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
