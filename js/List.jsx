import React from 'react';
import ListItem from "./ListItem";

class List extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { data, removeReminder } = this.props;
        
        return (
            <ul id="reminders">
                { data.map((el, i) => <ListItem key={i} reminder={el} id={`${i+1}`} remove={this.props.removeReminder}/>)}
            </ul>
        );
    }
}

export default List;