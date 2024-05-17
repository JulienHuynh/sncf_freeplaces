import {DateTime} from 'luxon';

export function getFullFormattedDateFr(date) {
    const dateTime = DateTime.fromJSDate(date, { zone: 'Europe/Paris' });

    return dateTime.toISO({includeOffset: false});
}

export function convertISOToDate(isoString) {
    const dateTime = DateTime.fromISO(isoString, { zone: 'Europe/Paris' });
    return dateTime.toJSDate();
}

export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
