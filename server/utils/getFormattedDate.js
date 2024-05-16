export function getFullFormattedDateFr(date) {

    const offset = new Date().getTimezoneOffset();
    const franceOffset = 60; // UTC+1
    const offsetMillis = (offset + franceOffset) * 60 * 1000;
    const dateFr = new Date(date.getTime() + offsetMillis);

    const year = dateFr.getFullYear();
    const month = String(dateFr.getMonth() + 1).padStart(2, '0');
    const day = String(dateFr.getDate()).padStart(2, '0');
    const hours = String(dateFr.getHours()).padStart(2, '0');
    const minutes = String(dateFr.getMinutes()).padStart(2, '0');
    const seconds = String(dateFr.getSeconds()).padStart(2, '0');
    const milliseconds = String(dateFr.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
