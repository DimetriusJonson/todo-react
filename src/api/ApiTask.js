import { makeRequest } from "./ApiCommon";

const MIN_COMPLETED_AT = '-262143-01-01T00:00:00Z';

export async function apiTasks(token, callback) {
    makeRequest('/tasks', 'GET', token, null, (success, responseData, userError) => {
        if (success) {
            callback(true, responseData.data);
        } else {
            callback(false, responseData, userError);
        }
    });
}

export async function apiGetTask(id, token, callback) {
    makeRequest('/tasks/' + id, 'GET', token, null, (success, responseData, userError) => {
        if (success) {
            if (responseData.completed_at === MIN_COMPLETED_AT) {
                responseData.completed_at = null;
            }
            callback(true, responseData);
        } else {
            callback(false, responseData, userError);
        }
    });
}

export async function apiSaveTask(task, token, callback) {
    if (!task.completed_at) {
        task.completed_at = MIN_COMPLETED_AT;
    }

    makeRequest((task.id ? '/tasks/' + task.id : '/tasks'), task.id ? 'PATCH' : 'POST', token, task, callback);
}

export async function apiDeleteTask(id, token, callback) {
    makeRequest('/tasks/' + id, 'DELETE', token, null, callback);
}
