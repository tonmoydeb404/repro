/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import Classes from '../styles/Filter.module.css';
import Button from './Button';

const tags = [
    {
        name: 'all',
        color: 'orange',
    },
    {
        name: 'research',
        color: 'blue',
    },
    {
        name: 'dev',
        color: 'green',
    },
    {
        name: 'debug',
        color: 'red',
    },
];

const statuses = [
    {
        name: 'all',
        color: 'blue',
    },
    {
        name: 'completed',
        color: 'green',
    },
    {
        name: 'pending',
        color: 'red',
    },
];

const Filters = ({ type = 'project', className, onChangeTag, onChangeStatus, status, tag }) => {
    const handleTag = (value) => {
        if (value !== tag) {
            onChangeTag(value);
        } else {
            onChangeTag(null);
        }
    };

    const handleStatus = (value) => {
        if (value !== status) {
            onChangeStatus(value);
        }
    };

    return (
        <div className={`${Classes.filter} ${className}`}>
            {type === 'project' ? (
                <div className={Classes.filter_wrapper}>
                    {statuses.map((statusData) => (
                        <Button
                            className={`${Classes.filter_item} btn_sm`}
                            onClick={() => handleStatus(statusData.name)}
                            data-color={statusData.color}
                            data-active={status === statusData.name}
                            key={statusData.name}
                        >
                            <div className={`${Classes.filter_icon}`} />
                            {statusData.name}
                        </Button>
                    ))}
                </div>
            ) : (
                <>
                    <select
                        name="status"
                        id="status"
                        value={status}
                        className={Classes.filter_select}
                        onChange={(e) => handleStatus(e.target.value)}
                    >
                        {statuses.map((statusData) => (
                            <option value={statusData.name} key={statusData.name}>
                                {statusData.name}
                            </option>
                        ))}
                    </select>
                    <div className={Classes.filter_wrapper}>
                        {tags.map((tagData) => (
                            <Button
                                className={`${Classes.filter_item} btn_sm`}
                                onClick={() => handleTag(tagData.name)}
                                data-color={tagData.color}
                                data-active={tag === tagData.name}
                                key={tagData.name}
                            >
                                <div className={`${Classes.filter_icon}`} />
                                {tagData.name}
                            </Button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Filters;
