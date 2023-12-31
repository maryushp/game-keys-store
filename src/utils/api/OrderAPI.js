export const createOrder = (cartData) => {

    return fetch(process.env.REACT_APP_API_URL + `/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error creating order on the server:', error);
            throw error;
        });
};

export const getUserOrders = async (id, page) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/user/${id}/orders?size=4&page=${page-1}`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllOrders = async (page, size) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/order?size=${size}&page=${page-1}`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getOrderById = async (id) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/order/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}