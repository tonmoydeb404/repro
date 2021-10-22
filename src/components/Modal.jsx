import React from 'react';
import Classes from '../styles/Modal.module.css';

const Modal = ({ children }) => (
    <div className={Classes.modal}>
        <div className="container">
            <div className={Classes.modal_box}>{children}</div>
        </div>
    </div>
);

export default Modal;
