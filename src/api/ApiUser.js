import { makeRequest } from "./ApiCommon";

export async function apiCreateUser(userName, password, callback) {
    makeRequest('/users', 'POST', null, { "username": userName, "password": password }, callback);
}

export async function apiLogin(userName, password, callback) {
    makeRequest('/users/login', 'POST', null, { "username": userName, "password": password }, (success, responseData, userError) => {
        if (success) {
            callback(true, { id: responseData.id, name: responseData.username, token: responseData.token });
        } else {
            callback(false, responseData, userError);
        }
    });
}

export async function apiLogout(token, callback) {
    makeRequest('/users/logout', 'GET', token, null, callback);
}

