import { useState, useEffect } from 'react';
import Checkbox from "../components/Checkbox";
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { ApiTasks } from '../api/ApiTask';
import { showError, showInfo } from "../composite/MessageBanner";
import { ApiSaveTask } from '../api/ApiTask';
import MessageBanner from "../composite/MessageBanner";

function TasksPanel() {
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [apiInProgress, setApiInProgress] = useState(false);

  const user = useSelector((state) => state.settings.user);
  const filter = useSelector((state) => state.settings.filter);
  const sortKind = useSelector((state) => state.settings.sortKind);

  useEffect(() => {
    const loadTasks = async () => {
      await ApiTasks(user.token, (success, tasksOrError) => {
        if (success) {
          setTasks(tasksOrError);
        }
      });
    };

    if (user && user.token) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  let completedOnChange = async (info) => {
    setApiInProgress(true);
    try {
      let patch = { id: parseInt(info.name.substring(info.name.indexOf('_') + 1)), completed_at: info.value ? new Date().toISOString() : '-262143-01-01T00:00:00Z' };

      await ApiSaveTask(patch, user.token, (success, taskOrError) => {
        if (success) {
          info.target.checked = taskOrError.completed_at;
          tasks.filter(t => t.id === taskOrError.id).forEach(t => t.completed_at = taskOrError.completed_at);
          showInfo(messages, setMessages, 'Задача сохранена.');
        } else {
          showError(messages, setMessages, taskOrError);
        }
      });
    } finally {
      setApiInProgress(false);
    }
  }

  tasks.sort((task1, task2) => sortTask(task1, task2, sortKind));

  return (
    <>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>{"Приоритет"}</th>
            <th>{"Завершена"}</th>
            <th>{"Название"}</th>
            <th className="is-hidden-mobile">{"Описание"}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.filter(t => filterTask(t, filter)).map((task, index) => (
              <tr key={task.id}>
                <td className={priorityStyle(task)}>{priorityName(task)}</td>
                <td>
                  <Checkbox className="is-medium" name={'completed_' + task.id} value={task.completed_at} onChange={completedOnChange} title={taskCompletedAt(task)} disabled={apiInProgress} />
                </td>
                <td><Link to={'/task/' + task.id}>{task.title}</Link></td>
                <td className="is-hidden-mobile">{task.description}</td>
              </tr>
            ))
          ) :
            (<tr><td colSpan="3" style={{ textAlign: 'center' }}>{"Нет записей"}</td></tr>)
          }
        </tbody>
      </table>
      <MessageBanner messages={messages} setMessages={setMessages} />
    </>
  );
}

function taskCompletedAt(task) {
  if (task.completed_at) {
    return task.completed_at;
  } else {
    return '';
  }
}

function priorityStyle(task) {
  if (task.priority) {
    switch (task.priority) {
      case 'C': return "critical";
      case 'H': return "high";
      case "N": return "normal";
      default: return "low";
    }
  } else {
    return 'gray';
  }
}

function priorityName(task) {
  if (task.priority) {
    switch (task.priority) {
      case 'C': return "Критический";
      case 'H': return "Высокий";
      case "N": return "Нормальный";
      default: return "Низкий";
    }
  } else {
    return '';
  }
}

function filterTask(task, filter) {
  if (filter) {
    switch (filter) {
      case "Completed": return task.completed_at;
      case "Uncompleted": return !task.completed_at;
      default: return true;
    }
  } else {
    return true;
  }
}

function sortTask(task1, task2, sortKind) {
  if (sortKind) {
    switch (sortKind) {
      case 'Title': return task1.title.localeCompare(task2.title);
      case 'Priority': return priorityName(task1).localeCompare(priorityName(task2));
      default: return task1.id - task2.id;
    }
  } else {
    return task1.id - task2.id;
  }
}


export default TasksPanel;
