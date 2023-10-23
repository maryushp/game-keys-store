export const getAllCategories = async () => {
    try {
        const response = await fetch(`http://localhost:8080/category?10`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}