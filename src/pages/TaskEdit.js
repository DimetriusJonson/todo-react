import { useState, useEffect } from 'react';
import Button from "../components/Button";
import MessageBanner from "../composite/MessageBanner";
import { showError, showInfo } from "../composite/MessageBanner";
import MainTitle from "../components/MainTitle";
import TextWithError from '../composite/TextWithError';
import { useNavigate } from "react-router-dom";
import SelectWithLabel from '../components/SelectWithLabel';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import TextArea from '../components/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { ApiSaveTask, ApiGetTask } from '../api/ApiTask';
import { setUser } from '../store/StoreSlice';
import { useParams } from 'react-router-dom';
import { priorityName } from '../util/TaskHelper';

function TaskEdit({ mainTitle }) {
    const { id } = useParams();

    const [messages, setMessages] = useState([]);
    const [apiInProgress, setApiInProgress] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [errors, setErrors] = useState(new Map());
    const user = useSelector((state) => state.settings.user);

    const [oldTask, setOldTask] = useState({});
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const loadTask = async () => {
            await ApiGetTask(id, user.token, (success, taskOrError, userError) => {
                if (success) {
                    setOldTask(taskOrError);
                    setTitle(taskOrError.title);
                    setDescription(taskOrError.description);
                    setPriority(taskOrError.priority);
                    setCompleted(taskOrError.completed_at ? true : false);
                } else {
                    if (userError && userError.unAuthorized) {
                        dispatch(setUser({}));
                        navigate("/login")
                    }
                }
            });
        };

        if (id) {
            loadTask();
        } else {
            setOldTask({});
        }
    }, [user, id, dispatch, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setApiInProgress(true);
        try {
            let patch = { id: parseInt(id) };
            if (title !== oldTask.title) {
                patch.title = title;
            }

            if (description !== oldTask.description) {
                patch.description = description;
            }

            if (priority !== oldTask.priority) {
                patch.priority = priority;
            }

            let completed_at = completed ? new Date().toISOString() : null;
            if (completed_at !== oldTask.completed_at) {
                patch.completed_at = completed_at;
            }

            await ApiSaveTask(patch, user.token, (success, taskOrError, userError) => {
                if (success) {
                    showInfo(messages, setMessages, 'Задача сохранена.');
                    navigate("/task/" + taskOrError.id);
                } else {
                    if (userError && userError.validateErrors) {
                        setErrors(userError.validateErrors);
                    } else if (userError && userError.unAuthorized) {
                        dispatch(setUser({}));
                        navigate("/login")
                    } else {
                        showError(messages, setMessages, taskOrError);
                    }
                }
            });
        } finally {
            setApiInProgress(false);
        }
    };

    let priorities = [
        priorityToOption('C'),
        priorityToOption('H'),
        priorityToOption('N'),
        priorityToOption('L')
    ];

    return (
        <section className="section">
            <div className="container">
                <MainTitle title={mainTitle} />
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={apiInProgress}>
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <SelectWithLabel name="priority" label={"Приоритет:"} value={priority} options={priorities} onChange={(v) => setPriority(v)} />
                                </div>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <CheckboxWithLabel name="completed" label="Завершена" value={completed} onChange={(v) => setCompleted(v)} />
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <TextWithError name="title" placeholder="Название" value={title} error={errors.get("title")} onChange={(v) => setTitle(v)} />
                        </div>
                        <div className="field">
                            <TextArea name="description" placeholder="Описание" value={description} onChange={(v) => setDescription(v)} />
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <Button className="is-primary" label="Сохранить" loading={apiInProgress} />
                            </div>
                            <div className="control">
                                <Button className="is-light" label="Отмена" onClick={() => { if (id) { navigate("/task/" + id); } else { navigate("/"); } }} />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>
    );
}

function priorityToOption(priority) {
    return { value: priority, text: priorityName(priority) };
}

export default TaskEdit;
