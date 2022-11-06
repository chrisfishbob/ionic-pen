import axios from 'axios';
import Session from './Session';
import config from './config';

const { api: { host, port, name }} = config;

const BASE_URL = `http://${host}:${port}`;

class IonicPenAPI {
    static async login(username, password) {
        try {
            axios.post(`${BASE_URL}/api/login/`, {
                username: username,
                password: password
            }).then( response => {
                let authKey = response.data['auth-key'];
                if (authKey) {
                    Session.setCookie('auth-key', authKey, 28);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async getHomepage() {
        let authKey = Session.getCookie('auth-key');
        let response = {};
        try {
            response = await axios.get(`${BASE_URL}/api/homepage/`, {
                headers: {
                    'auth-key': authKey
                }
            });
        } catch (err) {
            console.log(err);
        }
        return response;
    }

    static async getBookDetails(bookId) {
        let response = {};
        try {
            let result = await axios.get(`${BASE_URL}/api/books/${bookId}/`);
            if (result) {
                response = result.data;
            }
        } catch (err) {
            console.log(err);
        }
        return response;
    }

    static async search(query) {
        try {
            const response = await axios.get(`${BASE_URL}/api/search/?q=${query}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
        return {};
    }
}

export default IonicPenAPI;