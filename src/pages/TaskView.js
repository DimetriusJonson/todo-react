import Button from "../components/Button";
import MessageBanner from "../composite/MessageBanner";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { apiGetTask, apiDeleteTask } from '../api/ApiTask';
import { showError } from "../composite/MessageBanner";
import { setUser } from '../store/StoreSlice';
import { useParams } from 'react-router-dom';
import { taskPriorityName } from '../util/TaskHelper';

function TaskView() {
    const { id } = useParams(); 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [apiInProgress, setApiInProgress] = useState(false);

    const [messages, setMessages] = useState([]);

    const user = useSelector((state) => state.settings.user);
    const [task, setTask] = useState({});

    let deleteOnClick = async (event) => {
        event.preventDefault();

        setApiInProgress(true);
        try {
            await apiDeleteTask(id, user.token, (success, taskOrError, userError) => {
                if (success) {
                    navigate("/");
                } else if (userError && userError.unAuthorized) {
                    dispatch(setUser({}));
                    navigate("/login")
                } else {
                    showError(messages, setMessages, taskOrError);
                }
            });
        } finally {
            setApiInProgress(false);
        }
    }

    useEffect(() => {
        const loadTask = async () => {
            await apiGetTask(id, user.token, (success, taskOrError, userError) => {
                if (success) {
                    setTask(taskOrError);
                } else if (userError && userError.unAuthorized) {
                    dispatch(setUser({}));
                    navigate("/login")
                }
            });
        };

        if (id) {
            loadTask();
        } else {
            setTask({});
        }
    }, [user, id, dispatch, navigate]);

    return (
        <section className="section">
            <div className="container">
                <div className="message">
                    <div className="message-header">
                        <p>{"Сделать"}</p>
                    </div>

                    <div className="message-body">


                        <div className="media">
                            <div className="media-left">
                                {task.completed_at ? (<span className="is-size-3">{"✅"}</span>) : (<span className="is-size-3">{"❌"}</span>)}
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{task.title}</p>
                                <p className="subtitle is-6">{taskPriorityName(task)}</p>
                            </div>
                        </div>

                        <div className="content">
                            {task.description && (<p>{task.description}</p>)}
                        </div>

                        <div className="field is-grouped">
                            <Button className="is-light" label="Редактировать" onClick={() => navigate('/task/' + id + '/edit')} disabled={apiInProgress} />
                            <Button className="is-danger" label="Удалить" onClick={deleteOnClick} disabled={apiInProgress} loading={apiInProgress} />
                        </div>
                    </div>
                </div>
            </div>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>
    );
}

export default TaskView;
