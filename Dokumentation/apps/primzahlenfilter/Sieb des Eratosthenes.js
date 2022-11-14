//Wichtige Variablen
var height = 10
var width = 10
var tableContent = "<div style='overflow-x:auto;'><table class='filterTable'>"
var number = 0;
var step = 1;
var col = 1;
var row = 0;

//Wichtige Konstanten
const WwN = "KeinePrimzahl"
const GwN = "Primfaktor"
const BwN = "Primzahl"
const numbers = []

//Don't repeat yourself-------------------------------------------------
                                                                        
//Height
const inputHeight = document.getElementById("height")
const validHeight = document.getElementById("validHeight")
const displayHeight = document.getElementById("heightDisplay")

//Width
const inputWidth = document.getElementById("width")
const validWidth = document.getElementById("validWidth")
const displayWidth = document.getElementById("widthDisplay")

//Width and Height
const total = document.getElementById("total")

//Table
const table = document.getElementById("table")

//Buttons
const skip = document.getElementById("Skip")
const oneStep = document.getElementById("OneStep")
const showMe = document.getElementById("showMe")

//Höhe eingeben und verarbeiten
function DisplayHeight() {
    if (inputHeight.value < 1) {
        validHeight.innerHTML = "Höhe muss mindestens 1 sein."
    }
    else {
        validHeight.innerHTML = ""
        height = inputHeight.value
        displayHeight.innerHTML = height
        total.innerHTML = height * width
    }
}

//Höhe eingeben und verarbeiten
function DisplayWidth() {
    if (inputWidth.value < 2) {
        validWidth.innerHTML = "Breite muss mindestens 2 sein."
    }
    else {
        validWidth.innerHTML = ""
        width = inputWidth.value
        displayWidth.innerHTML = width
        total.innerHTML = height * width
    }
}

//Primzahlen filtern ViewModel erstellen
function CreateViewModel() {

    //Variablen deklarieren
    let prime = 0;
    number = 0;
    let numberOfFilteredNumbers = 0;
    let x = 0;

    //Array mit Standartwert füllen
    while (x <= height * width - 2) {
        numbers[x] = BwN
        x++
    }

    //Main Engine
    numberOfFilteredNumbers = 1
    while (numberOfFilteredNumbers > 0) {
        numberOfFilteredNumbers = 0

        //"1" entfernen
        if (number == 0) {
            numbers[number] = WwN
            number++
        }

        //Nächste Primzahl finden
        while (numbers[number] != BwN) {
            number++
        }

        //Primzahl und -faktor festlegen
        prime = number + 1
        numbers[number] = GwN
        number += prime

        //Vielfache filtern
        while (number <= numbers.length) {
            if (numbers[number] != WwN) {
                numbers[number] = WwN;
                numberOfFilteredNumbers++
            }
            number += prime
        }
        number = prime
    }
    numbers[prime - 1] = BwN
}

//Primzahlen Filtern View erstellen
function FilterNumbers() {

    //Variablen deklarieren
    let row = 1
    let col = 1
    number = 0;
    tableContent = "<div style='overflow-x:auto;'><table class='filterTable'>"

    //ViewModel erstellen
    CreateViewModel()

    //Tabelle erstellen
    number = 0
    while (row <= height) {
        tableContent += "<tr>"
        while (col <= width) {
            ReadTable()
            col++
        }
        row++
        tableContent += "</tr>"
        col = 1
    }
    tableContent += "</table></div>";

    table.innerHTML = tableContent;
}

//Konstanten übersetzen
function ReadTable() {
    if (numbers[number] == WwN) {
        tableContent += "<td id='WwN' class='filterTD'>" + "</td>"
        number++
    }
    else {
        if (numbers[number] == GwN) {
            tableContent += "<td id='GwN' class='filterTD'>" + ++number + "</td>"
        }
        else {
            if (numbers[number] == BwN) {
                tableContent += "<td id='BwN' class='filterTD'>" + ++number + "</td>"
            }
        }
    }
}

//Funktionen und Tabelle aus/einblenden
var tableStorage = "";
function showTable() {
    if (showMe.innerHTML == '<img src="Icons/visibility.png">') {
        showMe.innerHTML = '<img src="Icons/visibility_off.png">'
        oneStep.style = "display:inline"
        skip.style = "display:inline"
        table.innerHTML = tableStorage;
        return
    }

    if (showMe.innerHTML == '<img src="Icons/visibility_off.png">') {
        showMe.innerHTML = '<img src="Icons/visibility.png">';
        oneStep.style = "display:none";
        skip.style = "display:none";
        tableStorage = table.innerHTML;
        table.innerHTML = "";
        return
    }
}

//Tabelle refreshen
function Skip() {
    FilterNumbers();
    step = 1;
    col = 1;
    row = 0;
}

//Collumns und Rows zählen
function count() {

    if (col < width - 1) {
        col++;
        step++;
        return
    }

    if (col == width - 1) {
        col++;
        row++;
        step++;
        return
    }

    if (row < height && col == width) {
        col = 1;
        step++;
        return
    }

    alert("Rendering Process finished. " + step + " Steps.");
}

//Nächste Zahl darstellen
function nextStep() {
    //Variablen deklarieren
    number = 0;
    let prime = 0;
    let numberOfFilteredNumbers = 0;
    let x = 0;
    tableContent = "<div style='overflow-x:auto;'><table class='filterTable'>"

    count();

    console.log(step);

    //Array mit Standartwert füllen
    while (x <= step - 1) {
        numbers[x] = BwN;
        x++;
    }

    //Main Engine
    numberOfFilteredNumbers = 1;
    while (numberOfFilteredNumbers > 0) {
        numberOfFilteredNumbers = 0;

        //"1" entfernen
        if (number == 0) {
            numbers[number] = WwN;
            number++;
        }

        //Nächste Primzahl finden
        while (numbers[number] != BwN) {
            number++;
        }

        //Primzahl und -faktor festlegen
        prime = number + 1;
        numbers[number] = GwN;
        number += prime;

        //Vielfache filtern
        while (number <= step - 1) {
            if (numbers[number] != WwN) {
                numbers[number] = WwN;
                numberOfFilteredNumbers++;
            }
            number += prime;
        }
        number = prime;
    }
    numbers[prime - 1] = BwN;

    //Render-Prozess
    let tableRow = 0;
    let tableCol = 1;
    number = 0;

    if (col == width) {
        while (tableRow < row) {
            tableContent += "<tr>";
            while (tableCol <= width) {
                ReadTable()
                tableCol++
            }
            tableContent += "</tr>"
            tableRow++
            tableCol = 1;
        }
    }
    else {
        while (tableRow < row) {
            tableContent += "<tr>";
            while (tableCol <= width) {
                ReadTable()
                tableCol++;
            }
            tableContent += "</tr>"
            tableRow++;
            tableCol = 1;
        }
        tableContent += "<tr>"
        while (tableCol <= col % width) {
            ReadTable()
            tableCol++
        }
    }
    tableContent += "</tr></table>"
    table.innerHTML = tableContent;
}