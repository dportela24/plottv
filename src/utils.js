export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function atLeastTwoDigits(x) {
    if (x > 9) {
        return x.toString();
    }

    return "0" + x.toString();
}