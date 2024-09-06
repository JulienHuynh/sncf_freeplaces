import fetch from "node-fetch";

export default async function getTrains(formattedDate) {
    try {
        const trainsApiUrl = 'https://www.maplaceabord.com/api/mpl/trains';
        
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({date: formattedDate})
        };

        const response = await fetch(trainsApiUrl, options);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des données : ${error.message}`);
    }
}
