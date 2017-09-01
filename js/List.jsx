import React from 'react';
import moment from 'moment';

import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            reminders: [
                {
                    id: 1,
                    alert: 'Drink water!',
                    reoccur: true,
                    frequency: 'Every 3 Hours',
                    onDate: false
                },
                {
                    id: 2,
                    alert: 'Rest your eyes for 5 mins!',
                    reoccur: true,
                    frequency: 'Every Hour',
                    onDate: false
                },
                {
                    id: 3,
                    alert: 'Commit!',
                    reoccur: false,
                    frequency: null,
                    onDate: moment(Date.now()).format("MMM Do YY")
                }
            ]
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
            <ul id="reminders">
                { reminders.map((el, i) => <ListItem key={i} reminder={el} />) }
            </ul>
        );
    }
}

export default List;