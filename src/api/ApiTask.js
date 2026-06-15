import { makeRequest } from "./ApiCommon";

export async function apiTasks(token, setApiInProgress, callback) {
    makeRequest('/tasks', 'GET', token, null, setApiInProgress, (success, responseData, userError) => {
        if (success) {
            callback(true, responseData.data);
        } else {
            callback(false, responseData, userError);
        }
    });
}

export async function apiGetTask(id, token, setApiInProgress, callback) {
    makeRequest('/tasks/' + id, 'GET', token, null, setApiInProgress, (success, responseData, userError) => {
        if (success) {
            callback(true, responseData);
        } else {
            callback(false, responseData, userError);
        }
    });
}

export async function apiSaveTask(task, token, setApiInProgress, callback) {
    makeRequest((task.id ? '/tasks/' + task.id : '/tasks'), task.id ? 'PATCH' : 'POST', token, task, setApiInProgress, callback);
}

export async function apiDeleteTask(id, token, setApiInProgress, callback) {
    makeRequest('/tasks/' + id, 'DELETE', token, null, setApiInProgress, callback);
}
