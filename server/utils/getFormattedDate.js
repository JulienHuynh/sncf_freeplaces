import { format } from 'date-fns-tz';

export function getFullFormattedDateFr(date) {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {timeZone: 'Europe/Paris'});
}

export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
