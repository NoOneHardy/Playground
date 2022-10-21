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

//Instruction
const instruction = document.getElementById("instruction")

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
    cards.sort(function () { return 0.5 - Math.random() });

    card1.innerHTML = cards[0]
    card1.style = "dispay: inline"
    card2.innerHTML = cards[1]
    card2.style = "display: inline"
    card3.innerHTML = cards[2]
    card3.style = "dispay: inline"
    card4.innerHTML = cards[3]
    card4.style = "display: inline"
    card5.innerHTML = cards[4]
    card5.style = "dispay: inline"
    card6.innerHTML = cards[5]
    card6.style = "display: inline"
    card7.innerHTML = cards[6]
    card7.style = "dispay: inline"
    card8.innerHTML = cards[7]
    card8.style = "display: inline"
    card9.innerHTML = cards[8]
    card9.style = "dispay: inline"
    card10.innerHTML = cards[9]
    card10.style = "display: inline"

    startButton.style = "display: none"
    instruction.style = "display: none"

    setTimeout(HideCards, 15000)
}

function HideCards() {
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

    firstCard.style = "display: inline"
}

function ShowFirstCard() {
    firstCard.style = "display: none"
    nextCard.style = "display: inline"

    card1.style = "display: inline"
    visible[0] = true
}

function ShowNextCard() {
    if (visible[8] == true) {
        card10.style = "display: inline"
        visible[9] = true

        nextCard.style = "display: none"
        menu.style = "display: inline"
    }

    if (visible[7] == true) {
        card9.style = "display: inline"
        visible[8] = true
    }
    
    if (visible[6] == true) {
        card8.style = "display: inline"
        visible[7] = true
    }

    if (visible[5] == true) {
        card7.style = "display: inline"
        visible[6] = true
    }

    if (visible[4] == true) {
        card6.style = "display: inline"
        visible[5] = true
    }

    if (visible[3] == true) {
        card5.style = "display: inline"
        visible[4] = true
    }

    if (visible[2] == true) {
        card4.style = "display: inline"
        visible[3] = true
    }

    if (visible[1] == true) {
        card3.style = "display: inline"
        visible[2] = true
    }

    if (visible[0] == true) {
        card2.style = "display: inline"
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