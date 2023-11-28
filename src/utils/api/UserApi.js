export const getUser = async (id) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/user/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateAccount = (id, formData) => {
    const url = process.env.REACT_APP_API_URL + `/user/${id}`;

    return fetch(url, {
        method: 'PATCH',
        body: formData,headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error.message);
            throw new Error('Failed to update user');
        });
}