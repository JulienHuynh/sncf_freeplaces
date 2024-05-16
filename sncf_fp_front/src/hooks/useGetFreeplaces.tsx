export default function useGetFreeplaces() {
    return async () => {
        try {
            const response = await fetch(`http://localhost:8245/api/freeplaces`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur de requête: ' + response.status);
            }

            return await response.json();
        } catch (e) {
            throw new Error('Error fetching freeplaces: ' + e);
        }
    };
}
