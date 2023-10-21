const API_URL = process.env.API_URL;

export const getAllItems = async () => {
    try {
        const response = await fetch(`${API_URL}/item?size=8`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}