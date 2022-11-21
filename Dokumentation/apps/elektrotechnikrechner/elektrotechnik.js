function Calculate() {
    const Ohm = 'ohm'
    const Ampère = 'ampère'
    const Volt = 'volt'

    const nano = 'nano'
    const mikro = 'mikro'
    const milli = 'milli'
    const kilo = 'kilo'
    const mega = 'mega'
    const giga = 'giga'
    const tera = 'tera'

    var value1 = document.querySelector('.wert1').value
    var value2 = document.querySelector('.wert2').value
    var unit1 = document.querySelector('.einheit1')
    var unit1value = unit1.options[unit1.selectedIndex].value
    var unit2 = document.querySelector('.einheit2')
    var unit2value = unit2.options[unit2.selectedIndex].value
    var prefix1 = document.querySelector('.vorsatz1')
    var prefix1value = prefix1.options[prefix1.selectedIndex].value
    var prefix2 = document.querySelector('.vorsatz2')
    var prefix2value = prefix2.options[prefix2.selectedIndex].value
    const resultSentence = document.querySelector('.result')
    var result = 0

    if (value1 == '' || value2 == '') {
        alert('Du hast nicht alle Werte angegeben')
        return
    } else if (unit1value == unit2value) {
        alert('Du hast zwei gleiche Einheiten angegeben')
        return
    }

    switch (prefix1value) {
        case nano:
            value1 /= 1000
        case mikro:
            value1 /= 1000
        case milli:
            value1 /= 1000
            break;
        case tera:
            value1 *= 1000
        case giga:
            value1 *= 1000
        case mega:
            value1 *= 1000
        case kilo:
            value1 *= 1000
            break;
    }

    switch (prefix2value) {
        case nano:
            value2 /= 1000
        case mikro:
            value2 /= 1000
        case milli:
            value2 /= 1000
            break;
        case tera:
            value2 *= 1000
        case giga:
            value2 *= 1000
        case mega:
            value2 *= 1000
        case kilo:
            value2 *= 1000
            break;
    }

    switch (unit1value) {
        case Ohm:
            switch (unit2value) {
                case Ampère:
                    result = value1 * value2
                    resultSentence.innerHTML = "Die Spannung betr&auml;gt " + result + "V."
                    break;
                case Volt:
                    result = value2 / value1
                    resultSentence.innerHTML = "Der Strom betr&auml;gt " + result + "A."
                    break;
            }
            break;
        case Ampère:
            switch (unit2value) {
                case Ohm:
                    result = value1 * value2
                    resultSentence.innerHTML = "Die Spannung betr&auml;gt " + result + "V."
                    break;
                case Volt:
                    result = value2 / value1
                    resultSentence.innerHTML = "Der Widerstand betr&auml;gt " + result + " Ohm."
                    break;
            }
            break;
        case Volt:
            switch (unit2value) {
                case Ohm:
                    result = value1 / value2
                    resultSentence.innerHTML = "Der Strom betr&auml;gt " + result + "A."
                    break;
                case Ampère:
                    result = value1 / value2
                    resultSentence.innerHTML = "Der Widerstand betr&auml;gt " + result + " Ohm."
                    break;
            }
            break;
    }
}