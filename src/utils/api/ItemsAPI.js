export const getAllItems = async (data, size) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/item?size=${size}&page=${data-1}`);
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
        const response = await fetch(process.env.REACT_APP_API_URL + `/item/${id}`);
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
        const response = await fetch(process.env.REACT_APP_API_URL + `/item/search/by-name?name=${input}&size=${size}&page=${page - 1}`);
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
    const url = process.env.REACT_APP_API_URL + `/item`;

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
    const url = process.env.REACT_APP_API_URL + `/item/${itemId}`;

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
    const url = process.env.REACT_APP_API_URL + `/item/${id}`;

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