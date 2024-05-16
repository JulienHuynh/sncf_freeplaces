export function dateToFRDay(dateString: String): string {
    // @ts-ignore
    const dateObj = new Date(dateString);
    const options = { day: "2-digit", month: "short" };

    // @ts-ignore
    return dateObj.toLocaleDateString("fr-FR", options);
}

export function extractTimeFromISOString(dateString: string): string {
    const dateObj = new Date(dateString);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Ajout d'un zéro devant les chiffres si nécessaire pour obtenir une représentation à deux chiffres
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
}

export function convertSecondToHours(durationSec: number): string {
    const hours = Math.floor(durationSec / 3600);
    const minutes = Math.floor((durationSec % 3600) / 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}h${formattedMinutes}`;
}
