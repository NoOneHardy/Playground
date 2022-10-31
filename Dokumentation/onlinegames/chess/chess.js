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
}

CreateChessboard()
