//Wichtige Variablen und Konstanten
var height = 10
var width = 10

const WwN = "KeinePrimzahl"
const GwN = "Primfaktor"
const BwN = "Primzahl"
const numbers = []

//Höhe eingeben und verarbeiten
function DisplayHeight() {
    //Don't repeat yourself
    const inputHeight = document.getElementById("height")
    const validHeight = document.getElementById("validHeight")
    const displayHeight = document.getElementById("heightDisplay")
    const total = document.getElementById("total")

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
    //Don't repeat youself
    var inputWidth = document.getElementById("width")
    var validWidth = document.getElementById("validWidth")
    var displayWidth = document.getElementById("widthDisplay")

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
    let number = 0;
    let numberOfFilteredNumbers = 0;
    let x = 0;

    //Array mit Standartwert füllen
    while (x <= height * width-2) {
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
    let number = 0;
    let text = "<div style='overflow-x:auto;'><table class='filterTable'>"
    
    //ViewModel erstellen
    CreateViewModel()

    //Tabelle erstellen
        while (row <= height) {
            text += "<tr>"
            while (col <= width) {
                if (numbers[number] == WwN) {
                    text += "<td id='WwN' class='filterTD'>" + "</td>"
                    number++
                }
                else {
                    if (numbers[number] == GwN) {
                        text += "<td id='GwN' class='filterTD'>" + ++number + "</td>"
                    }
                    else {
                        if (numbers[number] == BwN) {
                            text += "<td id='BwN' class='filterTD'>" + ++number + "</td>"
                        }
                    }
                }
                col++;
            }
            row++;
            text += "</tr>";
            col = 1;
        }
    text += "</table></div>";

    document.getElementById("table").innerHTML = text;
}

//Funktionen und Tabelle aus/einblenden
var table = "";
function showTable() {
    if (document.getElementById("showMe").innerHTML == '<img src="Icons/visibility.png">') {
        document.getElementById("showMe").innerHTML = '<img src="Icons/visibility_off.png">';
        document.getElementById("OneStep").style="display:inline";
        document.getElementById("Skip").style="display:inline";
        document.getElementById("table").innerHTML = table;
        return
    }

    if (document.getElementById("showMe").innerHTML == '<img src="Icons/visibility_off.png">') {
        document.getElementById("showMe").innerHTML = '<img src="Icons/visibility.png">';
        document.getElementById("OneStep").style="display:none";
        document.getElementById("Skip").style="display:none";
        table = document.getElementById("table").innerHTML;
        document.getElementById("table").innerHTML = "";
        return
    }
}


var step = 1;
var col = 1;
var row = 0;
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

    if (col == width -1) {
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
    let number = 0;
    let prime = 0;
    let numberOfFilteredNumbers = 0;
    let x = 0;
    let text = "<div style='overflow-x:auto;'><table class='filterTable'>"

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
            text += "<tr>";
            while (tableCol <= width) {
                if (numbers[number] == WwN) {
                    text += "<td id='WwN' class='filterTD'>" + "</td>";
                    number++;
                }
                else {
                    if (numbers[number] == GwN) {
                        text += "<td id='GwN' class='filterTD'>" + ++number + "</td>";
                    }
                    else {
                        if (numbers[number] == BwN) {
                            text += "<td id='BwN' class='filterTD'>" + ++number + "</td>";
                        }
                    }
                }
                tableCol++;
            } 
            text += "</tr>"
            tableRow++;
            tableCol = 1;
        }
    }
    else {
        while (tableRow < row) {
            text += "<tr>";
            while (tableCol <= width) {
                if (numbers[number] == WwN) {
                    text += "<td id='WwN' class='filterTD'>" + "</td>";
                    number++;
                }
                else {
                    if (numbers[number] == GwN) {
                        text += "<td id='GwN' class='filterTD'>" + ++number + "</td>";
                    }
                    else {
                        if (numbers[number] == BwN) {
                            text += "<td id='BwN' class='filterTD'>" + ++number + "</td>";
                        }
                    }
                }
                tableCol++;
            } 
            text += "</tr>"
            tableRow++;
            tableCol = 1;
        }
        text += "<tr>"
        while (tableCol <= col % width) {
            if (numbers[number] == WwN) {
                text += "<td id='WwN' class='filterTD'>" + "</td>";
                number++;
            }
            else {
                if (numbers[number] == GwN) {
                    text += "<td id='GwN' class='filterTD'>" + ++number + "</td>";
                }
                else {
                    if (numbers[number] == BwN) {
                        text += "<td id='BwN' class='filterTD'>" + ++number + "</td>";
                    }
                }
            }
            tableCol++
        }
    }
    text += "</tr></table>"
    document.getElementById("table").innerHTML = text;
}