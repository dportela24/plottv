export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function atLeastTwoDigits(x) {
    if (x > 9) {
        return x.toString();
    }

    return "0" + x.toString();
}

export function isImdbIdFormat(input) { 
    const idRegex = new RegExp('^tt\\d{7,8}\$')
    return idRegex.test(input)
}

export function generateRequestByIdURL(input) { return `http://localhost:8080/series/id/${input}` }

export function generateRequestByNameURL(input) { return `http://localhost:8080/series/name/${input.replace(" ", "+")}` }