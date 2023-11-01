import fetchIntercept from 'fetch-intercept';
import {getCookie, removeCookie} from './CookiesManager'

class FetchInterceptors {
    constructor() {
        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    setupRequestInterceptor() {
        fetchIntercept.register({
            request: (url, config) => {
                const token = getCookie('token');
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

                return [url, config];
            },
        });
    }

    setupResponseInterceptor() {
        fetchIntercept.register({
            response: async (response) => {
                if (response.status === 401 || response.status === 403) {
                    try {
                        const data = await response.json();
                        if (data.detail !== "Bad credentials") {
                            removeCookie('token');
                            removeCookie('cart');
                            localStorage.removeItem('userData');
                            window.location.reload();
                        }
                    } catch (error) {
                        removeCookie('token');
                        removeCookie('cart')
                        localStorage.removeItem('userData');
                        window.location.reload();
                    }
                }
                return response;
            },
        });
    }
}

export default FetchInterceptors;
