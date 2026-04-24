import { getHostUrl } from "./ApiCommon";
import { processResponse } from "./ApiCommon";

const MIN_COMPLETED_AT = '-262143-01-01T00:00:00Z';

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

export async function ApiGetTask(id, token, callback) {
    try {
        const response = await fetch(getHostUrl() + '/tasks/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        await processResponse(response, (success, responseData) => {
            if (success) {
                if (responseData.completed_at === MIN_COMPLETED_AT) {
                    responseData.completed_at = null;
                }
                callback(true, responseData);
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
        if (!task.completed_at) {
            task.completed_at = MIN_COMPLETED_AT;
        }

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

export async function ApiDeleteTask(id, token, callback) {
    try {
        const response = await fetch(getHostUrl() + '/tasks/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
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
