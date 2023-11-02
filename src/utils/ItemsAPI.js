export const getAllItems = async (data, size) => {
    try {
        const response = await fetch(`http://localhost:8080/item?size=${size}&page=${data-1}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getItemById = async (id) => {
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

export const searchItemsByName = async (input, page, size) => {
    try {
        const response = await fetch(`http://localhost:8080/item/search/by-name?name=${input}&size=${size}&page=${page - 1}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const postItem = (formData) => {
    const url = `http://localhost:8080/item`;

    return fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to create the item');
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const deleteItem = (itemId) => {
    const url = `http://localhost:8080/item/${itemId}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete the item');
            }
            console.log('Item deleted successfully');
        })
        .catch((error) => {
            console.error(`Error while deleting the item: ${error.message}`);
        });
};

export const updateItem = (formData, id) => {
    const url = `http://localhost:8080/item/${id}`;

    return fetch(url, {
        method: 'PATCH',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update the item');
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};