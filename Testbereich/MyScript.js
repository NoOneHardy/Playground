var height = 10;
var width = 10;

const WwN = "WhiteWithoutNumber";
const GwN = "GreenWithNumber";
const BwN = "BlackWithNumber";
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

//Tabelle neu laden
function RefreshTable() {
    let col = 1;
    let row = 1;

    let number = 0;
    const numbers = [];
    function CreateArray() {
        for (let x = 0; x <= (height * width);) {
            x++;
            numbers[x] = x;
        }
    }

    CreateArray()

    let table_content = '<div style="overflow-x:auto;"><table>';

    while (row <= height) {
        table_content += "<tr>";
        while (col <= width) {
            number++;
            table_content += "<td>" + numbers[number] + "</td>";
            col++;
        }
        table_content += "</tr>";
        row++;
        col = 1;
    }
    table_content += "</table></div>"
    document.getElementById("table").innerHTML = table_content;
    document.getElementById("table_btn").innerHTML = "Tabelle ausblenden";
}

//Tabelle ein- und ausblenden
function CreateTable() {

    if (document.getElementById("table_btn").innerHTML == "Tabelle einblenden") {
        let col = 1;
        let row = 1;

        let number = 0;
        const numbers = [];
        function CreateArray() {
            for (let x = 0; x <= (height * width);) {
                x++;
                numbers[x] = x;
            }
        }

        CreateArray()

        let table_content = '<div style="overflow-x:auto;"><table>';

        while (row <= height) {
            table_content += "<tr>";
            while (col <= width) {
                number++;
                table_content += "<td>" + numbers[number] + "</td>";
                col++;
            }
            table_content += "</tr>";
            row++;
            col = 1;
        }
        table_content += "</table></div>"
        document.getElementById("table").innerHTML = table_content;
        document.getElementById("table_btn").innerHTML = "Tabelle ausblenden";
        document.getElementById("refresh_btn").style = "display:block";
        return
    }

    if (document.getElementById("table_btn").innerHTML == "Tabelle ausblenden") {
        document.getElementById("table").innerHTML = "";
        document.getElementById("table_btn").innerHTML = "Tabelle einblenden"
        document.getElementById("refresh_btn").style = "display:none";
    }
}

//Primzahlen filtern ViewModel erstellen
function CreateViewModel() {

    //Variablen deklarieren
    let number = 0;
    let prime = 0;
    let numberOfFilteredNumbers = 0;

    //Array mit Standartwert füllen
    for (let x = 1; x <= height * width - 2;) {
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

    /*
    let arraystring = numbers.join(" | ")
    document.getElementById('Filter').innerHTML = arraystring;
    */
}

//Primzahlen Filtern View erstellen
function FilterNumbers() {

    //Variablen deklarieren
    let text = "<div style='overflow-x:auto;'><table>";
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

    document.getElementById("filterTable").innerHTML = text;
}

//Heading bewegen
function Move() {

    if (document.getElementById("heading_left")) {
        document.getElementById("heading_left").style.textAlign = "center";
        document.getElementById("heading_left").innerHTML = "horizontally";
        document.getElementById("heading_left").id = "heading_center";
        return
    }

    if (document.getElementById("heading_center")) {
        document.getElementById("heading_center").style.textAlign = "right";
        document.getElementById("heading_center").innerHTML = "from side to side.";
        document.getElementById("heading_center").id = "heading_right";
        return
    }

    if (document.getElementById("heading_right")) {
        document.getElementById("heading_right").style.textAlign = "left";
        document.getElementById("heading_right").innerHTML = "I can move";
        document.getElementById("heading_right").id = "heading_left";
        return
    }
}

//Theme ändern
function Paint() {
    if (document.getElementById("default")) {
        document.getElementById("default").id = "body2";
        return
    }

    if (document.getElementById("body2")) {
        document.getElementById("body2").id = "body3";
        return
    }

    if (document.getElementById("body3")) {
        document.getElementById("body3").id = "default";
        return
    }
}

//Alert auslösen
function Alert() {
    window.alert("Achtung!")
}

const desktop = { type: "Acer", model: "Predator Orion 3000", color: "light_blue" };

//Datum einblenden
function ShowDate() {
    if (document.getElementById("dateHidden")) {
        document.getElementById("dateHidden").innerHTML = Date();
        document.getElementById("dateHidden").id = 'dateShown';
        document.getElementById("showdate").innerHTML = "Datum ausblenden";
        return
    }

    if (document.getElementById("dateShown")) {
        document.getElementById("dateShown").innerHTML = "";
        document.getElementById("dateShown").id = "dateHidden";
        document.getElementById("showdate").innerHTML = "Datum einblenden";
        return
    }
}

//Hover über Paragraph
function TestReplace() {
    let txt = "Hello World!";
    let text = txt.replace("Hello", "Bye bye");

    document.getElementById('demoReplace0').innerHTML = text;
}

var step = 1;
var col = 1;
var row = 0;

function count() {
    let counter1 = document.getElementById("counter1");
    let counter2 = document.getElementById("counter2");

    if (col < width - 1) {
        col++;
        counter1.innerHTML = col;
        step++;
        console.log(step);
        return
    }

    if (col == width - 1) {
        col++;
        row++;
        counter1.innerHTML = col;
        counter2.innerHTML = row;
        step++;
        console.log(step);
        return
    }

    if (row < height && col == width) {
        col = 1;
        counter1.innerHTML = col;
        counter2.innerHTML = row;
        step++;
        console.log(step);
        return
    }

    alert("Rendering Process finished. " + step + " Steps.");
}

function nextStep() {
    //Variablen deklarieren
    let text = "<div style='overflow-x: auto;'><table>";
    let number = 0;
    let prime = 0;
    let numberOfFilteredNumbers = 0;
    let x = 0;

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

    //Render-Prozess ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let tableRow = 0;
    let tableCol = 1;
    number = 0;

    if (col == width) {
        while (tableRow < row) {
            text += "<tr>";
            while (tableCol <= width) {
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
                tableCol++;
            }
            text += "</tr>"
            tableRow++;
            tableCol = 1;
        }
        text += "<tr>"
        while (tableCol <= col % width) {
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
            tableCol++
        }
    }
    text += "</tr></table>"

    document.getElementById("stepTable").innerHTML = text;

}

exports = {}

/*function compare3Teams(teams) {
    teams = teams.sort(function(a, b){
        if (a.ties !== b.ties) {
            return a.ties - b.ties;
        } else if (a.loss !== b.loss) {
            return a.loss - b.loss;
        } else if (a.nGoals !== b.nGoals) {
            return a.nGoals - b.nGoals;
        }
    });
    return teams
}*/