import React, { Component } from 'react';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reminder: {
                alert: '',
                reoccur: true,
                frequency: 'Every 3 Hours',
                onDate: false
            }
        };

        this._submit = this._submit.bind(this);
        this._update = this._update.bind(this);
    }

    _update(field) {
        return e => this.setState({
            reminder: { [field]: e.currentTarget.value }
        });
    }

    _submit() {
        var reminder = this.state.reminder;

        chrome.storage.local.get('reminders', obj => {
          let store = obj;

          if (store.hasOwnProperty("reminders")) {
            console.log("store exists");
            console.log(store.reminders);
            store.reminders.push(reminder);
            console.log('store: ', store);

            chrome.storage.local.set({'reminders': store.reminders}, function() {
              console.log("chrome.storage.sync.set");
            //   alert(`Reminder ${reminder.alert}  Set`);
            });

          }


        });
        
        console.log(reminder);

        
    }

    render() {
        return (
            <div>
                <input id="alert" 
                    type="text" 
                    placeholder="How may I help you?" 
                    onChange={this._update('alert')}
                    />
                <button onClick={this._submit}>submit</button>
            </div>
        );
    }
}

export default Add;