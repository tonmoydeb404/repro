import React from 'react';
import Classes from '../styles/Input.module.css';
import Button from './Button';

const Input = ({
    id,
    placeholder,
    type,
    icon,
    value,
    onChange,
    title,
    info,
    children,
    btnType,
    className,
    background = 'foreground',
}) => (
    <div className={`${Classes.input} ${className}`}>
        {title && <label htmlFor={id || '#'}>{title}</label>}
        {children ? (
            <div className={Classes.input_options}>{children}</div>
        ) : (
            <div className={Classes.input_box} data-background={background}>
                {type === 'textarea' ? (
                    <textarea
                        name={id}
                        id={id}
                        className={Classes.input_field}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        data-info={!!info}
                    />
                ) : (
                    <input
                        type={type}
                        name={id}
                        id={id}
                        className={Classes.input_field}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        data-info={!!info}
                    />
                )}

                {icon && <Button icon={icon} className={Classes.input_icon} type={btnType} />}
            </div>
        )}
        {info && <p className={Classes.input_info}>{info}</p>}
    </div>
);

export default Input;
