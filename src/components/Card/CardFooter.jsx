/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Classes from '../../styles/Card.module.css';
import CheckBox from '../CheckBox';

const CardFooter = ({ tags, id, checked, onChange }) => (
    <div className={Classes.card_footer}>
        {tags && (
            <div className={Classes.card_tags}>
                {tags.research && <div className={`${Classes.card_tag} bg-blue`} />}
                {tags.dev && <div className={`${Classes.card_tag} bg-green`} />}
                {tags.debug && <div className={`${Classes.card_tag} bg-red`} />}
            </div>
        )}

        <CheckBox id={id} checked={checked} onChange={onChange} icon="task_alt">
            Done
        </CheckBox>
    </div>
);

export default CardFooter;
