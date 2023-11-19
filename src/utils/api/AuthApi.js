export const authenticate = async (email, password) => {
    try {
        const url = 'http://localhost:8080/auth/authenticate';
        const data = {
            email: email,
            password: password
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const register = async (name, surname, email, password) => {
    try {
        const url = 'http://localhost:8080/auth/register';
        const data = {
            firstname: name,
            lastname: surname,
            email: email,
            password: password
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}