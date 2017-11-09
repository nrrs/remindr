import React, { Component } from 'react';
import Add from './add';
import List from "./List";
/* global chrome:false */
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
    chrome.storage.local.get({ reminders: {} }, results => this.setState({ 
      reminders: results.reminders 
    }));
  }

  addReminder(reminder) {
    let reminders = this.state.reminders;

    reminders[reminder.alert] = reminder;
    
    this.setState({ reminders: reminders });

    chrome.storage.local.set({ reminders: this.state.reminders });

    this.addAlarm(reminder);
  }

  addAlarm(alarm) {
    chrome.alarms.create(
      alarm.alert, 
      { when: alarm.when, periodInMinutes: parseInt(alarm.frequency) } // * 60 for hours
    );
  }

  removeReminder(key) {
    let reminders = this.state.reminders;

    delete reminders[key];

    this.setState({ reminders });

    chrome.storage.local.set({ reminders });
    chrome.alarms.clear(key);
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