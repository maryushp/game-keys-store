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
                    config.headers = config.headers || new Headers();
                    config.headers.set('Authorization', `Bearer ${token}`);
                }
                return [url, config];
            },
        });
    }

    setupResponseInterceptor() {
        fetchIntercept.register({
            response: (response) => {
                if (response.status === 401) {
                    removeCookie('token');
                    removeCookie('cart')
                    localStorage.removeItem('userData');
                    window.location.reload()
                }
                return response;
            },
        });
    }
}

export default FetchInterceptors;
