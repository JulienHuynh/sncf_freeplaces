import fetch from "node-fetch";

export default async function getFreeplaces(train) {
    try {
        const freePlacesApiUrl = 'https://www.maplaceabord.com/api/mpl/freeplaces';

        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: train
        };

        const response = await fetch(freePlacesApiUrl, options);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des données : ${error.message}`);
    }
}
