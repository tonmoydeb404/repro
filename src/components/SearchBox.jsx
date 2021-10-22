import React, { useState } from 'react';
import Classes from '../styles/SearchBox.module.css';
import Input from './Input';

const SearchBox = ({ children, className, callBack }) => {
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        // REMOVE FORM DEFAULT BEHAVIOR
        e.preventDefault();

        callBack(search);
    };

    return (
        <form className={`${Classes.searchbox} ${className}`} onSubmit={handleSubmit}>
            {children}

            <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                btnType="submit"
                icon="search"
                id="search"
                placeholder="search here..."
            />
        </form>
    );
};

export default SearchBox;
