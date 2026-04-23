export async function processResponse(response, callback) {
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
                            field_error.substring(0, sepIndex).trim(),
                            field_error.substring(sepIndex + 1).trim(),
                        );
                    }
                });
                callback(false, responseData.error, errorsMap);
                break;
            }
            default: {
                const responseData = await response.json();
                callback(false, responseData.error);
            }
        }
    }
}

export function getHostUrl() {
    //let location = window.location;
    //return location.protocol + '//' + location.hostname;
    return "http://localhost/api/v1"
}

