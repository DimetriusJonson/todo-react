import { useState } from 'react';
import Button from "../components/Button";
import MessageBanner from "../composite/MessageBanner";
import { showError, showInfo } from "../composite/MessageBanner";
import MainTitle from "../components/MainTitle";
import TextWithError from '../composite/TextWithError';
import { apiCreateUser } from '../api/ApiUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/StoreSlice';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [messages, setMessages] = useState([]);
    const [apiInProgress, setApiInProgress] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(new Map());
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setApiInProgress(true);
        try {
            await apiCreateUser(userName, password, (success, userOrError, userError) => {
                if (success) {
                    dispatch(setUser(userOrError));
                    showInfo(messages, setMessages, 'Пользователь успешно создан.');
                    navigate("/login");
                } else {
                    if (userError && userError.validateErrors) {
                        setErrors(userError.validateErrors);
                    } else {
                        showError(messages, setMessages, userOrError);
                    }
                }
            });
        } finally {
            setApiInProgress(false);
        }
    };

    return (
        <section className="section container">
            <MainTitle title="Создать пользователя" />
            <form className="box" onSubmit={handleSubmit}>
                <fieldset disabled={apiInProgress}>
                    <div className="field"><TextWithError name="userName" placeholder="Имя пользователя" value={userName} onChange={(v) => setUserName(v)} error={errors.get('username')} /></div>
                    <div className="field"><TextWithError name="password" placeholder="Пароль" inputType={"password"} onChange={(v) => setPassword(v)} error={errors.get('password')} /></div>
                    <div className="field"><div className="control"><Button className="is-primary" label="Создать" loading={apiInProgress} /></div></div>
                </fieldset>
            </form>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>
    );
}

export default CreateUser;
