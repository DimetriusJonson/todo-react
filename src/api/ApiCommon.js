
export async function makeRequest(path, method, token, requestData, setApiInProgress, callback) {
    setApiInProgress(true);
    try {
        const response = await fetch(getHostUrl() + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: requestData ? JSON.stringify(requestData) : null,
            keepalive: true,
        });

        await processResponse(response, (success, responseData, userError) => {
            if (success) {
                callback(true, responseData);
            } else {
                callback(false, responseData, userError);
            }
        });
    } catch (error) {
        callback(false, error.message);
    } finally {
        setApiInProgress(false);
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
                callback(false, responseData.error, { unAuthorized: true })
                break;
            }
            case 422: {
                const responseData = await response.json();

                let errorsMap = new Map();
                responseData.error.split('\n').forEach((field_error, index) => {
                    let sepIndex = field_error.indexOf(':');
                    if (sepIndex >= 0) {
                        errorsMap.set(
                            field_error.substring(0, sepIndex).trim(),
                            field_error.substring(sepIndex + 1).trim(),
                        );
                    }
                });
                callback(false, responseData.error, { validateErrors: errorsMap });
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
    return location.protocol + '//' + location.hostname + ':' + location.port + '/api/v1';
}

