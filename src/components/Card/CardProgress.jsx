import React from 'react';
import Classes from '../../styles/Card.module.css';

const CardProgress = ({ progress }) => (
    <div className={Classes.card_progress}>
        <div className={Classes.card_progress_header}>
            <h5 className={Classes.card_progress_title}>progress</h5>
            <span className={Classes.card_progress_info}> {progress}% completed </span>
        </div>
        <div className={Classes.card_progress_wrapper}>
            <div
                className={`${Classes.card_progress_bar} green-bg`}
                style={{ width: `${progress}%` }}
            />
        </div>
    </div>
);

export default CardProgress;
