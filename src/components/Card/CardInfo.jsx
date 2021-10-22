import React, { Fragment, useEffect, useState } from 'react';
import Classes from '../../styles/Card.module.css';

const CardInfo = ({ info }) => {
    const [infoItems, setInfoItems] = useState([]);

    useEffect(() => {
        if (info) {
            setInfoItems([
                {
                    name: 'research',
                    icon: 'science',
                    color: 'blue',
                    value: info.research,
                },
                {
                    name: 'dev',
                    icon: 'code',
                    color: 'green',
                    value: info.dev,
                },
                {
                    name: 'debug',
                    icon: 'bug_report',
                    color: 'red',
                    value: info.debug,
                },
            ]);
        }

        // CLEANUP
        return () => {
            setInfoItems([]);
        };
    }, [info]);

    return infoItems.length ? (
        <div className={Classes.card_info}>
            {infoItems.map((item) =>
                item.value > 0 ? (
                    <span className={Classes.card_info_item} key={item.name}>
                        <span
                            className={`material-icons color-${item.color} ${Classes.card_info_icon}`}
                        >
                            {item.icon}
                        </span>
                        {item.value} {item.name}
                    </span>
                ) : (
                    <Fragment key={item.name} />
                )
            )}
        </div>
    ) : (
        <></>
    );
};

export default CardInfo;
