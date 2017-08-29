import React from 'react';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            reminders: ['reminder 1', 'reminder 2']
        };
    }

    componentWillMount() {
        // this.setState({
        //     reminders: chrome.storage.local.get('reminders')
        // });
    }

    render() {
        const { reminders } = this.state;
        return (
            <div>
                { reminders.map((el, i) => <ListItem key={i} reminder={el} />) }
            </div>
        );
    }
}

export default List;