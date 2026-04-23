import { useState } from 'react';
import Button from "../components/Button";
import MessageBanner from "../composite/MessageBanner";
import {showError, showInfo} from "../composite/MessageBanner";
import MainTitle from "../components/MainTitle";
import TextWithError from '../composite/TextWithError';
import { ApiLogin } from '../api/ApiUser';
import { useDispatch, useSelector } from 'react-redux';
import { setUser} from '../store/StoreSlice';
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const apiInProgress = useSelector((state) => state.settings.apiInProgress);

    const [errors, setErrors] = useState(new Map());
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await ApiLogin(userName, password, dispatch, (success, userOrError, validateErrors) => {
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
    };

    return (
        <section className="section container">
            <MainTitle title="Вход в систему" />
            <form className="box" onSubmit={handleSubmit}>
                <fieldset disabled={apiInProgress}>
                    <div className="field"><TextWithError name="userName" placeholder="Имя пользователя" value={userName} onChange={(v) => setUserName(v)} error={errors.get('username')}/></div>
                    <div className="field"><TextWithError name="password" placeholder="Пароль" inputType={"password"} onChange={(v) => setPassword(v)} error={errors.get('password')}/></div>
                    <div className="field"><div className="control"><Button className="is-primary" label="Войти" loading={apiInProgress} /></div></div>
                </fieldset>
            </form>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>
    );
}

export default Login;
