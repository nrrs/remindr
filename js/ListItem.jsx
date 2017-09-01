import React from 'react';

const ListItem = props => {

    const reoccuring = (props.reminder.reoccur) ? 
        <i className="fa fa-repeat" aria-hidden="true"></i> :
        null; 

    return (
        <li id={props.reminder.id}>
            <span className="alert">{props.reminder.alert}</span>
            { reoccuring }
            {/* <strong>{props.reminder.frequency}</strong> */}
            {/* <strong>{props.reminder.reoccur}</strong> */}
        </li>
    );
};

export default ListItem;