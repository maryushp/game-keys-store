export const getAllItems = async (data) => {
    try {
        const response = await fetch(`http://localhost:8080/item?size=8&page=${data-1}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}