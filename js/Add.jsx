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

        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(id) {
        console.log(event);
        return (e) => {
            this.setState({
              reminder: {
                [id]: e.currentTarget.value
              }
            });

            console.log(this.state.reminder.alert);
        };
        
    }

    _handleSubmit(e) {
        var reminder = this.state.reminder;

        console.log(reminder);

        chrome.storage.local.set(reminder, function() {
            console.log('chrome.storage.sync.set');
            alert(`Reminder ${reminder.alert}  Set`);
        });
    }

    render() {
        return (
            <div>
                <input id="alert" 
                    type="text" 
                    placeholder="How may I help you?" 
                    onChange={this._handleChange('alert')}
                    />
                <button onClick={this._handleSubmit}>submit</button>
            </div>
        );
    }
}

export default Add;