import { Link } from 'react-router';
import React, { useState } from 'react';

function Navbar() {
    const [navLinksActive, setNavLinksActive] = useState(false);

    const onBurgerClick = (e) => {
        e.preventDefault();
        setNavLinksActive(!navLinksActive);
    }

    return (
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
                        <div className="navbar-item px-0"><Link className="button is-warning is-soft is-rounded" to='/createUser'>Создать пользователя</Link></div>
                        <div className="navbar-item pl-0"><Link className="button is-light is-rounded" to='/login'>Войти</Link></div>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;
