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
const logs = document.querySelector('#logs')

playerName1.addEventListener('input', () => {
    document.querySelector('#logPoints1Title').innerHTML = playerName1.value
})

playerName2.addEventListener('input', () => {
    document.querySelector('#logPoints2Title').innerHTML = playerName2.value
})

function addPoints(player) {
    let player1 = player1Points.innerHTML
    let player2 = player2Points.innerHTML
    if (player === 'player1') {
        player1++
        player1Points.innerHTML = player1
        player1Points.classList = 'last'
        player2Points.classList = ''
    } else if (player === 'player2') {
        player2++
        player2Points.innerHTML = player2
        player2Points.classList = 'last'
        player1Points.classList = ''
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
    if (Number(player1Points.innerHTML) > Number(player2Points.innerHTML)) {
        total1.innerHTML++
    } else if (Number(player1Points.innerHTML) < Number(player2Points.innerHTML)) {
        total2.innerHTML++
    }

    let date = new Date()
    let time = new Date()
    
    date = date.getDate() + '.' + (date.getMonth() + 1)+ '.' + date.getFullYear()
    time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()

    logs.innerHTML += '<div class="log"><div class="dateTime">' + date + ' - ' + time + '</div><div class="logPoints" id="logPoints1">' + player1 + '</div><div class="separator">:</div><div class="logPoints" id="logPoints2">' + player2 + '</div></div>'

    player1Points.innerHTML = 0
    player2Points.innerHTML = 0
    player1Points.classList = ''
    player2Points.classList = ''
}

save.addEventListener('click', () => {
    if (saveName.value === "") {
        alert('Ungültiger Spielname.')
    } else {
        let game = {
            "total1": total1.innerHTML,
            "total2": total2.innerHTML,
            "pointsPlayer1": player1Points.innerHTML,
            "pointsPlayer2": player2Points.innerHTML,
            "player1": playerName1.value,
            "player2": playerName2.value,
            "logs": logs.innerHTML,
            "PointClass1": player1Points.classList,
            "PointClass2": player2Points.classList
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
    }
})

function load(name) {
    let saves = localStorage.getItem('saves')
    saves = JSON.parse(saves)
    if (JSON.parse(saves[name]) !== null) {
        game = JSON.parse(saves[name])

        total1.innerHTML = game.total1
        total2.innerHTML = game.total2
        player1Points.innerHTML = game.pointsPlayer1
        player2Points.innerHTML = game.pointsPlayer2
        player1Points.classList = game.PointClass1[0]
        player2Points.classList = game.PointClass2[0]
        playerName1.value = game.player1
        playerName2.value = game.player2
        logs.innerHTML = game.logs

        saveName.value = name
        title.innerHTML = saveName.value
    }
}

function newGame() {
    total1.innerHTML = 0
    total2.innerHTML = 0
    player1Points.innerHTML = 0
    player2Points.innerHTML = 0
    playerName1.value = 'Player 1'
    playerName2.value = 'Player 2'

    logs.innerHTML ='<h2 class="titleForLogs">Logs</h2><div class="logTitle"><div class="dateTime">Datum</div><div class="logPointsTitle" id="logPoints1Title">Player 1</div><div></div><div class="logPointsTitle" id="logPoints2Title">Player 2</div></div>'
    saveName.value = ''
    title.innerHTML = 'New Game'
    player1Points.classList = ''
    player2Points.classList = ''
}

function renderSavedGames() {
    let saves = localStorage.getItem('saves')
    saves = JSON.parse(saves)
    let savedGamesContent = ""
    for (let game in saves) {
        savedGamesContent += '<span class=\'savedGame\' onclick=\'load("' + game + '")\'>' + game + '<span class=\'delete\' onclick=\'deleteSave("' + game + '")\'>x</span></span>'
    }
    savedGames.innerHTML = savedGamesContent
}

saveName.addEventListener('input', () => {
    if (saveName.value == '') {
        title.innerHTML = 'New Game'
    } else {
        title.innerHTML = saveName.value
    }
})

function deleteSave(name) {
    let saves = localStorage.getItem('saves')
    saves = JSON.parse(saves)
    console.log(saves)
    delete saves[name]
    console.log(saves)
    saves = JSON.stringify(saves)
    localStorage.setItem('saves', saves)

    newGame()
    renderSavedGames()
}

renderSavedGames()