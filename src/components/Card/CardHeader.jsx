/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Classes from '../../styles/Card.module.css';

const CardHeader = ({ to, title, editItem, deleteItem }) => {
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutSide);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, [menu]);

    return (
        <div className={Classes.card_header}>
            <h3 className={Classes.card_title}>{to ? <Link to={to}>{title}</Link> : title}</h3>

            <span
                role="button"
                onClick={() => setMenu(!menu)}
                className={`material-icons ${Classes.card_menu_btn}`}
            >
                more_horiz
            </span>

            <ul ref={menuRef} className={`${Classes.card_menu} ${menu ? null : Classes.hidden}`}>
                <li role="button" className={Classes.card_menu_item} onClick={editItem}>
                    Edit Item
                </li>
                <li role="button" className={Classes.card_menu_item} onClick={deleteItem}>
                    Delete Item
                </li>
            </ul>
        </div>
    );
};

export default CardHeader;
