import { makeRequest } from "./ApiCommon";

export async function apiCreateUser(userName, password, setApiInProgress, callback) {
    makeRequest('/users', 'POST', null, { "username": userName, "password": password }, setApiInProgress, callback);
}

export async function apiLogin(userName, password, setApiInProgress, callback) {
    makeRequest('/users/login', 'POST', null, { "username": userName, "password": password }, setApiInProgress, (success, responseData, userError) => {
        if (success) {
            callback(true, { id: responseData.id, name: responseData.username, token: responseData.token });
        } else {
            callback(false, responseData, userError);
        }
    });
}

export async function apiLogout(token, setApiInProgress, callback) {
    makeRequest('/users/logout', 'GET', token, null, setApiInProgress, callback);
}

