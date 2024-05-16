import.meta.env.VITE_API_HOST;

export default function useGetFreeplaces() {
    return async () => {
        try {
            const apiHost = import.meta.env.VITE_API_HOST;
            const response = await fetch(`${apiHost}/api/freeplaces`, {
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
