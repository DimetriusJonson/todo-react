import { useState, useEffect } from 'react';
import Button from "../components/Button";
import MessageBanner from "../composite/MessageBanner";
import { showError, showInfo } from "../composite/MessageBanner";
import MainTitle from "../components/MainTitle";
import TextWithError from '../composite/TextWithError';
import { apiLogin } from '../api/ApiUser';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/StoreSlice';
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((state) => state.settings.user);

    const [passAutoFocus, setPassAutoFocus] = useState(false);
    const [apiInProgress, setApiInProgress] = useState(false);

    const [errors, setErrors] = useState(new Map());
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user && user.username) {
            setUserName(user.username);
            setPassAutoFocus(true);
        }
    }, [user, dispatch, navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        setApiInProgress(true);
        try {
            await apiLogin(userName, password, (success, userOrError, userError) => {
                if (success) {
                    dispatch(setUser(userOrError));
                    showInfo(dispatch, 'Вы вошли!');
                    navigate("/");
                } else {
                    if (userError && userError.validateErrors) {
                        setErrors(userError.validateErrors);
                    } else {
                        showError(dispatch, userOrError);
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
                    <div className="field"><TextWithError name="password" placeholder="Пароль" inputType={"password"} onChange={(v) => setPassword(v)} error={errors.get('password')} focus={passAutoFocus} /></div>
                    <div className="field"><div className="control"><Button className="is-primary" label="Войти" loading={apiInProgress} /></div></div>
                </fieldset>
            </form>
            <MessageBanner />
        </section>
    );
}

export default Login;
