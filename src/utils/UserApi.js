export const getUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/user/${id}`);
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
    const url = `http://localhost:8080/user/${id}`;

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