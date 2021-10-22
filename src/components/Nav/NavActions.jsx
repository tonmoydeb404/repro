import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import Classes from '../../styles/Nav.module.css';
import Button from '../Button';

const NavActions = ({ haveDark, children }) => {
    const { logOut } = useAuth();

    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('dark') == null) {
            setDark(false);
        } else {
            setDark(JSON.parse(localStorage.getItem('dark')));
        }
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-theme', dark === true ? 'dark' : 'light');
        localStorage.setItem('dark', dark);
    }, [dark]);

    return (
        <div className={Classes.nav_actions}>
            {haveDark && (
                <Button className="btn_white" icon="dark_mode" onClick={() => setDark(!dark)} />
            )}

            {children}

            <Button icon="logout" className="btn_red" onClick={logOut} />
        </div>
    );
};

export default NavActions;
