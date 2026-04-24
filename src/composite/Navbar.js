import { Link } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/StoreSlice';
import { showError, showInfo } from "../composite/MessageBanner";
import { useNavigate } from "react-router-dom";
import { apiLogout } from '../api/ApiUser';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [apiInProgress, setApiInProgress] = useState(false);
    const [navLinksActive, setNavLinksActive] = useState(false);
    const user = useSelector((state) => state.settings.user);

    let isLoggedIn = user && user.token && user.token.length > 0;

    const onBurgerClick = (e) => {
        e.preventDefault();
        setNavLinksActive(!navLinksActive);
    }

    let onLogout = async (event) => {
        event.preventDefault();

        setApiInProgress(true);
        try {
            await apiLogout(user.token, (success, error) => {
                if (success) {
                    dispatch(setUser({}));
                    showInfo(dispatch, 'Вы вышли!');
                    navigate("/");
                } else {
                    showError(dispatch, error);
                }
            });
        } finally {
            setApiInProgress(false);
        }
    };

    return (
        <>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item is-size-3 has-text-weight-extrabold is-family-code mx-1" to="/">TODO</Link>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={onBurgerClick} href='/'>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>

            </div>

            <div className={`navbar-menu ${navLinksActive ? 'is-active' : ''}`} id="nav-links">
                <div className="navbar-end">
                    <div className="buttons">
                        {isLoggedIn ? (
                            <div className="navbar-item"><Link className="button is-warning is-light is-rounded" to='/logout' onClick={onLogout} disabled={apiInProgress}>{'Выйти ' + user.name}</Link></div>
                        ) : (<>
                            <div className="navbar-item px-0"><Link className="button is-warning is-soft is-rounded" to='/createUser'>Создать пользователя</Link></div>
                            <div className="navbar-item pl-0"><Link className="button is-light is-rounded" to='/login'>Войти</Link></div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;
