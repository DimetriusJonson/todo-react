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

        await processResponse(response, (success, responseData) => {
            if (success) {
                callback(true, { id: responseData.id, name: data.userName });
            } else {
                callback(false, responseData);
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
        const response = await fetch(getHostUrl() + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        await processResponse(response, (success, responseData) => {
            if (success) {
                callback(true, { id: responseData.id, name: responseData.username, token: responseData.token });
            } else {
                callback(false, responseData);
            }
        });
    } catch (error) {
        callback(false, error.message);
    }
}

async function processResponse(response, callback) {
    if (response.ok) {
        const responseData = await response.json();
        callback(true, responseData);
    } else {
        switch (response.status) {
            case 401: {
                const responseData = await response.json();
                callback(false, responseData.error)
                break;
            }
            case 422: {
                const responseData = await response.json();

                let errorsMap = new Map();
                responseData.error.split('\n').forEach((field_error, index) => {
                    let sepIndex = field_error.indexOf(':');
                    if (sepIndex >= 0) {
                        errorsMap.set(
                            field_error.substring(0, sepIndex),
                            field_error.substring(sepIndex + 1),
                        );
                    }
                });

                callback(false, responseData.error);
                break;
            }
            default: {
                const responseData = await response.json();
                callback(false, responseData.error);
            }
        }
    }
}

function getHostUrl() {
    let location = window.location;
    return location.protocol + '//' + location.hostname;
}

