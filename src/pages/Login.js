import { useState } from 'react';
import Button from "../components/Button";
import MessageBanner from "../composite/MessageBanner";
import { showError, showInfo } from "../composite/MessageBanner";
import MainTitle from "../components/MainTitle";
import TextWithError from '../composite/TextWithError';
import { ApiLogin } from '../api/ApiUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/StoreSlice';
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [apiInProgress, setApiInProgress] = useState(false);

    const [errors, setErrors] = useState(new Map());
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setApiInProgress(true);
        try {
            await ApiLogin(userName, password, (success, userOrError, validateErrors) => {
                if (success) {
                    dispatch(setUser(userOrError));
                    showInfo(messages, setMessages, 'Вы вошли!');
                    navigate("/");
                } else {
                    if (validateErrors) {
                        setErrors(validateErrors);
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
            <MainTitle title="Вход в систему" />
            <form className="box" onSubmit={handleSubmit}>
                <fieldset disabled={apiInProgress}>
                    <div className="field"><TextWithError name="userName" placeholder="Имя пользователя" value={userName} onChange={(v) => setUserName(v)} error={errors.get('username')} /></div>
                    <div className="field"><TextWithError name="password" placeholder="Пароль" inputType={"password"} onChange={(v) => setPassword(v)} error={errors.get('password')} /></div>
                    <div className="field"><div className="control"><Button className="is-primary" label="Войти" loading={apiInProgress} /></div></div>
                </fieldset>
            </form>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>
    );
}

export default Login;
