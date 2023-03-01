const player1Points = document.querySelector("#points1")
const player2Points = document.querySelector('#points2')
const total1 = document.querySelector('.total1')
const total2 = document.querySelector('.total2')
const saveName = document.querySelector('#saveName')
const title = document.querySelector('#title')
const save = document.querySelector('#save')
const loadGame = document.querySelector('#loadGame')
const savedGames = document.querySelector('#savedGames')
const savedGame = document.querySelector('.savedGame')
const playerName1 = document.querySelector('#playerName1')
const playerName2 = document.querySelector('#playerName2')

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
    } else if (player === 'player2' && player2 > 0) {
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

save.addEventListener('click', () => {
    if (saveName.value === "") {
        
    }
    let game = {
        "total1": total1.innerHTML,
        "total2": total2.innerHTML,
        "pointsPlayer1": player1Points.innerHTML,
        "pointsPlayer2": player2Points.innerHTML,
        "player1": playerName1.value,
        "player2": playerName2.value
    }

    game = JSON.stringify(game)
    let name = saveName.value
    let saves = {}
    if (localStorage.getItem('saves') !== null) {
        saves = localStorage.getItem('saves')
        saves = JSON.parse(saves)
    }
    saves[name] = game
    saves = JSON.stringify(saves)
    localStorage.setItem('saves', saves)

    renderSavedGames()
})

function load(name) {
    let saves = localStorage.getItem('saves')
    saves = JSON.parse(saves)
    game = JSON.parse(saves[name])
    
    total1.innerHTML = game.total1
    total2.innerHTML = game.total2
    player1Points.innerHTML = game.pointsPlayer1
    player2Points.innerHTML = game.pointsPlayer2
    playerName1.value = game.player1
    playerName2.value = game.player2

    saveName.value = name
}

function renderSavedGames() {
    let saves = localStorage.getItem('saves')
    saves = JSON.parse(saves)
    let savedGamesContent = ""
    for (let game in saves) {
        savedGamesContent += '<span class=\'savedGame\' onclick=\'load("' + game + '")\'>' + game + '</span>'
    }
    savedGames.innerHTML = savedGamesContent
}

function onLoad() {
    title.innerHTML = saveName.value
}

saveName.addEventListener('input', () => {
    if (saveName.value == '') {
        title.innerHTML = 'New Game'
    } else {
        title.innerHTML = saveName.value
    }
})

renderSavedGames()