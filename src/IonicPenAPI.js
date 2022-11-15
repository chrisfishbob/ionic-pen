import axios from 'axios';
import Session from './Session';
import config from './config';

const { api: { host }} = config;

const BASE_URL = host;

class IonicPenAPI {
    static async login(username, password) {
        let errorText = null;
        try {
            const response = await axios.post(`${BASE_URL}/api/login/`, {
                username: username,
                password: password
            })
            let authKey = response.data['auth-key'];
            if (authKey) {
                Session.setCookie('auth-key', authKey, 28);
                return true;
            }
            errorText = response.data.error;
        } catch (err) {
            console.log(err);
        }
        if (errorText) {
            throw new Error(errorText);
        }
        return false;
    }

    static async signup(username, firstName, lastName, emailID, password) {
        let errorText = null;
        try {
            const response = await axios.post(`${BASE_URL}/api/signup/`, {
                username: username,
                first_name: firstName,
                last_name: lastName,
                email_id: emailID,
                password: password
            })
            let authKey = response.data['auth-key'];
            if (authKey) {
                Session.setCookie('auth-key', authKey, 28);
                return true;
            }
            errorText = response.data.error;
        } catch (err) {
            console.log(err);
        }
        if (errorText) {
            throw new Error(errorText);
        }
        return false;
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
        let authKey = Session.getCookie('auth-key');
        try {
            const response = await axios.get(`${BASE_URL}/api/search/?q=${query}`, {
                headers: {
                    'auth-key': authKey
                }
            });
            return response.data;
        } catch (err) {
            console.log(err);
        }
        return {};
    }

    static async getBookChapter(book_id, chapter_number) {
        let authKey = Session.getCookie('auth-key');
        try {
            const response = await axios.get(`${BASE_URL}/api/books/read/${book_id}/${chapter_number}`, {
                headers: {
                    'auth-key': authKey
                }
            });
            return response.data;
        } catch (err) {
            console.log(err);
        }
        return {};
    }
}

export default IonicPenAPI;
