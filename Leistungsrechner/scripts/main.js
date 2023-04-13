const scheinleistungInput = document.querySelector('#S')
const wirkleistungInput = document.querySelector('#P')
const blindleistungInput = document.querySelector('#Q')
const powerFaktorInput = document.querySelector('#p')
const phase1Input = document.querySelector('#phase1')
const phase3Input = document.querySelector('#phase3')
const spitzenSpannungInput = document.querySelector('#Û')
const effektivSpannungInput = document.querySelector('#U')
const spitzenStromInput = document.querySelector('#Î')
const effektivStromInput = document.querySelector('#I')
const resultText = document.querySelector('.resultText')

function calc() {
    if (phase1.checked) {
        if ((effektivSpannungInput.value !== '' || spitzenSpannungInput.value !== '') && (spitzenStromInput.value !== '' || effektivStromInput.value !== '')) {
            let strom = 0
            if (effektivStromInput.value === '') {
                let spitzenStrom = getBase(spitzenStromInput)
                effektivStromInput.value = spitzenStrom / (2**0.5)
            }
            strom = getBase(effektivStromInput)
            let spannung = 0
            if (effektivSpannungInput.value === '') {
                let spitzenSpannung = getBase(spitzenSpannungInput)
                effektivSpannungInput.value = spitzenSpannung / (2**0.5)
            }
            spannung = getBase(effektivSpannungInput)

            let result = spannung * strom
            result = formatResult(result)
            resultText.innerHTML = 'Die Scheinleistung ist: ' + result + 'VA'
            resultText.style = 'display: block;'
        }
    } else if (phase3.checked) {
        if ((effektivSpannungInput.value !== '' || spitzenSpannungInput.value !== '') && (spitzenStromInput.value !== '' || effektivStromInput.value !== '')) {
            let strom = 0
            if (effektivStromInput.value === '') {
                let spitzenStrom = getBase(spitzenStromInput)
                effektivStromInput.value = spitzenStrom / (2**0.5)
            }
            strom = getBase(effektivStromInput)
            let spannung = 0
            if (effektivSpannungInput.value === '') {
                let spitzenSpannung = getBase(spitzenSpannungInput)
                effektivSpannungInput.value = spitzenSpannung / (2**0.5)
            }
            spannung = getBase(effektivSpannungInput)

            let result = spannung * strom * (3 ** 0.5)
            result = formatResult(result)
            resultText.innerHTML = 'Die Scheinleistung ist: ' + result + 'VA'
            resultText.style = 'display: block;'
        }
    }
    if (spitzenSpannungInput.value !== '' && spitzenStromInput.value === '' && effektivStromInput.value === '') {
        let spitzenSpannung = getBase(spitzenSpannungInput)
        let result = spitzenSpannung / (2**0.5)
        result = formatResult(result)
        resultText.innerHTML = 'Die effektive Spannung ist: ' + result + 'V'
        resultText.style = 'display: block;'
        return
    } else if (effektivSpannungInput.value !== '' && spitzenStromInput.value === '' && effektivStromInput.value === '') {
        let effektivSpannung = getBase(effektivSpannungInput)
        let result = effektivSpannung * (2**0.5)
        result = formatResult(result)
        resultText.innerHTML = 'Die Scheitelspannung ist: ' + result + 'V'
        resultText.style = 'display: block;'
        return
    } else if (spitzenStromInput.value !== '' && spitzenSpannungInput.value === '' && effektivSpannungInput.value === '') {
        let spitzenStrom = getBase(spitzenStromInput)
        let result = spitzenStrom / (2**0.5)
        result = formatResult(result)
        resultText.innerHTML = 'Der effektive Strom ist: ' + result + 'A'
        resultText.style = 'display: block;'
        return
    } else if (effektivStromInput.value !== '' && spitzenSpannungInput.value === '' && effektivSpannungInput.value === '') {
        let scheitelStrom = getBase(effektivStromInput)
        let result = scheitelStrom * (2**0.5)
        result = formatResult(result)
        resultText.innerHTML = 'Der Scheitelstrom ist: ' + result + 'A'
        resultText.style = 'display: block;'
        return
    } else if (scheinleistungInput.value !== '' && wirkleistungInput.value !== '') {
        let scheinleistung = getBase(scheinleistungInput)
        let wirkleistung = getBase(wirkleistungInput)
        let result = (scheinleistung ** 2 - wirkleistung ** 2) ** 0.5
        result = formatResult(result)
        resultText.innerHTML = 'Die Blindleistung ist: ' + result + 'var'
        resultText.style = 'display: block;'
        return
    } else if (scheinleistungInput.value !== '' && blindleistungInput.value !== '') {
        let scheinleistung = getBase(scheinleistungInput)
        let blindleistung = getBase(blindleistungInput)
        let result = (scheinleistung ** 2 - blindleistung ** 2) ** 0.5
        result = formatResult(result)
        resultText.innerHTML = 'Die Wirkleistung ist: ' + result + 'W'
        resultText.style = 'display: block;'
        return
    } else if (wirkleistungInput.value !== '' && blindleistungInput.value !== '') {
        let wirkleistung = getBase(wirkleistungInput)
        let blindleistung = getBase(blindleistungInput)
        let result = (wirkleistung ** 2 + blindleistung ** 2) ** 0.5
        result = formatResult(result)
        resultText.innerHTML = 'Die Scheinleistung ist: ' + result + 'VA'
        resultText.style = 'display: block;'
        return
    } else if (scheinleistungInput.value !== '' && powerFaktorInput.value !== '') {
        let scheinleistung = getBase(scheinleistungInput)
        let powerFaktor = powerFaktorInput.value
        let result = scheinleistung * powerFaktor
        result = formatResult(result)
        resultText.innerHTML = 'Die Wirkleistung ist: ' + result + 'W'
        resultText.style = 'display: block;'
        return
    } 
}

function getBase(object) {
    let vorsatzId = '#' + object.id + '2'
    let vorsatzInput = document.querySelector(vorsatzId)
    let vorsatz = vorsatzInput.value
    switch (vorsatz) {
        case 'nano':
            object.value /= 1000
        case 'mikro':
            object.value /= 1000
        case 'milli':
            object.value /= 1000
            break;
        case 'tera':
            object.value *= 1000
        case 'giga':
            object.value *= 1000
        case 'mega':
            object.value *= 1000
        case 'kilo':
            object.value *= 1000
            break;
    }
    vorsatzInput.value = 'basis'
    return object.value
}

function formatResult(result) {
    let vorsatz = 0
    while (result / 1000 > 1) {
        result /= 1000
        vorsatz++
    }
    while (result * 1000 < 1000) {
        result = result * 1000
        vorsatz--
    }

    if (result > 99) {
        result = result.toFixed(0)
    } else if (result > 9) {
        result = result.toFixed(1)
    } else {
        result = result.toFixed(2)
    }

    switch (vorsatz) {
        case 1:
            result += 'k'
            break
        case 2:
            result += 'M'
            break
        case 3:
            result += 'G'
            break
        case 4:
            result += 'T'
            break
        case -1:
            result += 'm'
            break
        case -2:
            result += 'u'
            break
        case -3:
            result += 'n'
            break
    }

    return result
}