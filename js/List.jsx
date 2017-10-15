import React from 'react';
import ListItem from "./ListItem";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;

        return (
            <ul id="reminders">
                { data.map((el, i) => <ListItem key={i} reminder={el} id={`reminder-item-${i+1}`} />)}
            </ul>
        );
    }
}

export default List;