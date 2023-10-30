export const createOrder = (cartData) => {

    return fetch(`http://localhost:8080/order`, {
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