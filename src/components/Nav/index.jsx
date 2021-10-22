import React from 'react';
import Classes from '../../styles/Nav.module.css';
import NavActions from './NavActions';

const Nav = ({ title, children, haveDark = true }) => (
    <nav className={Classes.nav}>
        {title && <h1>{title}</h1>}
        <NavActions haveDark={haveDark}>{children}</NavActions>
    </nav>
);

export default Nav;
