const player1Points = document.querySelector("#points1")
const player2Points = document.querySelector('#points2')
const total1 = document.querySelector('.total1')
const total2 = document.querySelector('.total2')

function addPoints(player) {
    let player1 = player1Points.innerHTML
    let player2 = player2Points.innerHTML
    if (player === 'player1') {
        player1++
        player1Points.innerHTML = player1
    } else if (player === 'player2') {
        player2++
        player2Points.innerHTML = player2
    }
}

function removePoints(player) {
    let player1 = player1Points.innerHTML
    let player2 = player2Points.innerHTML
    if (player === 'player1' && player1 > 0) {
        player1--
        player1Points.innerHTML = player1
    } else if (player === 'player2' && player2 > 0){
        player2--
        player2Points.innerHTML = player2
    }
}

function finish() {
    let player1 = player1Points.innerHTML
    let player2 = player2Points.innerHTML

    if (player1 > player2) {
        total1.innerHTML++
    } else if (player1 < player2) {
        total2.innerHTML++
    }

    player1Points.innerHTML = 0
    player2Points.innerHTML = 0
}

function save() {
    let game = {
        "total1": total1.innerHTML,
        "total2": total2.innerHTML,
        "pointsPlayer1": player1Points.innerHTML,
        "pointsPlayer2": player2Points.innerHTML
    }

    let saveGame = JSON.stringify(game)
    localStorage.setItem("scoreBoard", saveGame)
}

function load() {
    let saveGame = localStorage.getItem("scoreBoard")
    let game = JSON.parse(saveGame)

    player1Points.innerHTML = game.pointsPlayer1
    player2Points.innerHTML = game.pointsPlayer2
    total1.innerHTML = game.total1
    total2.innerHTML = game.total2
}