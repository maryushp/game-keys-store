export const getItemsByCategories = async (data) => {
    try {
        const catIds = data.map(item => item).join(',');
        const response = await fetch(`http://localhost:8080/item/search/by-categories?catIds=${catIds}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}