import React, { Component } from 'react';
import Add from './add';
import List from "./List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: {}
    };
    this.addReminder = this.addReminder.bind(this);
    this.removeReminder = this.removeReminder.bind(this);
  }

  componentWillMount() {
    chrome.storage.local.get({ reminders: {} }, results => {
      this.setState({
        reminders: results.reminders
      });
    });
  }

  addReminder(reminder) {
    let reminders = this.state.reminders;

    reminders[reminder.alert] = reminder;
    
    this.setState({ reminders: reminders });

    chrome.storage.local.set(
      { reminders: this.state.reminders },
      console.log("chrome.storage.local.set")
    );

    this.addAlarm(reminder);
  }

  // chrome.alarms.clear(string name, function callback)
  addAlarm(alarm) {
    chrome.alarms.create(
      alarm.alert, 
      { when: alarm.when, periodInMinutes: parseInt(alarm.frequency) }
    );
  }

  removeReminder(id) {
    console.log("remove: ", id);
    // let idx = id - 1,
    // reminders.splice(idx, 1);
    
    let reminders = this.state.reminders;

    console.log(typeof reminders);
  
    console.log('LOOK UP HOW TO DELETE KEY-VALUE FROM OBJECT');
    // this.setState({ reminders });

    // chrome.storage.local.set(
    //   { reminders },
    //   console.log("chrome.storage.local.set remove")
    // );
  }

  render() {
    const { reminders } = this.state;

    return (
      <div className="app">
        <Add addReminder={this.addReminder} />
        <List data={reminders} removeReminder={this.removeReminder} />
      </div>
    );
  }
}

export default App;