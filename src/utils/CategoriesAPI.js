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

export const getItemsByCategories = async (categories, page, size) => {
    try {
        const catIds = categories.map(item => item).join(',');
        const response = await fetch(`http://localhost:8080/item/search/by-categories?catIds=${catIds}&page=${page-1}&size=${size}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}