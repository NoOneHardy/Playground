// Important variables
var col = 0
var row = 0
var rowWhite = 1
var rowBlack = 1
var boardContent = "<table  class='chessboard'>"
var activeFieldID = 0
var player = "Weiss";
var activePieceactiveType = ""

//Important constants
const chessboard = document.getElementById("chessboard")
const occupancy = []
const color = []
const pieces = []
const deadWhite = []
const deadBlack = []
const white = "Weiss"
const black = "Schwarz"

//Create the chessboard
function CreateChessboard() {
    activeFieldID = 0
    boardContent = "<table  class='chessboard'>"
    row = 0
    col = 0
    player = white
    let id = ""

    for (let x = 1; x <= 16;) {
        id = x + "white"
        document.getElementById(id).innerHTML = ""
        x++
    }

    for (let x = 1; x <= 16;) {
        id = x + "black"
        document.getElementById(id).innerHTML = ""
        x++
    }

    for (let x = 0; x < 64;) {
        pieces[x++] = ""
    }

    pieces.splice(0, 16,
        "<img src='Icons/black_rook.png'>",
        "<img src='Icons/black_knight.png'>",
        "<img src='Icons/black_bishop.png'>",
        "<img src='Icons/black_queen.png'>",
        "<img src='Icons/black_king.png'>",
        "<img src='Icons/black_bishop.png'>",
        "<img src='Icons/black_knight.png'>",
        "<img src='Icons/black_rook.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",
        "<img src='Icons/black_pawn.png'>",)

    pieces.splice(48, 16,
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_pawn.png'>",
        "<img src='Icons/white_rook.png'>",
        "<img src='Icons/white_knight.png'>",
        "<img src='Icons/white_bishop.png'>",
        "<img src='Icons/white_queen.png'>",
        "<img src='Icons/white_king.png'>",
        "<img src='Icons/white_bishop.png'>",
        "<img src='Icons/white_knight.png'>",
        "<img src='Icons/white_rook.png'>")

    for (let x = 0; x < 64;) {
        color[x++] = ""
    }

    color.splice(0, 16,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black,
        black)

    color.splice(48, 16,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white,
        white)

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

var opponent = ""

function toHere(finalPosition) {
    opponent = ""
    var activeType = pieces[activeFieldID];
    if (player == white) {
        if (activeType == "<img src='Icons/white_pawn.png'>") {
            if (finalPosition == activeFieldID - 9) {
                if (color[finalPosition] == black) {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID - 8) / 8) == Math.floor((activeFieldID - 9) / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                }
            } else if (finalPosition == activeFieldID - 7) {
                if (color[finalPosition] == black) {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID - 8) / 8) == Math.floor((activeFieldID - 7) / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                }
            } else if (finalPosition == activeFieldID - 8) {
                if (occupancy[activeFieldID - 8] != true) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            } else if (activeFieldID > 47 && finalPosition == activeFieldID - 16) {
                if (occupancy[activeFieldID - 16] != true) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
        }

        if (activeType == "<img src='Icons/white_rook.png'>") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != white) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != white) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != white) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != white) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != white) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != white) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != white) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != white) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != white) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != white) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != white) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != white) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != white) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != white) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != white && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = white
                                            player = black
                                        }
                                    }
                                    if (color[activeFieldID + 6] != white && finalPosition == activeFieldID + 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (color[activeFieldID + 5] != white && finalPosition == activeFieldID + 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (color[activeFieldID + 4] != white && finalPosition == activeFieldID + 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (color[activeFieldID + 3] != white && finalPosition == activeFieldID + 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (color[activeFieldID + 2] != white && finalPosition == activeFieldID + 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (color[activeFieldID + 1] != white && finalPosition == activeFieldID + 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != white && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = white
                                            player = black
                                        }
                                    }
                                    if (color[activeFieldID - 6] != white && finalPosition == activeFieldID - 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (color[activeFieldID - 5] != white && finalPosition == activeFieldID - 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (color[activeFieldID - 4] != white && finalPosition == activeFieldID - 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (color[activeFieldID - 3] != white && finalPosition == activeFieldID - 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (color[activeFieldID - 2] != white && finalPosition == activeFieldID - 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (color[activeFieldID - 1] != white && finalPosition == activeFieldID - 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
        }

        if (activeType == "<img src='Icons/white_knight.png'>") {
            if (color[finalPosition] != white) {
                if ((finalPosition == activeFieldID - 15 || finalPosition == activeFieldID - 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 2)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
                if ((finalPosition == activeFieldID - 6 || finalPosition == activeFieldID - 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 1)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
                if ((finalPosition == activeFieldID + 15 || finalPosition == activeFieldID + 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 2)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
                if ((finalPosition == activeFieldID + 6 || finalPosition == activeFieldID + 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 1)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
        }

        if (activeType == "<img src='Icons/white_bishop.png'>") {
            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != white && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != white && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != white && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != white && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != white && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != white && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != white && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != white && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != white && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != white && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != white && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != white && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != white && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != white && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != white && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != white && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != white && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != white && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != white && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != white && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != white && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != white && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != white && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != white && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != white && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != white && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != white && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != white && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }
        }

        if (activeType == "<img src='Icons/white_queen.png'>") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != white) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != white) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != white) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != white) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != white) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != white) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != white) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != white) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != white) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != white) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != white) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != white) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != white) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != white) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != white && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = white
                                            player = black
                                        }
                                    }
                                    if (color[activeFieldID + 6] != white && finalPosition == activeFieldID + 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (color[activeFieldID + 5] != white && finalPosition == activeFieldID + 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (color[activeFieldID + 4] != white && finalPosition == activeFieldID + 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (color[activeFieldID + 3] != white && finalPosition == activeFieldID + 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (color[activeFieldID + 2] != white && finalPosition == activeFieldID + 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (color[activeFieldID + 1] != white && finalPosition == activeFieldID + 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != white && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = white
                                            player = black
                                        }
                                    }
                                    if (color[activeFieldID - 6] != white && finalPosition == activeFieldID - 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (color[activeFieldID - 5] != white && finalPosition == activeFieldID - 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (color[activeFieldID - 4] != white && finalPosition == activeFieldID - 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (color[activeFieldID - 3] != white && finalPosition == activeFieldID - 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (color[activeFieldID - 2] != white && finalPosition == activeFieldID - 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (color[activeFieldID - 1] != white && finalPosition == activeFieldID - 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }

            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != white && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != white && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != white && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != white && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != white && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != white && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != white && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != white && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != white && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != white && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != white && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != white && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != white && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != white && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != white && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != white && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != white && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != white && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != white && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != white && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != white && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != white && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = white
                                        player = black
                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != white && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = white
                                    player = black
                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != white && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = white
                                player = black
                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != white && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                            player = black
                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != white && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != white && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != white && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }
        }

        if (activeType == "<img src='Icons/white_king.png'>") {
            if (color[activeFieldID - 1] != white && finalPosition == activeFieldID - 1 && Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            } else if (color[activeFieldID + 1] != white && finalPosition == activeFieldID + 1 && Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }
            if (color[activeFieldID - 8] != white && finalPosition == activeFieldID - 8 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            } else if (color[activeFieldID + 8] != white && finalPosition == activeFieldID + 8 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (color[activeFieldID + 7] != white && finalPosition == activeFieldID + 7 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            } else if (color[activeFieldID + 9] != white && finalPosition == activeFieldID + 9 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }

            if (color[activeFieldID - 7] != white && finalPosition == activeFieldID - 7 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            } else if (color[activeFieldID - 9] != white && finalPosition == activeFieldID - 9 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = white
                player = black
            }
        }

    } else if (player == black) {
        if (activeType == "<img src='Icons/black_pawn.png'>") {
            if (finalPosition == activeFieldID + 9) {
                if (color[finalPosition] == white) {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID + 8) / 8) == Math.floor((activeFieldID + 9) / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                }
            } else if (finalPosition == activeFieldID + 7) {
                if (color[finalPosition] == white) {
                    if (occupancy[finalPosition] == true) {
                        if (Math.floor((activeFieldID + 8) / 8) == Math.floor((activeFieldID + 7) / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                }
            } else if (finalPosition == activeFieldID + 8) {
                if (occupancy[activeFieldID + 8] != true) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            } else if (activeFieldID < 16 && finalPosition == activeFieldID + 16) {
                if (occupancy[activeFieldID + 16] != true) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
        }

        if (activeType == "<img src='Icons/black_rook.png'>") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != black) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != black) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != black) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != black) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != black) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != black) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != black) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != black) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != black) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != black) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != black) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != black) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != black) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != black) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != black && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = black
                                            player = white

                                        }
                                    }
                                    if (color[activeFieldID + 6] != black && finalPosition == activeFieldID + 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (color[activeFieldID + 5] != black && finalPosition == activeFieldID + 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (color[activeFieldID + 4] != black && finalPosition == activeFieldID + 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (color[activeFieldID + 3] != black && finalPosition == activeFieldID + 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (color[activeFieldID + 2] != black && finalPosition == activeFieldID + 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (color[activeFieldID + 1] != black && finalPosition == activeFieldID + 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != black && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = black
                                            player = white

                                        }
                                    }
                                    if (color[activeFieldID - 6] != black && finalPosition == activeFieldID - 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (color[activeFieldID - 5] != black && finalPosition == activeFieldID - 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (color[activeFieldID - 4] != black && finalPosition == activeFieldID - 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (color[activeFieldID - 3] != black && finalPosition == activeFieldID - 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (color[activeFieldID - 2] != black && finalPosition == activeFieldID - 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (color[activeFieldID - 1] != black && finalPosition == activeFieldID - 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
        }

        if (activeType == "<img src='Icons/black_knight.png'>") {
            if (color[finalPosition] != black) {
                if ((finalPosition == activeFieldID - 15 || finalPosition == activeFieldID - 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 2)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
                if ((finalPosition == activeFieldID - 6 || finalPosition == activeFieldID - 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 - 1)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
                if ((finalPosition == activeFieldID + 15 || finalPosition == activeFieldID + 17) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 2)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
                if ((finalPosition == activeFieldID + 6 || finalPosition == activeFieldID + 10) && Math.floor(finalPosition / 8) == Math.floor(activeFieldID / 8 + 1)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
        }

        if (activeType == "<img src='Icons/black_bishop.png'>") {
            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != black && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != black && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != black && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != black && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != black && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != black && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != black && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != black && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != black && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != black && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != black && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != black && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != black && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != black && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != black && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != black && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != black && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != black && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != black && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != black && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != black && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != black && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != black && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != black && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != black && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != black && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != black && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != black && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }
        }

        if (activeType == "<img src='Icons/black_queen.png'>") {
            if (occupancy[activeFieldID - 8] == false) {
                if (occupancy[activeFieldID - 16] == false) {
                    if (occupancy[activeFieldID - 24] == false) {
                        if (occupancy[activeFieldID - 32] == false) {
                            if (occupancy[activeFieldID - 40] == false) {
                                if (occupancy[activeFieldID - 48] == false) {
                                    if (finalPosition == activeFieldID - 56 && color[activeFieldID - 56] != black) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID - 48 && color[activeFieldID - 48] != black) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID - 40 && color[activeFieldID - 40] != black) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID - 32 && color[activeFieldID - 32] != black) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID - 24 && color[activeFieldID - 24] != black) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID - 16 && color[activeFieldID - 16] != black) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID - 8 && color[activeFieldID - 8] != black) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID + 8] == false) {
                if (occupancy[activeFieldID + 16] == false) {
                    if (occupancy[activeFieldID + 24] == false) {
                        if (occupancy[activeFieldID + 32] == false) {
                            if (occupancy[activeFieldID + 40] == false) {
                                if (occupancy[activeFieldID + 48] == false) {
                                    if (finalPosition == activeFieldID + 56 && color[activeFieldID + 56] != black) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID + 48 && color[activeFieldID + 48] != black) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID + 40 && color[activeFieldID + 40] != black) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID + 32 && color[activeFieldID + 32] != black) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID + 24 && color[activeFieldID + 24] != black) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID + 16 && color[activeFieldID + 16] != black) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID + 8 && color[activeFieldID + 8] != black) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                if (occupancy[activeFieldID + 1] == false) {
                    if (occupancy[activeFieldID + 2] == false) {
                        if (occupancy[activeFieldID + 3] == false) {
                            if (occupancy[activeFieldID + 4] == false) {
                                if (occupancy[activeFieldID + 5] == false) {
                                    if (occupancy[activeFieldID + 6] == false) {
                                        if (color[activeFieldID + 7] != black && finalPosition == activeFieldID + 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = black
                                            player = white

                                        }
                                    }
                                    if (color[activeFieldID + 6] != black && finalPosition == activeFieldID + 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (color[activeFieldID + 5] != black && finalPosition == activeFieldID + 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (color[activeFieldID + 4] != black && finalPosition == activeFieldID + 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (color[activeFieldID + 3] != black && finalPosition == activeFieldID + 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (color[activeFieldID + 2] != black && finalPosition == activeFieldID + 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (color[activeFieldID + 1] != black && finalPosition == activeFieldID + 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }

                if (occupancy[activeFieldID - 1] == false) {
                    if (occupancy[activeFieldID - 2] == false) {
                        if (occupancy[activeFieldID - 3] == false) {
                            if (occupancy[activeFieldID - 4] == false) {
                                if (occupancy[activeFieldID - 5] == false) {
                                    if (occupancy[activeFieldID - 6] == false) {
                                        if (color[activeFieldID - 7] != black && finalPosition == activeFieldID - 7) {
                                            pieces[activeFieldID] = ""
                                            color[activeFieldID] = ""
                                            occupancy[activeFieldID] = false
                                            pieces[finalPosition] = activeType
                                            occupancy[finalPosition] = true
                                            color[finalPosition] = black
                                            player = white

                                        }
                                    }
                                    if (color[activeFieldID - 6] != black && finalPosition == activeFieldID - 6) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (color[activeFieldID - 5] != black && finalPosition == activeFieldID - 5) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (color[activeFieldID - 4] != black && finalPosition == activeFieldID - 4) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (color[activeFieldID - 3] != black && finalPosition == activeFieldID - 3) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (color[activeFieldID - 2] != black && finalPosition == activeFieldID - 2) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (color[activeFieldID - 1] != black && finalPosition == activeFieldID - 1) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }

            if (occupancy[activeFieldID - 7] == false) {
                if (occupancy[activeFieldID - 14] == false) {
                    if (occupancy[activeFieldID - 21] == false) {
                        if (occupancy[activeFieldID - 28] == false) {
                            if (occupancy[activeFieldID - 35] == false) {
                                if (occupancy[activeFieldID - 42] == false) {
                                    if (finalPosition == activeFieldID - 49 && color[activeFieldID - 49] != black && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID - 42 && color[activeFieldID - 42] != black && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID - 35 && color[activeFieldID - 35] != black && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID - 28 && color[activeFieldID - 28] != black && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID - 21 && color[activeFieldID - 21] != black && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID - 14 && color[activeFieldID - 14] != black && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID - 7 && color[activeFieldID - 7] != black && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID + 7] == false) {
                if (occupancy[activeFieldID + 14] == false) {
                    if (occupancy[activeFieldID + 21] == false) {
                        if (occupancy[activeFieldID + 28] == false) {
                            if (occupancy[activeFieldID + 35] == false) {
                                if (occupancy[activeFieldID + 42] == false) {
                                    if (finalPosition == activeFieldID + 49 && color[activeFieldID + 49] != black && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID + 42 && color[activeFieldID + 42] != black && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID + 35 && color[activeFieldID + 35] != black && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID + 28 && color[activeFieldID + 28] != black && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID + 21 && color[activeFieldID + 21] != black && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID + 14 && color[activeFieldID + 14] != black && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID + 7 && color[activeFieldID + 7] != black && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID + 9] == false) {
                if (occupancy[activeFieldID + 18] == false) {
                    if (occupancy[activeFieldID + 27] == false) {
                        if (occupancy[activeFieldID + 36] == false) {
                            if (occupancy[activeFieldID + 45] == false) {
                                if (occupancy[activeFieldID + 54] == false) {
                                    if (finalPosition == activeFieldID + 63 && color[activeFieldID + 63] != black && Math.floor(activeFieldID / 8 + 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID + 54 && color[activeFieldID + 54] != black && Math.floor(activeFieldID / 8 + 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID + 45 && color[activeFieldID + 45] != black && Math.floor(activeFieldID / 8 + 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID + 36 && color[activeFieldID + 36] != black && Math.floor(activeFieldID / 8 + 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID + 27 && color[activeFieldID + 27] != black && Math.floor(activeFieldID / 8 + 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID + 18 && color[activeFieldID + 18] != black && Math.floor(activeFieldID / 8 + 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID + 9 && color[activeFieldID + 9] != black && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }

            if (occupancy[activeFieldID - 9] == false) {
                if (occupancy[activeFieldID - 18] == false) {
                    if (occupancy[activeFieldID - 27] == false) {
                        if (occupancy[activeFieldID - 36] == false) {
                            if (occupancy[activeFieldID - 45] == false) {
                                if (occupancy[activeFieldID - 54] == false) {
                                    if (finalPosition == activeFieldID - 63 && color[activeFieldID - 63] != black && Math.floor(activeFieldID / 8 - 7) == Math.floor(finalPosition / 8)) {
                                        opponent = pieces[finalPosition];
                                        pieces[activeFieldID] = ""
                                        color[activeFieldID] = ""
                                        occupancy[activeFieldID] = false
                                        pieces[finalPosition] = activeType
                                        occupancy[finalPosition] = true
                                        color[finalPosition] = black
                                        player = white

                                    }
                                }
                                if (finalPosition == activeFieldID - 54 && color[activeFieldID - 54] != black && Math.floor(activeFieldID / 8 - 6) == Math.floor(finalPosition / 8)) {
                                    opponent = pieces[finalPosition];
                                    pieces[activeFieldID] = ""
                                    color[activeFieldID] = ""
                                    occupancy[activeFieldID] = false
                                    pieces[finalPosition] = activeType
                                    occupancy[finalPosition] = true
                                    color[finalPosition] = black
                                    player = white

                                }
                            }
                            if (finalPosition == activeFieldID - 45 && color[activeFieldID - 45] != black && Math.floor(activeFieldID / 8 - 5) == Math.floor(finalPosition / 8)) {
                                opponent = pieces[finalPosition];
                                pieces[activeFieldID] = ""
                                color[activeFieldID] = ""
                                occupancy[activeFieldID] = false
                                pieces[finalPosition] = activeType
                                occupancy[finalPosition] = true
                                color[finalPosition] = black
                                player = white

                            }
                        }
                        if (finalPosition == activeFieldID - 36 && color[activeFieldID - 36] != black && Math.floor(activeFieldID / 8 - 4) == Math.floor(finalPosition / 8)) {
                            opponent = pieces[finalPosition];
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                            player = white

                        }
                    }
                    if (finalPosition == activeFieldID - 27 && color[activeFieldID - 27] != black && Math.floor(activeFieldID / 8 - 3) == Math.floor(finalPosition / 8)) {
                        opponent = pieces[finalPosition];
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white

                    }
                }
                if (finalPosition == activeFieldID - 18 && color[activeFieldID - 18] != black && Math.floor(activeFieldID / 8 - 2) == Math.floor(finalPosition / 8)) {
                    opponent = pieces[finalPosition];
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white

                }
            }
            if (finalPosition == activeFieldID - 9 && color[activeFieldID - 9] != black && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white

            }
        }

        if (activeType == "<img src='Icons/black_king.png'>") {
            if (color[activeFieldID - 1] != black && finalPosition == activeFieldID - 1 && Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            } else if (color[activeFieldID + 1] != black && finalPosition == activeFieldID + 1 && Math.floor(activeFieldID / 8) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            }

            if (color[activeFieldID - 8] != black && finalPosition == activeFieldID - 8 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            } else if (color[activeFieldID + 8] != black && finalPosition == activeFieldID + 8 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            }


            if (color[activeFieldID + 7] != black && finalPosition == activeFieldID + 7 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            } else if (color[activeFieldID + 9] != black && finalPosition == activeFieldID + 9 && Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            }

            if (color[activeFieldID - 7] != black && finalPosition == activeFieldID - 7 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            } else if (color[activeFieldID - 9] != black && finalPosition == activeFieldID - 9 && Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                opponent = pieces[finalPosition];
                pieces[activeFieldID] = ""
                color[activeFieldID] = ""
                occupancy[activeFieldID] = false
                pieces[finalPosition] = activeType
                occupancy[finalPosition] = true
                color[finalPosition] = black
                player = white
            }
        }
    }

    if (activeFieldID == finalPosition) {
        opponent = ""
    }

    row = 0
    col = 0
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

    let id = ""

    if (opponent != "") {
        switch (opponent) {
            case "<img src='Icons/black_pawn.png'>":
                deadBlack[rowWhite] = "<img src='Icons/black_pawn.png'>"
                id = rowWhite + "white"
                document.getElementById(id).innerHTML = deadBlack[rowWhite++]
                break;
            case "<img src='Icons/black_rook.png'>":
                deadBlack[rowWhite] = "<img src='Icons/black_rook.png'>"
                id = rowWhite + "white"
                document.getElementById(id).innerHTML = deadBlack[rowWhite++]
                break;
            case "<img src='Icons/black_knight.png'>":
                deadBlack[rowWhite] = "<img src='Icons/black_knight.png'>"
                id = rowWhite + "white"
                document.getElementById(id).innerHTML = deadBlack[rowWhite++]
                break;
            case "<img src='Icons/black_bishop.png'>":
                deadBlack[rowWhite] = "<img src='Icons/black_bishop.png'>"
                id = rowWhite + "white"
                document.getElementById(id).innerHTML = deadBlack[rowWhite++]
                break;
            case "<img src='Icons/black_queen.png'>":
                deadBlack[rowWhite] = "<img src='Icons/black_queen.png'>"
                id = rowWhite + "white"
                document.getElementById(id).innerHTML = deadBlack[rowWhite++]
                break;
            case "<img src='Icons/black_king.png'>":
                deadBlack[rowWhite] = "<img src='Icons/black_king.png'>"
                id = rowWhite + "white"
                document.getElementById(id).innerHTML = deadBlack[rowWhite++]
                break;
            case "<img src='Icons/white_pawn.png'>":
                deadWhite[rowBlack] = "<img src='Icons/white_pawn.png'>"
                id = rowBlack + "black"
                document.getElementById(id).innerHTML = deadWhite[rowBlack++]
                break;
            case "<img src='Icons/white_rook.png'>":
                deadWhite[rowBlack] = "<img src='Icons/white_rook.png'>"
                id = rowBlack + "black"
                document.getElementById(id).innerHTML = deadWhite[rowBlack++]
                break;
            case "<img src='Icons/white_knight.png'>":
                deadWhite[rowBlack] = "<img src='Icons/white_knight.png'>"
                id = rowBlack + "black"
                document.getElementById(id).innerHTML = deadWhite[rowBlack++]
                break;
            case "<img src='Icons/white_bishop.png'>":
                deadWhite[rowBlack] = "<img src='Icons/white_bishop.png'>"
                id = rowBlack + "black"
                document.getElementById(id).innerHTML = deadWhite[rowBlack++]
                break;
            case "<img src='Icons/white_king.png'>":
                deadWhite[rowBlack] = "<img src='Icons/white_king.png'>"
                id = rowBlack + "black"
                document.getElementById(id).innerHTML = deadWhite[rowBlack++]
                break;
            case "<img src='Icons/white_queen.png'>":
                deadWhite[rowBlack] = "<img src='Icons/white_queen.png'>"
                id = rowBlack + "black"
                document.getElementById(id).innerHTML = deadWhite[rowBlack++]
                break;
        }

    }

    if (opponent == "<img src='Icons/black_king.png'>") {
        alert("Weiss hat gewonnen!")
        CreateChessboard()
    }

    if (opponent == "<img src='Icons/white_king.png'>") {
        alert("Schwarz hat gewonnen!")
        CreateChessboard()
    }

    document.getElementById("player").innerHTML = player + " ist am Zug."

}

CreateChessboard()
chessboard.style = "border-right: outset 5px #000000; border-left: outset 5px #2d2d2d; border-bottom: outset 5px #000000; border-top: outset 5px #2d2d2d"
