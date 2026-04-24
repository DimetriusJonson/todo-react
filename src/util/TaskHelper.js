
export function priorityName(priority) {
    switch (priority) {
        case "C": return "Критический";
        case "H": return "Высокий";
        case "N": return "Нормальный";
        case "L": return "Низкий";
        default: return "";
    }
}

export function taskPriorityName(task) {
    return priorityName(task.priority);
}