import React from 'react';
import Classes from '../../styles/Card.module.css';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardInfo from './CardInfo';
import CardProgress from './CardProgress';

const Card = ({
    title,
    to,
    editItem,
    deleteItem,
    description,
    info = null,
    progress,
    tags = null,
    id,
    checked,
    handleCheck,
}) => (
    <div className={Classes.card}>
        <CardHeader to={to} title={title} editItem={editItem} deleteItem={deleteItem} />
        <p className={Classes.card_text}>{description}</p>

        {info && <CardInfo info={info} />}

        {progress && <CardProgress progress={progress} />}

        {tags && handleCheck && (
            <CardFooter tags={tags} id={id} checked={checked} onChange={handleCheck} />
        )}
    </div>
);

export default Card;
