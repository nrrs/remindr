import React from 'react';
import moment from 'moment';

import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            reminders: []
            // reminders: chrome.storage.local.get('reminders', function(obj, i) { return obj; })
            // reminders: [
            //     {
            //         id: 1,
            //         alert: 'Drink water!',
            //         reoccur: true,
            //         frequency: 'Every 3 Hours',
            //         onDate: false
            //     },
            //     {
            //         id: 2,
            //         alert: 'Rest your eyes for 5 mins!',
            //         reoccur: true,
            //         frequency: 'Every Hour',
            //         onDate: false
            //     },
            //     {
            //         id: 3,
            //         alert: 'Commit!',
            //         reoccur: false,
            //         frequency: null,
            //         onDate: moment(Date.now()).format("MMM Do YY")
            //     }
            // ]
        };
    }

    componentWillMount() {
        // this.setState({
        //     reminders: chrome.storage.local.get('reminders')
        // });

        // let store = {};

        // let b = new Promise( function(res, rej) {
        //     chrome.storage.local.get(null, obj => {
        //         console.log(obj)
        //         store = obj;
        //     });
        // });
        // console.log(store);
        // console.log(b);
        // b.then( console.log(store, 'test') );
        // b.then( (res) => console.log(store, 'test') );
        chrome.storage.local.get(null, obj => {
          let store = obj;

          if (store.hasOwnProperty("reminders")) {
            console.log("store exists");
            console.log(store.reminders);
            this.setState({
                reminders: store.reminders
            });
          } else {
            console.log("no store");
            chrome.storage.local.set({ reminders: [] }, function() {
              console.log("chrome.storage.sync.set");
              //   alert(`Reminder ${reminder.alert}  Set`);
            });
          }
        });

        
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