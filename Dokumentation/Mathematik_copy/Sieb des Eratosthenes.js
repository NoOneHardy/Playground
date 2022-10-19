//Wichtige Variablen und Konstanten
var height = 10;
var width = 10;

const WwN = "KeinePrimzahl";
const GwN = "Primfaktor";
const BwN = "Primzahl";
const numbers = [];

//Höhe hinzufügen
function heightAdd(x) {
    height += x;
    if (height <= 0) {
        height = 1;
    }
    document.getElementById("heightDisplay").innerHTML = height;
    document.getElementById("total").innerHTML = height * width;
}

//Höhe entfernen
function heightRemove(x) {
    height -= x;
    if (height <= 0) {
        height = 1;
    }
    document.getElementById("heightDisplay").innerHTML = height;
    document.getElementById("total").innerHTML = height * width;
}

//Breite hinzufügen
function widthAdd(x) {
    width += x;
    if (width <= 0) {
        width = 1;
    }
    document.getElementById("widthDisplay").innerHTML = width;
    document.getElementById("total").innerHTML = height * width;
}

//Breite entfernen
function widthRemove(x) {
    width -= x;
    if (width <= 0) {
        width = 1;
    }
    document.getElementById("widthDisplay").innerHTML = width;
    document.getElementById("total").innerHTML = height * width;
}

//Primzahlen filtern ViewModel erstellen
function CreateViewModel() {
    
    //Variablen deklarieren
    let prime = 0;
    let number = 0;
    let numberOfFilteredNumbers = 0;

    //Array mit Standartwert füllen
    for (let x = 1; x <= height * width-2;) {
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
        prime = ++number;
        number--;
        numbers[number] = GwN;
        number += prime;
        
        //Vielfache filtern
        while (number <= numbers.length) {
            if (numbers[number] != WwN) {
                numbers[number] = WwN;
                numberOfFilteredNumbers++;
            }
            number += prime;
        }
        number = prime;
    }
    number = --prime;
    numbers[number] = BwN;
}

//Primzahlen Filtern View erstellen
function FilterNumbers() {

    //Variablen deklarieren
    let text = "<div style='overflow-x:auto;'><table class='filterTable'>";
    let row = 1;
    let col = 1;
    let number = 0;
    
    //ViewModel erstellen
    CreateViewModel();

    //Tabelle erstellen
        while (row <= height) {
            text += "<tr>";
            while (col <= width) {
                if (numbers[number] == WwN) {
                    text += "<td id='WwN'>" + "</td>";
                    number++;
                }
                else {
                    if (numbers[number] == GwN) {
                        text += "<td id='GwN'>" + ++number + "</td>";
                    }
                    else {
                        if (numbers[number] == BwN) {
                            text += "<td id='BwN'>" + ++number + "</td>";
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

//Tabelle aus/einblenden
function showTable() {
    if (document.getElementById("showMe").innerHTML == '<img src="Icons/visibility.png">') {
        document.getElementById("showMe").innerHTML = '<img src="Icons/visibility_off.png">';
        document.getElementById("refresh").style="display:inline";
        FilterNumbers();
        return
    }

    if (document.getElementById("showMe").innerHTML == '<img src="Icons/visibility_off.png">') {
        document.getElementById("showMe").innerHTML = '<img src="Icons/visibility.png">';
        document.getElementById("refresh").style="display:none";
        document.getElementById("table").innerHTML = "";
        return
    }
}

//Tabelle refreshen
function refreshTable() {
    if (document.getElementById("table").innerHTML != "") {
        FilterNumbers();
    }
}