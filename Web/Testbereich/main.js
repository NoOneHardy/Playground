const moveH1Btn = document.getElementById('move-h1-btn')
const changeThemeBtn = document.getElementById('change-theme-btn')
const alertBtn = document.getElementById('alert-btn')
const toggleNumberTableBtn = document.getElementById('toggle-number-table-btn')
const refreshNumberTableBtn = document.getElementById('refresh-number-table-btn')
const numberTableWrapper = document.getElementById('number-table-wrapper')
const numberTableHeightDisplay = document.getElementById('number-table-height-display')
const numberTableWidthDisplay = document.getElementById('number-table-width-display')
const numberTableTotalDisplay = document.getElementById('number-table-total-display')
const numberTableDimensionButtons = {
    addHeight1: document.getElementById('add-height-1'),
    addHeight10: document.getElementById('add-height-10'),
    removeHeight1: document.getElementById('remove-height-1'),
    removeHeight10: document.getElementById('remove-height-10'),
    addWidth1: document.getElementById('add-width-1'),
    addWidth10: document.getElementById('add-width-10'),
    removeWidth1: document.getElementById('remove-width-1'),
    removeWidth10: document.getElementById('remove-width-10')
}

document.querySelectorAll('input[type="text"]').forEach((input) => {
    input.addEventListener('input', (e) => {
        if (e.target.value !== '') {
            e.target.classList.add('dirty')
        } else {
            e.target.classList.remove('dirty')
        }
    })
})

const bodyData = {
    positionH1: 0,
    theme: 0
}

if (moveH1Btn) {
    moveH1Btn.addEventListener('click', () => {
        moveH1()
    })
}

if (changeThemeBtn) {
    changeThemeBtn.addEventListener('click', () => {
        changeTheme()
    })
}

if (alertBtn) {
    alertBtn.addEventListener('click', () => {
        alert('Warning')
    })
}

if (toggleNumberTableBtn) {
    toggleNumberTableBtn.addEventListener('click', () => {
        toggleNumberTable()
    })
}

if (refreshNumberTableBtn) {
    refreshNumberTableBtn.addEventListener('click', () => {
        refreshNumberTable()
    })
}

if (numberTableDimensionButtons.addHeight1) {
    numberTableDimensionButtons.addHeight1.addEventListener('click', () => {
        addHeight(1)
    })
}

if (numberTableDimensionButtons.addHeight10) {
    numberTableDimensionButtons.addHeight10.addEventListener('click', () => {
        addHeight(10)
    })
}

if (numberTableDimensionButtons.removeHeight1) {
    numberTableDimensionButtons.removeHeight1.addEventListener('click', () => {
        addHeight(-1)
    })
}

if (numberTableDimensionButtons.removeHeight10) {
    numberTableDimensionButtons.removeHeight10.addEventListener('click', () => {
        addHeight(-10)
    })
}

if (numberTableDimensionButtons.addWidth1) {
    numberTableDimensionButtons.addWidth1.addEventListener('click', () => {
        addWidth(1)
    })
}

if (numberTableDimensionButtons.addWidth10) {
    numberTableDimensionButtons.addWidth10.addEventListener('click', () => {
        addWidth(10)
    })
}

if (numberTableDimensionButtons.removeWidth1) {
    numberTableDimensionButtons.removeWidth1.addEventListener('click', () => {
        addWidth(-1)
    })
}

if (numberTableDimensionButtons.removeWidth10) {
    numberTableDimensionButtons.removeWidth10.addEventListener('click', () => {
        addWidth(-10)
    })
}

// Move the heading
function moveH1() {
    const h1 = document.querySelector('#move-h1')
    if (!h1 || !h1.classList || h1.classList.length < 1) return

    switch (bodyData.positionH1) {
        case 0:
            h1.classList.remove('left')
            h1.classList.add('center')
            h1.innerHTML = 'horizontally'
            bodyData.positionH1 = 1
            break;
        case 1:
            h1.classList.remove('center')
            h1.classList.add('right')
            h1.innerHTML = "from side to side.";
            bodyData.positionH1 = 2
            break;
        case 2:
            h1.classList.remove('right')
            h1.classList.add('left')
            h1.innerHTML = "I can move";
            bodyData.positionH1 = 0
            break;
    }
}

// Change Theme
function changeTheme() {
    const body = document.querySelector('body')
    if (!body || !body.classList || body.classList.length < 1) return

    switch (bodyData.theme) {
        case 0:
            body.classList.remove('body-1')
            body.classList.add('body-2')
            bodyData.theme = 1
            break;
        case 1:
            body.classList.remove('body-2')
            body.classList.add('body-3')
            bodyData.theme = 2
            break;
        case 2:
            body.classList.remove('body-3')
            body.classList.add('body-1')
            bodyData.theme = 0
            break;
    }
}

const numberTableData = {
    height: 10,
    width: 10,
    displayed: false
}

// Toggle view of the table with numbers
function toggleNumberTable() {
    if (numberTableData.displayed) {
        document.getElementById('number-table').remove()
        numberTableData.displayed = false
        refreshNumberTableBtn.style.display = 'none'
    } else {
        calculateNumberTable()
    }
}

// Refresh the table with numbers
function refreshNumberTable() {
    if (numberTableData.displayed) {
        document.getElementById('number-table').remove()
    }
    calculateNumberTable()
}

// Create a table with numbers
function calculateNumberTable() {
    const numberTable = document.createElement('table')
    numberTable.id = 'number-table'
    let lastNumber = 1
    for (let row = 0; row < numberTableData.height; row++) {
        const rowElement = document.createElement('tr')
        for (let col = 0; col < numberTableData.width; col++) {
            const colElement = document.createElement('td')
            colElement.innerHTML = (lastNumber++).toString()
            rowElement.appendChild(colElement)
        }
        numberTable.appendChild(rowElement)
    }
    numberTableWrapper.appendChild(numberTable)
    numberTableData.displayed = true
    refreshNumberTableBtn.style.display = 'block'
}

const WwN = "WhiteWithoutNumber";
const GwN = "GreenWithNumber";
const BwN = "BlackWithNumber";
const numbers = [];

// Add height
function addHeight(x) {
    numberTableData.height += Number(x)
    if (numberTableData.height <= 0) numberTableData.height = 1
    numberTableHeightDisplay.innerHTML = numberTableData.height
    numberTableTotalDisplay.innerHTML = (numberTableData.height * numberTableData.width).toString()
}

// Add width
function addWidth(x) {
    numberTableData.width += Number(x)
    if (numberTableData.width <= 0) numberTableData.width = 1
    numberTableWidthDisplay.innerHTML = numberTableData.width
    numberTableTotalDisplay.innerHTML = (numberTableData.height * numberTableData.width).toString()
}

// Filter prime numbers and create view model
function createViewModel() {

    // Declare variables
    let number = 0;
    let prime = 0;
    let numberOfFilteredNumbers = 0;

    // Fill array with default values
    for (let x = 1; x <= height * width - 2;) {
        numbers[x] = BwN;
        x++;
    }

    // Main engine
    numberOfFilteredNumbers = 1;
    while (numberOfFilteredNumbers > 0) {
        numberOfFilteredNumbers = 0;

        // Remove 1
        if (number === 0) {
            numbers[number] = WwN;
            number++;
        }

        // Find next prime number
        while (numbers[number] != BwN) {
            number++;
        }

        // Establish prime number and its factor
        prime = ++number;
        number--;
        numbers[number] = GwN;
        number += prime;

        // Filter multiples
        while (number <= numbers.length) {
            if (numbers[number] != WwN) {
                numbers[number] = WwN;
                numberOfFilteredNumbers++;
            }
            number += prime;
        }
        number = prime;
    }
}

// Filter prime numbers and create view
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
            } else {
                if (numbers[number] == GwN) {
                    text += "<td id='GwN'>" + ++number + "</td>";
                } else {
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

// Show date
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

// Hover over paragraph
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
                } else {
                    if (numbers[number] == GwN) {
                        text += "<td id='GwN'>" + ++number + "</td>";
                    } else {
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
    } else {
        while (tableRow < row) {
            text += "<tr>";
            while (tableCol <= width) {
                if (numbers[number] == WwN) {
                    text += "<td id='WwN'>" + "</td>";
                    number++;
                } else {
                    if (numbers[number] == GwN) {
                        text += "<td id='GwN'>" + ++number + "</td>";
                    } else {
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
            } else {
                if (numbers[number] == GwN) {
                    text += "<td id='GwN'>" + ++number + "</td>";
                } else {
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