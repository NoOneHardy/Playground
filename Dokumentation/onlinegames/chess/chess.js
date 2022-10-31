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
const color = []
const pieces = []

//Create the chessboard
function CreateChessboard() {
    activeFieldID = 0
    boardContent = "<table  class='chessboard'>"
    row = 0
    col = 0
    whiteTurn = true
    blackTurn = false

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

    for (let x = 0; x < 64;) {
        color[x++] = ""
    }
    
    color.splice(0, 16,
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz",
        "schwarz")
    
    color.splice(48, 16,
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss",
        "weiss")

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
            boardContent += "<td class='piece' onclick='toHere(" + activeFieldID + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
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

function toHere(finalPosition) {
    var activeType = pieces[activeFieldID];
    var opponent = pieces[finalPosition];
    if (whiteTurn == true) {
        if (activeType == "Bauer weiss") {
            if (finalPosition == activeFieldID - 9) {
                if (color[finalPosition] == "schwarz") {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID - 8) / 8) == Math.floor((activeFieldID - 9) / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                }
            } else if (finalPosition == activeFieldID - 7) {
                if (color[finalPosition] == "schwarz") {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID - 8) / 8) == Math.floor((activeFieldID - 7) / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                }
            } else if (finalPosition == activeFieldID - 8) {
                if (occupancy[activeFieldID - 8] != true) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            } else if (activeFieldID > 47 && finalPosition == activeFieldID - 16) {
                if (occupancy[activeFieldID - 16] != true) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
        }

        if (activeType == "Turm weiss") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != "weiss") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != "weiss") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != "weiss") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != "weiss") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != "weiss") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != "weiss") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != "weiss") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != "weiss") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != "weiss") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != "weiss") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != "weiss") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != "weiss") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != "weiss") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != "weiss") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != "weiss" && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "weiss"
                                            whiteTurn = false
                                            blackTurn = true
                                        }
                                    }
                                    if (color[activeFieldID + 6] != "weiss" && finalPosition == activeFieldID + 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (color[activeFieldID + 5] != "weiss" && finalPosition == activeFieldID + 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (color[activeFieldID + 4] != "weiss" && finalPosition == activeFieldID + 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (color[activeFieldID + 3] != "weiss" && finalPosition == activeFieldID + 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (color[activeFieldID + 2] != "weiss" && finalPosition == activeFieldID + 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (color[activeFieldID + 1] != "weiss" && finalPosition == activeFieldID + 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != "weiss" && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "weiss"
                                            whiteTurn = false
                                            blackTurn = true
                                        }
                                    }
                                    if (color[activeFieldID - 6] != "weiss" && finalPosition == activeFieldID - 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (color[activeFieldID - 5] != "weiss" && finalPosition == activeFieldID - 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (color[activeFieldID - 4] != "weiss" && finalPosition == activeFieldID - 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (color[activeFieldID - 3] != "weiss" && finalPosition == activeFieldID - 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (color[activeFieldID - 2] != "weiss" && finalPosition == activeFieldID - 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (color[activeFieldID - 1] != "weiss" && finalPosition == activeFieldID - 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
        }

        if (activeType == "Pferd weiss") {
            if (color[finalPosition] != "weiss") {
                if ((finalPosition == activeFieldID - 15 || finalPosition == activeFieldID - 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 2)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
                if ((finalPosition == activeFieldID - 6 || finalPosition == activeFieldID - 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 1)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
                if ((finalPosition == activeFieldID + 15 || finalPosition == activeFieldID + 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 2)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
                if ((finalPosition == activeFieldID + 6 || finalPosition == activeFieldID + 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 1)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
        }

        if (activeType == "L&auml;ufer weiss") {
            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != "weiss" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != "weiss" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != "weiss" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != "weiss" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != "weiss" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != "weiss" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != "weiss" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != "weiss" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != "weiss" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != "weiss" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != "weiss" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != "weiss" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != "weiss" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != "weiss" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != "weiss" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != "weiss" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != "weiss" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != "weiss" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != "weiss" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != "weiss" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != "weiss" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != "weiss" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != "weiss" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != "weiss" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != "weiss" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != "weiss" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != "weiss" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != "weiss" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }
        }

        if (activeType == "K&ouml;nigin weiss") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != "weiss") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != "weiss") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != "weiss") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != "weiss") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != "weiss") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != "weiss") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != "weiss") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != "weiss") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != "weiss") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != "weiss") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != "weiss") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != "weiss") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != "weiss") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != "weiss") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != "weiss" && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "weiss"
                                            whiteTurn = false
                                            blackTurn = true
                                        }
                                    }
                                    if (color[activeFieldID + 6] != "weiss" && finalPosition == activeFieldID + 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (color[activeFieldID + 5] != "weiss" && finalPosition == activeFieldID + 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (color[activeFieldID + 4] != "weiss" && finalPosition == activeFieldID + 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (color[activeFieldID + 3] != "weiss" && finalPosition == activeFieldID + 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (color[activeFieldID + 2] != "weiss" && finalPosition == activeFieldID + 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (color[activeFieldID + 1] != "weiss" && finalPosition == activeFieldID + 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != "weiss" && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "weiss"
                                            whiteTurn = false
                                            blackTurn = true
                                        }
                                    }
                                    if (color[activeFieldID - 6] != "weiss" && finalPosition == activeFieldID - 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (color[activeFieldID - 5] != "weiss" && finalPosition == activeFieldID - 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (color[activeFieldID - 4] != "weiss" && finalPosition == activeFieldID - 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (color[activeFieldID - 3] != "weiss" && finalPosition == activeFieldID - 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (color[activeFieldID - 2] != "weiss" && finalPosition == activeFieldID - 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (color[activeFieldID - 1] != "weiss" && finalPosition == activeFieldID - 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }

            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != "weiss" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != "weiss" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != "weiss" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != "weiss" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != "weiss" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != "weiss" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != "weiss" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != "weiss" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != "weiss" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != "weiss" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != "weiss" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != "weiss" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != "weiss" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != "weiss" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != "weiss" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != "weiss" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != "weiss" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != "weiss" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != "weiss" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != "weiss" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != "weiss" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != "weiss" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "weiss"
                                        whiteTurn = false
                                        blackTurn = true
                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != "weiss" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "weiss"
                                    whiteTurn = false
                                    blackTurn = true
                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != "weiss" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "weiss"
                                whiteTurn = false
                                blackTurn = true
                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != "weiss" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "weiss"
                            whiteTurn = false
                            blackTurn = true
                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != "weiss" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "weiss"
                        whiteTurn = false
                        blackTurn = true
                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != "weiss" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "weiss"
                    whiteTurn = false
                    blackTurn = true
                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != "weiss" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }
        }

        if (activeType == "K&ouml;nig weiss") {
            if (color[activeFieldID - 1] != "weiss" && finalPosition == activeFieldID - 1 && Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            } else if (color[activeFieldID + 1] != "weiss" && finalPosition == activeFieldID + 1 && Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }
            if (color[activeFieldID - 8] != "weiss" && finalPosition == activeFieldID - 8 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            } else if (color[activeFieldID + 8] != "weiss" && finalPosition == activeFieldID + 8 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "weiss"
                whiteTurn = false
                blackTurn = true
            }
        }
    }

    if (blackTurn == true) {
        if (activeType == "Bauer schwarz") {
            if (finalPosition == activeFieldID + 9) {
                if (color[finalPosition] == "weiss") {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID + 8) / 8) == Math.floor((activeFieldID + 9) / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                }
            } else if (finalPosition == activeFieldID + 7) {
                if (color[finalPosition] == "weiss") {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID + 8) / 8) == Math.floor((activeFieldID + 7) / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                }
            } else if (finalPosition == activeFieldID + 8) {
                if (occupancy[activeFieldID + 8] != true) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            } else if (activeFieldID < 15 && finalPosition == activeFieldID + 16) {
                if (occupancy[activeFieldID + 16] != true) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
        }

        if (activeType == "Turm schwarz") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != "schwarz") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != "schwarz") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != "schwarz") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != "schwarz") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != "schwarz") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != "schwarz") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != "schwarz") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != "schwarz") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != "schwarz") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != "schwarz") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != "schwarz") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != "schwarz") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != "schwarz") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != "schwarz") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != "schwarz" && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "schwarz"
                                            whiteTurn = true
                                            blackTurn = false
                                        }
                                    }
                                    if (color[activeFieldID + 6] != "schwarz" && finalPosition == activeFieldID + 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (color[activeFieldID + 5] != "schwarz" && finalPosition == activeFieldID + 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (color[activeFieldID + 4] != "schwarz" && finalPosition == activeFieldID + 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (color[activeFieldID + 3] != "schwarz" && finalPosition == activeFieldID + 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (color[activeFieldID + 2] != "schwarz" && finalPosition == activeFieldID + 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (color[activeFieldID + 1] != "schwarz" && finalPosition == activeFieldID + 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != "schwarz" && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "schwarz"
                                            whiteTurn = true
                                            blackTurn = false
                                        }
                                    }
                                    if (color[activeFieldID - 6] != "schwarz" && finalPosition == activeFieldID - 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (color[activeFieldID - 5] != "schwarz" && finalPosition == activeFieldID - 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (color[activeFieldID - 4] != "schwarz" && finalPosition == activeFieldID - 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (color[activeFieldID - 3] != "schwarz" && finalPosition == activeFieldID - 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (color[activeFieldID - 2] != "schwarz" && finalPosition == activeFieldID - 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (color[activeFieldID - 1] != "schwarz" && finalPosition == activeFieldID - 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
        }

        if (activeType == "Pferd schwarz") {
            if (color[finalPosition] != "schwarz") {
                if ((finalPosition == activeFieldID - 15 || finalPosition == activeFieldID - 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 2)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
                if ((finalPosition == activeFieldID - 6 || finalPosition == activeFieldID - 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 1)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
                if ((finalPosition == activeFieldID + 15 || finalPosition == activeFieldID + 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 2)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
                if ((finalPosition == activeFieldID + 6 || finalPosition == activeFieldID + 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 1)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
        }

        if (activeType == "L&auml;ufer schwarz") {
            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != "schwarz" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != "schwarz" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != "schwarz" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != "schwarz" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != "schwarz" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != "schwarz" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != "schwarz" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != "schwarz" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != "schwarz" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != "schwarz" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != "schwarz" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != "schwarz" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != "schwarz" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != "schwarz" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != "schwarz" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != "schwarz" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != "schwarz" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != "schwarz" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != "schwarz" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != "schwarz" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != "schwarz" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != "schwarz" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != "schwarz" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != "schwarz" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != "schwarz" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != "schwarz" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != "schwarz" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != "schwarz" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }
        }

        if (activeType == "K&ouml;nigin schwarz") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != "schwarz") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != "schwarz") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != "schwarz") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != "schwarz") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != "schwarz") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != "schwarz") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != "schwarz") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != "schwarz") {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != "schwarz") {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != "schwarz") {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != "schwarz") {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != "schwarz") {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != "schwarz") {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != "schwarz") {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != "schwarz" && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "schwarz"
                                            whiteTurn = true
                                            blackTurn = false
                                        }
                                    }
                                    if (color[activeFieldID + 6] != "schwarz" && finalPosition == activeFieldID + 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (color[activeFieldID + 5] != "schwarz" && finalPosition == activeFieldID + 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (color[activeFieldID + 4] != "schwarz" && finalPosition == activeFieldID + 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (color[activeFieldID + 3] != "schwarz" && finalPosition == activeFieldID + 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (color[activeFieldID + 2] != "schwarz" && finalPosition == activeFieldID + 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (color[activeFieldID + 1] != "schwarz" && finalPosition == activeFieldID + 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != "schwarz" && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = "schwarz"
                                            whiteTurn = true
                                            blackTurn = false
                                        }
                                    }
                                    if (color[activeFieldID - 6] != "schwarz" && finalPosition == activeFieldID - 6) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (color[activeFieldID - 5] != "schwarz" && finalPosition == activeFieldID - 5) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (color[activeFieldID - 4] != "schwarz" && finalPosition == activeFieldID - 4) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (color[activeFieldID - 3] != "schwarz" && finalPosition == activeFieldID - 3) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (color[activeFieldID - 2] != "schwarz" && finalPosition == activeFieldID - 2) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (color[activeFieldID - 1] != "schwarz" && finalPosition == activeFieldID - 1) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }

            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != "schwarz" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != "schwarz" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != "schwarz" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != "schwarz" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != "schwarz" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != "schwarz" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != "schwarz" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != "schwarz" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != "schwarz" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != "schwarz" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != "schwarz" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != "schwarz" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != "schwarz" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != "schwarz" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != "schwarz" && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != "schwarz" && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != "schwarz" && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != "schwarz" && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != "schwarz" && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != "schwarz" && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != "schwarz" && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != "schwarz" && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = "schwarz"
                                        whiteTurn = true
                                        blackTurn = false
                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != "schwarz" && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = "schwarz"
                                    whiteTurn = true
                                    blackTurn = false
                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != "schwarz" && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = "schwarz"
                                whiteTurn = true
                                blackTurn = false
                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != "schwarz" && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = "schwarz"
                            whiteTurn = true
                            blackTurn = false
                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != "schwarz" && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = "schwarz"
                        whiteTurn = true
                        blackTurn = false
                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != "schwarz" && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = "schwarz"
                    whiteTurn = true
                    blackTurn = false
                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != "schwarz" && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = "schwarz"
                whiteTurn = true
                blackTurn = false
            }
        }
    }

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

    if (opponent == "K&ouml;nig schwarz") {
        alert("Weiss hat gewonnen!")
        CreateChessboard()
    }

    if (opponent == "K&ouml;nig weiss") {
        alert("Schwarz hat gewonnen!")
        CreateChessboard()
    }
}

CreateChessboard()
