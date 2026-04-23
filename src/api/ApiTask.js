import { getHostUrl } from "./ApiCommon";
import { processResponse } from "./ApiCommon";

export async function ApiTasks(token, callback) {
    try {
        const response = await fetch(getHostUrl() + '/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        await processResponse(response, (success, responseData) => {
            if (success) {
                callback(true, responseData.data);
            } else {
                callback(false, responseData);
            }
        });
    } catch (error) {
        callback(false, error.message);
    }
}

export async function ApiSaveTask(task, token, callback) {
    try {
        const response = await fetch(getHostUrl() + (task.id ? '/tasks/' + task.id : '/tasks'), {
            method: task.id ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(task),
        });

        await processResponse(response, (success, responseData) => {
            if (success) {
                callback(true, responseData);
            } else {
                callback(false, responseData);
            }
        });
    } catch (error) {
        callback(false, error.message);
    }
}