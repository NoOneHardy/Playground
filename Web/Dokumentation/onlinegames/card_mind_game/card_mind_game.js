//Don't repeat yourself

//Cards
const card1 = document.getElementById("card1")
const card2 = document.getElementById("card2")
const card3 = document.getElementById("card3")
const card4 = document.getElementById("card4")
const card5 = document.getElementById("card5")
const card6 = document.getElementById("card6")
const card7 = document.getElementById("card7")
const card8 = document.getElementById("card8")
const card9 = document.getElementById("card9")
const card10 = document.getElementById("card10")

//Buttons
const startButton = document.getElementById("start_btn")
const firstCard = document.getElementById("firstCard")
const nextCard = document.getElementById("nextCard")
const menu = document.getElementById("menu")

//Info
const instruction = document.getElementById("instruction")
const time = document.getElementById("time")

//Wichtige Konstanten
const cards = []
for (let x = 0; x < 52;) {
    cards[x] = x++
}

const visible = []
for (x = 0; x < 10;) {
    visible[x] = false
    x++
}

//Spiel Starten
async function StartGame() {
    cards.sort(function () { return 0.5 - Math.random() })

    card1.innerHTML = "<img src='cards/" + cards[0] + ".png'>"
    card1.style = "dispay: inline"
    card2.innerHTML = "<img src='cards/" + cards[1] + ".png'>"
    card2.style = "display: inline"
    card3.innerHTML = "<img src='cards/" + cards[2] + ".png'>"
    card3.style = "dispay: inline"
    card4.innerHTML = "<img src='cards/" + cards[3] + ".png'>"
    card4.style = "display: inline"
    card5.innerHTML = "<img src='cards/" + cards[4] + ".png'>"
    card5.style = "dispay: inline"
    card6.innerHTML = "<img src='cards/" + cards[5] + ".png'>"
    card6.style = "display: inline"
    card7.innerHTML = "<img src='cards/" + cards[6] + ".png'>"
    card7.style = "dispay: inline"
    card8.innerHTML = "<img src='cards/" + cards[7] + ".png'>"
    card8.style = "display: inline"
    card9.innerHTML = "<img src='cards/" + cards[8] + ".png'>"
    card9.style = "dispay: inline"
    card10.innerHTML = "<img src='cards/" + cards[9] + ".png'>"
    card10.style = "display: inline"

    startButton.style = "display: none"
    instruction.style = "display: none"

    setTimeout(HideCards, 15000)
}

function HideCards() {
    card1.innerHTML = "<img src='cards/gray_back.png'>"
    card2.innerHTML = "<img src='cards/gray_back.png'>"
    card3.innerHTML = "<img src='cards/gray_back.png'>"
    card4.innerHTML = "<img src='cards/gray_back.png'>"
    card5.innerHTML = "<img src='cards/gray_back.png'>"
    card6.innerHTML = "<img src='cards/gray_back.png'>"
    card7.innerHTML = "<img src='cards/gray_back.png'>"
    card8.innerHTML = "<img src='cards/gray_back.png'>"
    card9.innerHTML = "<img src='cards/gray_back.png'>"
    card10.innerHTML = "<img src='cards/gray_back.png'>"
    for (x = 0; x < 10;) {
        visible[x] = false
        x++
    }

    firstCard.style = "display: inline"
}

function ShowFirstCard() {
    firstCard.style = "display: none"
    nextCard.style = "display: inline"

    card1.innerHTML = "<img src='cards/" + cards[0] + ".png'>"
    visible[0] = true
}

function ShowNextCard() {
    if (visible[8] == true) {
        card10.innerHTML = "<img src='cards/" + cards[9] + ".png'>"
        visible[9] = true

        nextCard.style = "display: none"
        menu.style = "display: inline"
    }

    if (visible[7] == true) {
        card9.innerHTML = "<img src='cards/" + cards[8] + ".png'>"
        visible[8] = true
    }

    if (visible[6] == true) {
        card8.innerHTML = "<img src='cards/" + cards[7] + ".png'>"
        visible[7] = true
    }

    if (visible[5] == true) {
        card7.innerHTML = "<img src='cards/" + cards[6] + ".png'>"
        visible[6] = true
    }

    if (visible[4] == true) {
        card6.innerHTML = "<img src='cards/" + cards[5] + ".png'>"
        visible[5] = true
    }

    if (visible[3] == true) {
        card5.innerHTML = "<img src='cards/" + cards[4] + ".png'>"
        visible[4] = true
    }

    if (visible[2] == true) {
        card4.innerHTML = "<img src='cards/" + cards[3] + ".png'>"
        visible[3] = true
    }

    if (visible[1] == true) {
        card3.innerHTML = "<img src='cards/" + cards[2] + ".png'>"
        visible[2] = true
    }

    if (visible[0] == true) {
        card2.innerHTML = "<img src='cards/" + cards[1] + ".png'>"
        visible[1] = true
    }
}

function BackToMenu() {
    menu.style = "display: none"

    card1.style = "display: none"
    card2.style = "display: none"
    card3.style = "display: none"
    card4.style = "display: none"
    card5.style = "display: none"
    card6.style = "display: none"
    card7.style = "display: none"
    card8.style = "display: none"
    card9.style = "display: none"
    card10.style = "display: none"
    for (x = 0; x < 10;) {
        visible[x] = false
        x++
    }

    startButton.style = "display: inline"
    instruction.style = "display: inline"
}
