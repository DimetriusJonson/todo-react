import { getHostUrl } from "./ApiCommon";
import { processResponse } from "./ApiCommon";

export async function ApiCreateUser(userName, password, callback) {
    let data = {
        "username": userName,
        "password": password,
    };

    try {
        const response = await fetch(getHostUrl() + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        await processResponse(response, (success, responseData, validateErrors) => {
            if (success) {
                callback(true, { id: responseData.id, name: data.userName });
            } else {
                callback(false, responseData, validateErrors);
            }
        });
    } catch (error) {
        callback(false, error.message);
    }
}

export async function ApiLogin(userName, password, callback) {
    let data = {
        "username": userName,
        "password": password,
    };

    try {
        const response = await fetch(getHostUrl() + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        await processResponse(response, (success, responseData, validateErrors) => {
            if (success) {
                callback(true, { id: responseData.id, name: responseData.username, token: responseData.token });
            } else {
                callback(false, responseData, validateErrors);
            }
        });
    } catch (error) {
        callback(false, error.message);
    }
}

export async function ApiLogout(token, callback) {
    try {
        const response = await fetch(getHostUrl() + '/users/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        await processResponse(response, (success, responseData) => {
            if (success) {
                callback(true);
            } else {
                callback(false, responseData);
            }
        });
    } catch (error) {
        callback(false, error.message);
    }
}

