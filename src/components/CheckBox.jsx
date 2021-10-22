import React from 'react';
import Classes from '../styles/Input.module.css';

const CheckBox = ({ id, color = 'green', icon, children, checked, onChange }) => (
    <div className={Classes.input_checkbox}>
        <input
            type="checkbox"
            name={id}
            id={id}
            className={Classes.input_checkbox_field}
            checked={checked}
            onChange={onChange}
        />
        <label htmlFor={id} className={`${Classes.input_checkbox_label} bg-${color}`}>
            {icon && (
                <span
                    className={`material-icons ${Classes.input_checkbox_label_icon} color-${color}`}
                >
                    {icon}
                </span>
            )}
            {children}
        </label>
    </div>
);

export default CheckBox;
