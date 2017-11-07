import React from 'react';
import ListItem from "./ListItem";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, removeReminder } = this.props;

        let data2 = (Object.keys(data).length < 1) ? [] : Object.keys(data);
    
        
        return <ul id="reminders">
            { data2.map((el, i) => (
              <ListItem
                key={i}
                id={`${i + 1}`}
                reminder={data[el]}
                remove={removeReminder}
              />
            )) }
          </ul>;
    }
}

export default List;