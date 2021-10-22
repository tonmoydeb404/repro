import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ icon, type, children, className, to, ...rest }) => {
    if (to) {
        return (
            <Link to={to} className={`btn ${className}`} {...rest}>
                {icon && <span className="material-icons">{icon}</span>}
                {children}
            </Link>
        );
    }
    return (
        <button type={type || 'button'} className={`btn ${className}`} {...rest}>
            {icon && <span className="material-icons">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
