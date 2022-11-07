// Important variables
var col = 0
var row = 0
var rowWhite = 1
var rowBlack = 1
var indexWhite = 1
var indexBlack = 1
var boardContent = "<table  class='chessboard'>"
var activeFieldID = 0
var finalPosition = 0
var thisPiece = ""
var player = "Weiss";
var opponent = ""
var id = ""


//DRY
const blackDeathList = document.getElementById("blackDeathList")
const chessboard = document.getElementById("chessboard")
const whiteDeathList = document.getElementById("whiteDeathList")

//Important constants
const occupancy = []
const color = []
const pieces = []
const deadWhite = []
const deadBlack = []
const deadWhitePawns = []
const deadBlackPawns = []
const white = "Weiss"
const black = "Schwarz"

//Create the chessboard
function CreateChessboard() {
    //Reset variables
    activeFieldID = 0
    boardContent = "<table  class='chessboard'>"
    row = 0
    col = 0
    player = white
    let id = ""

    //Reset Deathlist
    for (let x = 1; x <= 8;) {
        id = "white" + x
        document.getElementById(id).innerHTML = ""
        deadWhite[x] = ""
        deadWhitePawns[x] = ""
        id = "black" + x
        document.getElementById(id).innerHTML = ""
        deadBlack[x] = ""
        deadBlackPawns[x] = ""
        x++
    }

    //Add pieces
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


    //Add colors
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

    //Create table
    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            //Set the occupancy
            if (pieces[activeFieldID] == "") {
                occupancy[activeFieldID] = false
            }
            else {
                occupancy[activeFieldID] = true
            }
            //Adding a function to select which piece should move, the fieldID and the piece
            boardContent += "<td class='piece' onclick='move(" + activeFieldID + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
            col++
        }
        boardContent += "</tr>"
        row++
        col = 0
    }
    boardContent += "</table>"
    //Visualize the table
    chessboard.innerHTML = boardContent
}

//Choose which piece should move
function move(startPosition) {
    //Checking if there is a piece
    if (occupancy[startPosition] == false) {
        alert("Hier steht keine Figur.")
    } else {

        //Reset Variables
        boardContent = "<table  class='chessboard' id='chessboard'>"
        row = 0
        col = 0
        activeFieldID = 0

        //Create a new Table
        while (row < 8) {
            boardContent += "<tr>"
            while (col < 8) {
                //Adding a function to select where the active piece should move to, the fieldID and the piece
                boardContent += "<td class='piece' onclick='toHere(" + activeFieldID + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
                col++
            }
            boardContent += "</tr>"
            row++
            col = 0
        }
        boardContent += "</table>"
        //Visualize the new table
        chessboard.innerHTML = boardContent
        //Modify the border of the chessboard
        chessboard.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"
        activeFieldID = startPosition
    }
}

//Choose where the function should move to
function toHere(target) {
    //Reset the opponent
    finalPosition = target
    opponent = ""
    //Set the activeType
    var activeType = pieces[activeFieldID]

    //Check if it's white's turn
    if (player == white) {
        indexWhite = 1
        //Check if the active piece is a white pawn
        if (activeType == "<img src='Icons/white_pawn.png'>") {
            //Check if there is a black piece 
            if (color[finalPosition] == black) {
                //Check if the target field is diagonal left
                if (finalPosition == activeFieldID - 9) {
                    //Check if the target field is one row further
                    if (Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                        //Check if the target field is in the last row
                        if (finalPosition < 8 && deadWhite != []) {
                            //Reset variables
                            player = "Niemand"
                            row = 0
                            col = 0
                            indexWhite = 1
                            let reviveType
                            //Modify the deathlists
                            while (row < 8) {
                                col = 0
                                while (col < 2) {
                                    //Set a ID
                                    id = "black" + indexWhite
                                    //Save the type
                                    reviveType = document.getElementById(id).innerHTML
                                    //Check if the type is a pawn
                                    if (reviveType == '<img src="cons/white_pawn.png">') {
                                        //Do nothing
                                        document.getElementById(id).innerHTML = '<img src="Icons/white_pawn.png">'
                                    //Check if the field is empty
                                    } else if (reviveType == "") {
                                        //Do nothing
                                        document.getElementById(id).innerHTML = ""
                                    } else {
                                        //Make a button with the revive function and the index of the field and the color as parameter and the type as content
                                        document.getElementById(id).innerHTML = "<button onclick='revive(" + indexWhite + ", white)'>" + reviveType + "</button>"
                                    }
                                    col++
                                    indexWhite++
                                }
                                row++
                            }
                            //Modify the border of the black Deathlist
                            blackDeathList.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"
                            //Set the piece to nothing
                            //Set the color to nothing
                            //Set the occupancy to not occupied
                            //Set the piece of the new position to the active type
                            //Set the occupancy of the new position to occupied
                            //Set the color of the new position to white
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                        } else {
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
                } else if (finalPosition == activeFieldID - 7) {
                    if (Math.floor(activeFieldID / 8 - 1) == Math.floor(finalPosition / 8)) {
                        if (finalPosition < 8 && deadWhite != []) {
                            player = "Niemand"
                            row = 0
                            col = 0
                            indexWhite = 1
                            let reviveType
        
                            while (row < 8) {
                                col = 0
                                while (col < 2) {
                                    id = "black" + indexWhite
                                    reviveType = document.getElementById(id).innerHTML
                                    if (reviveType == '<img src="Icons/white_pawn.png">') {
                                        document.getElementById(id).innerHTML = '<img src="Icons/white_pawn.png">'
                                    } else if (reviveType == "") {
                                        document.getElementById(id).innerHTML = ""
                                    } else {
                                        document.getElementById(id).innerHTML = "<button onclick='revive(" + indexWhite + ", white)'>" + reviveType + "</button>"
                                    }
                                    col++
                                    indexWhite++
                                }
                                row++
                            }
                            blackDeathList.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"
        
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = white
                        } else {
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
            } else if (finalPosition == activeFieldID - 16) {
                if (activeFieldID > 47) {
                    if (color[activeFieldID - 16] != white && color[activeFieldID - 8] != white) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = white
                        player = black
                    }
                }
            } else if (color[activeFieldID - 8] != white && finalPosition == activeFieldID - 8) {
                if (finalPosition < 8 && deadWhite != []) {
                    player = "Niemand"
                    row = 0
                    col = 0
                    indexWhite = 1
                    let reviveType

                    while (row < 8) {
                        col = 0
                        while (col < 2) {
                            id = "black" + indexWhite
                            reviveType = document.getElementById(id).innerHTML
                            if (reviveType == '<img src="Icons/white_pawn.png">') {
                                document.getElementById(id).innerHTML = '<img src="Icons/white_pawn.png">'
                            } else if (reviveType == "") {
                                document.getElementById(id).innerHTML = ""
                            } else {
                                document.getElementById(id).innerHTML = "<button onclick='revive(" + indexWhite + ", white)'>" + reviveType + "</button>"
                            }
                            col++
                            indexWhite++
                        }
                        row++
                    }
                    blackDeathList.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"

                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                } else {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = white
                    player = black
                }
            }
        } else if (activeType == "<img src='Icons/white_rook.png'>") {
            if (color[activeFieldID - 8] == "") {
                if (color[activeFieldID - 16] == "") {
                    if (color[activeFieldID - 24] == "") {
                        if (color[activeFieldID - 32] == "") {
                            if (color[activeFieldID - 40] == "") {
                                if (color[activeFieldID - 48] == "") {
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
        } else if (activeType == "<img src='Icons/white_knight.png'>") {
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
        } else if (activeType == "<img src='Icons/white_bishop.png'>") {
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
        } else if (activeType == "<img src='Icons/white_queen.png'>") {
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
        } else if (activeType == "<img src='Icons/white_king.png'>") {
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
            if (color[finalPosition] == white) {
                if (finalPosition == activeFieldID + 9) {
                    if (Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                        if (finalPosition > 55 && deadBlack != "") {
                            player = "Niemand"
                            row = 0
                            col = 0
                            indexBlack = 1
                            let reviveType
        
                            while (row < 8) {
                                col = 0
                                while (col < 2) {
                                    id = "white" + indexBlack
                                    reviveType = document.getElementById(id).innerHTML
                                    if (reviveType == '<img src="Icons/black_pawn.png">') {
                                        document.getElementById(id).innerHTML = '<img src="Icons/black_pawn.png">'
                                    } else if (reviveType == "") {
                                        document.getElementById(id).innerHTML = ""
                                    } else {
                                        document.getElementById(id).innerHTML = "<button onclick='revive(" + indexBlack + ", black)'>" + reviveType + "</button>"
                                    }
                                    indexBlack++
                                    col++
                                }
                                row++
                            }
                            whiteDeathList.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"
        
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                        } else {
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
                } else if (finalPosition == activeFieldID + 7) {
                    if (Math.floor(activeFieldID / 8 + 1) == Math.floor(finalPosition / 8)) {
                        if (finalPosition > 55 && deadBlack != "") {
                            player = "Niemand"
                            row = 0
                            col = 0
                            indexBlack = 1
                            let reviveType
        
                            while (row < 8) {
                                col = 0
                                while (col < 2) {
                                    id = "white" + indexBlack
                                    reviveType = document.getElementById(id).innerHTML
                                    if (reviveType == '<img src="Icons/black_pawn.png">') {
                                        document.getElementById(id).innerHTML = '<img src="Icons/black_pawn.png">'
                                    } else if (reviveType == "") {
                                        document.getElementById(id).innerHTML = ""
                                    } else {
                                        document.getElementById(id).innerHTML = "<button onclick='revive(" + indexBlack + ", black)'>" + reviveType + "</button>"
                                    }
                                    indexBlack++
                                    col++
                                }
                                row++
                            }
                            whiteDeathList.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"
        
                            pieces[activeFieldID] = ""
                            color[activeFieldID] = ""
                            occupancy[activeFieldID] = false
                            pieces[finalPosition] = activeType
                            occupancy[finalPosition] = true
                            color[finalPosition] = black
                        } else {
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
            } else if (finalPosition == activeFieldID + 16) {
                if (activeFieldID < 16) {
                    if (color[activeFieldID + 16] != black && color[activeFieldID + 8] != black) {
                        pieces[activeFieldID] = ""
                        color[activeFieldID] = ""
                        occupancy[activeFieldID] = false
                        pieces[finalPosition] = activeType
                        occupancy[finalPosition] = true
                        color[finalPosition] = black
                        player = white
                    }
                }
            } else if (color[activeFieldID + 8] != black && finalPosition == activeFieldID + 8) {
                if (finalPosition > 55 && deadBlack != "") {
                    player = "Niemand"
                    row = 0
                    col = 0
                    indexBlack = 1
                    let reviveType

                    while (row < 8) {
                        col = 0
                        while (col < 2) {
                            id = "white" + indexBlack
                            reviveType = document.getElementById(id).innerHTML
                            if (reviveType == '<img src="Icons/black_pawn.png">') {
                                document.getElementById(id).innerHTML = '<img src="Icons/black_pawn.png">'
                            } else if (reviveType == "") {
                                document.getElementById(id).innerHTML = ""
                            } else {
                                document.getElementById(id).innerHTML = "<button onclick='revive(" + indexBlack + ", black)'>" + reviveType + "</button>"
                            }
                            indexBlack++
                            col++
                        }
                        row++
                    }
                    whiteDeathList.style = "border-right: outset 5px #2d2dd4; border-left: outset 5px #4f4ff6; border-bottom: outset 5px #2d2dd4; border-top: outset 5px #4f4ff6"

                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                } else {
                    pieces[activeFieldID] = ""
                    color[activeFieldID] = ""
                    occupancy[activeFieldID] = false
                    pieces[finalPosition] = activeType
                    occupancy[finalPosition] = true
                    color[finalPosition] = black
                    player = white
                }
            }
        } else if (activeType == "<img src='Icons/black_rook.png'>") {
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
        } else if (activeType == "<img src='Icons/black_knight.png'>") {
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
        } else if (activeType == "<img src='Icons/black_bishop.png'>") {
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
        } else if (activeType == "<img src='Icons/black_queen.png'>") {
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
        } else if (activeType == "<img src='Icons/black_king.png'>") {
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

    if (opponent != "") {
        switch (opponent) {
            case "<img src='Icons/black_pawn.png'>":
                deadBlackPawns[rowWhite++] = "<img src='Icons/black_pawn.png'>"
                break;
            case "<img src='Icons/black_rook.png'>":
                deadBlack[rowWhite++] = "<img src='Icons/black_rook.png'>"
                break;
            case "<img src='Icons/black_knight.png'>":
                deadBlack[rowWhite++] = "<img src='Icons/black_knight.png'>"
                break;
            case "<img src='Icons/black_bishop.png'>":
                deadBlack[rowWhite++] = "<img src='Icons/black_bishop.png'>"
                break;
            case "<img src='Icons/black_queen.png'>":
                deadBlack[rowWhite++] = "<img src='Icons/black_queen.png'>"
                break;
            case "<img src='Icons/black_king.png'>":
                deadBlack[rowWhite++] = "<img src='Icons/black_king.png'>"
                break;
            case "<img src='Icons/white_pawn.png'>":
                deadWhitePawns[rowBlack++] = "<img src='Icons/white_pawn.png'>"
                break;
            case "<img src='Icons/white_rook.png'>":
                deadWhite[rowBlack++] = "<img src='Icons/white_rook.png'>"
                break;
            case "<img src='Icons/white_knight.png'>":
                deadWhite[rowBlack++] = "<img src='Icons/white_knight.png'>"
                break;
            case "<img src='Icons/white_bishop.png'>":
                deadWhite[rowBlack++] = "<img src='Icons/white_bishop.png'>"
                break;
            case "<img src='Icons/white_king.png'>":
                deadWhite[rowBlack++] = "<img src='Icons/white_king.png'>"
                break;
            case "<img src='Icons/white_queen.png'>":
                deadWhite[rowBlack++] = "<img src='Icons/white_queen.png'>"
                break;
        }

        for (let x = 0; x < 16;) {
            x++
            id = "black" + x
            document.getElementById(id).innerHTML = ""
            id = "white" + x
            document.getElementById(id).innerHTML = ""
        }

        indexBlack = 1
        indexWhite = 1

        while (indexBlack <= 16) {
            id = "black" + indexBlack
            switch (deadWhite[indexBlack]) {
                case "<img src='Icons/white_rook.png'>":
                    document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                    break;
                case "<img src='Icons/white_knight.png'>":
                    document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                    break;
                case "<img src='Icons/white_bishop.png'>":
                    document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                    break;
                case "<img src='Icons/white_king.png'>":
                    document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                    break;
                case "<img src='Icons/white_queen.png'>":
                    document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                    break;
                default:
                    document.getElementById(id).innerHTML = ""
                    indexBlack++
            }
        }

        while (indexWhite <= 16) {
            id = "white" + indexWhite
            if (deadBlackPawns[indexWhite] == "<img src='Icons/black_pawn.png'>") {
                document.getElementById(id).innerHTML = deadBlackPawns[indexWhite++]
            } else {
                document.getElementById(id).innerHTML = ""
                indexWhite++
            }
        }

        indexBlack = 1
        indexWhite = 1

        while (indexBlack <= 16) {
            id = "black" + indexBlack
            if (deadWhitePawns[indexBlack] == "<img src='Icons/white_pawn.png'>") {
                document.getElementById(id).innerHTML = deadWhitePawns[indexBlack++]
            } else {
                indexBlack++
            }
        }

        while (indexWhite <= 16) {
            id = "white" + indexWhite
            switch (deadBlack[indexWhite]) {
                case "<img src='Icons/black_rook.png'>":
                    document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                    break;
                case "<img src='Icons/black_knight.png'>":
                    document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                    break;
                case "<img src='Icons/black_bishop.png'>":
                    document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                    break;
                case "<img src='Icons/black_queen.png'>":
                    document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                    break;
                case "<img src='Icons/black_king.png'>":
                    document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                    break;
                default:
                    indexWhite++
            }
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

function revive(index, colour) {
    if (colour == white) {
        pieces[finalPosition] = deadWhite[index]
        deadWhitePawns[index] = "<img src='Icons/white_pawn.png'>"
        deadWhite[index] = ""
        occupancy[finalPosition] = true
        color[finalPosition] = white
        player = black
    } else if (colour == black) {
        pieces[finalPosition] = deadBlack[index]
        deadBlackPawns[index] = "<img src='Icons/black_pawn.png'>"
        deadBlack[index] = ""
        occupancy[finalPosition] = true
        color[finalPosition] = black
        player = white
    }

    blackDeathList.style = "border-right: outset 5px #000000; border-left: outset 5px #2d2d2d; border-bottom: outset 5px #000000; border-top: outset 5px #2d2d2d"
    whiteDeathList.style = "border-right: outset 5px #000000; border-left: outset 5px #2d2d2d; border-bottom: outset 5px #000000; border-top: outset 5px #2d2d2d"

    for (let x = 0; x < 16;) {
        x++
        id = "black" + x
        document.getElementById(id).innerHTML = ""
        id = "white" + x
        document.getElementById(id).innerHTML = ""
    }

    indexBlack = 1
    indexWhite = 1

    while (indexBlack <= 16) {
        id = "black" + indexBlack
        switch (deadWhite[indexBlack]) {
            case "<img src='Icons/white_rook.png'>":
                document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                break;
            case "<img src='Icons/white_knight.png'>":
                document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                break;
            case "<img src='Icons/white_bishop.png'>":
                document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                break;
            case "<img src='Icons/white_king.png'>":
                document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                break;
            case "<img src='Icons/white_queen.png'>":
                document.getElementById(id).innerHTML = deadWhite[indexBlack++]
                break;
            default:
                document.getElementById(id).innerHTML = ""
                indexBlack++
        }
    }

    while (indexWhite <= 16) {
        id = "white" + indexWhite
        if (deadBlackPawns[indexWhite] == "<img src='Icons/black_pawn.png'>") {
            document.getElementById(id).innerHTML = deadBlackPawns[indexWhite++]
        } else {
            document.getElementById(id).innerHTML = ""
            indexWhite++
        }
    }

    indexBlack = 1
    indexWhite = 1

    while (indexBlack <= 16) {
        id = "black" + indexBlack
        if (deadWhitePawns[indexBlack] == "<img src='Icons/white_pawn.png'>") {
            document.getElementById(id).innerHTML = deadWhitePawns[indexBlack++]
        } else {
            indexBlack++
        }
    }

    while (indexWhite <= 16) {
        id = "white" + indexWhite
        switch (deadBlack[indexWhite]) {
            case "<img src='Icons/black_rook.png'>":
                document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                break;
            case "<img src='Icons/black_knight.png'>":
                document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                break;
            case "<img src='Icons/black_bishop.png'>":
                document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                break;
            case "<img src='Icons/black_queen.png'>":
                document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                break;
            case "<img src='Icons/black_king.png'>":
                document.getElementById(id).innerHTML = deadBlack[indexWhite++]
                break;
            default:
                indexWhite++
        }
    }

    row = 0
    col = 0
    activeFieldID = 0
    boardContent = "<table  class='chessboard' id='chessboard'>"

    while (row < 8) {
        boardContent += "<tr>"
        while (col < 8) {
            //Set the occupancy
            if (pieces[activeFieldID] == "") {
                occupancy[activeFieldID] = false
            }
            else {
                occupancy[activeFieldID] = true
            }
            //Adding a function to select which piece should move, the fieldID and the piece
            boardContent += "<td class='piece' onclick='move(" + activeFieldID + ")' id='" + activeFieldID + "'>" + pieces[activeFieldID++] + "</td>"
            col++
        }
        boardContent += "</tr>"
        row++
        col = 0
    }
    boardContent += "</table>"
    chessboard.innerHTML = boardContent
    document.getElementById("player").innerHTML = player + " ist am Zug."
}

CreateChessboard()
chessboard.style = "border-right: outset 5px #000000; border-left: outset 5px #2d2d2d; border-bottom: outset 5px #000000; border-top: outset 5px #2d2d2d"
