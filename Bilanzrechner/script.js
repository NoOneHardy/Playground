const calc = document.querySelector('#bilanz1')
const table = document.querySelector('.input')
const activeEnd = document.querySelector('#activeEnd')
const passiveEnd = document.querySelector('#passiveEnd')
const activeSumDisplay = document.querySelector('#activeSumDisplay')
const passiveSumDisplay = document.querySelector('#passiveSumDisplay')
const activeDifDisplay = document.querySelector('#activeDifDisplay')
const passiveDifDisplay = document.querySelector('#passiveDifDisplay')

const tbody = '<tbody>'
const tbodyEnd = '</tbody>'
var rowCount = 3

function calculate() {
    let sumActive = 0
    let sumPassive = 0
    const activeValues = []
    const passiveValues = []

    for (i = 0; i <= rowCount; i++) {
        activeValues[i] = Number(document.querySelector('#activeValue' + i).value)
        passiveValues[i] = Number(document.querySelector('#passiveValue' + i).value )
    }

    for (i = 0; i < activeValues.length; i++) {
        sumActive += Number(activeValues[i])
        sumPassive += Number(passiveValues[i])
    }

    activeSumDisplay.innerHTML = sumActive
    passiveSumDisplay.innerHTML = sumPassive

    let dif = calcDif(sumActive, sumPassive)

    finish(dif, sumActive, sumPassive)
}

function addRow() {
    rowCount++
    const activeTableValues = []
    const passiveTableValues = []
    const activeTableNames = []
    const passiveTableNames = []
    for (i = 0; i < rowCount; i++) {
        activeTableValues[i] = document.querySelector('#activeValue' + i).value
        passiveTableValues[i] = document.querySelector('#passiveValue' + i).value
        activeTableNames[i] = document.querySelector('#active' + i).value
        passiveTableNames[i] = document.querySelector('#passive' + i).value
    }
    let tableContent = table.innerHTML.slice(7, -8)
    let rowContent = '<tr><td>'
    rowContent += '<input type="text" name="active' + rowCount + '" id="active' + rowCount + '" class="active" placeholder="z.B. Kasse">'
    rowContent += '</td><td>'
    rowContent += '<input type="number" name="active' + rowCount + '" id="activeValue' + rowCount + '" class="activeValue" placeholder="0">'
    rowContent += '</td><td>'
    rowContent += '<input type="text" name="passive' + rowCount + '" id="passive' + rowCount + '" class="passive" placeholder="z.B. Darlehen">'
    rowContent += '</td><td>'
    rowContent += '<input type="number" name="passive' + rowCount + '" id="passiveValue' + rowCount + '" class="passiveValue" placeholder="0">'
    rowContent += '</td></tr>'
    table.innerHTML = tbody + tableContent + rowContent + tbodyEnd
    for (i = 0; i < rowCount; i++) {
        document.querySelector('#activeValue' + i).value = activeTableValues[i]
        document.querySelector('#passiveValue' + i).value = passiveTableValues[i]
        document.querySelector('#active' + i).value = activeTableNames[i]
        document.querySelector('#passive' + i).value = passiveTableNames[i]
    }
}

function calcDif(sumActive, sumPassive) {
    let dif = sumActive - sumPassive
    
    if (dif > 0) {
        activeDifDisplay.innerHTML = ''
        passiveDifDisplay.innerHTML = 'Gewinn: ' + dif
    } else if (dif < 0) {
        activeDifDisplay.innerHTML = 'Verlust: ' + dif
        passiveDifDisplay.innerHTML = ''
    } else {
        passiveDifDisplay.innerHTML = 'Gewinn: ' + 0
    }

    return dif
}

function finish(dif, sumActive, sumPassive) {
    if (dif < 0) {
        activeEnd.innerHTML = sumActive - dif
        passiveEnd.innerHTML = sumPassive
    } else if (dif > 0) {
        activeEnd.innerHTML = sumActive
        passiveEnd.innerHTML = sumPassive + dif
    } else {
        activeEnd.innerHTML = sumActive
        passiveEnd.innerHTML = sumPassive
    }
}
