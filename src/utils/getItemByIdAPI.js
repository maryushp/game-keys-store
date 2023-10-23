export const getItemByIdAPI = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/item/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch item');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}