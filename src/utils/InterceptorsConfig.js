import fetchIntercept from 'fetch-intercept';
import {getCookie, removeCookie, setCookie} from './CookiesManager'

class FetchInterceptors {
    constructor() {
        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
        this.originalRequestConfig = null;
    }

    setupRequestInterceptor() {
        fetchIntercept.register({
            request: (url, config) => {
                const token = getCookie('token');

                if (url.includes('/auth/refresh-token')) {
                    return [url, config];
                }

                if (token) {
                    if (!config) {
                        config = {};
                    }
                    config.headers = config.headers || {};
                    config.headers['Authorization'] = `Bearer ${token}`;

                } else if (localStorage.getItem('userData')) {
                    localStorage.removeItem('userData');
                    window.location.reload();
                }

                this.originalRequestConfig = config;

                return [url, config];
            },
        });
    }

    setupResponseInterceptor() {
        fetchIntercept.register({
            response: async (response) => {
                if (response.url.includes('/auth/refresh-token')) {
                    return response;
                }

                if (response.status === 401 || response.status === 403) {
                    try {
                        const data = await response.json();
                        if (data.detail !== "Bad credentials") {
                            if(data.title === "Token Expiration") {
                                await this.handleTokenExpiration();


                                const retryConfig = Object.assign({}, this.originalRequestConfig);

                                return fetch(response.url, retryConfig);
                            } else {
                                removeCookie('token');
                                removeCookie('refreshToken');
                                removeCookie('cart');
                                localStorage.removeItem('userData');
                                window.location.reload();
                            }
                        }
                    } catch (error) {
                        removeCookie('token');
                        removeCookie('refreshToken');
                        removeCookie('cart');
                        localStorage.removeItem('userData');
                        window.location.reload();
                    }
                }
                return response;
            },
        });
    }

    async handleTokenExpiration() {
        const refreshToken = getCookie('refreshToken');

        if (refreshToken) {
            try {
                const newTokenResponse = await fetch(process.env.REACT_APP_API_URL + '/auth/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${refreshToken}`,
                    },
                    body: JSON.stringify({}),
                });

                if (newTokenResponse.ok) {
                    const newToken = newTokenResponse.headers.get('Authorization').split(' ')[1];

                    setCookie('token', newToken);
                    return newToken
                } else {
                    removeCookie('token');
                    removeCookie('refreshToken');
                    removeCookie('cart');
                    localStorage.removeItem('userData');
                    window.location.reload();
                }
            } catch (error) {
                removeCookie('token');
                removeCookie('refreshToken');
                removeCookie('cart');
                localStorage.removeItem('userData');
                window.location.reload();
            }
        } else {
            removeCookie('token');
            removeCookie('cart');
            localStorage.removeItem('userData');
            window.location.reload();
        }
    }
}


export default FetchInterceptors;
