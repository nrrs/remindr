import React, { Component } from 'react';
import Add from './add';
import List from "./List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: []
    };
    this.addReminder = this.addReminder.bind(this);
    this.removeReminder = this.removeReminder.bind(this);
  }

  componentWillMount() {
    chrome.storage.local.get({ reminders: [] }, results => {
      this.setState({
        reminders: results.reminders
      });
    });
  }

  addReminder(reminder) {
    let reminders = this.state.reminders;

    reminders.push(reminder);
    
    this.setState({ reminders: reminders });

    chrome.storage.local.set(
      { reminders: this.state.reminders },
      console.log("chrome.storage.local.set")
    );

    this.addAlarm(reminder);
  }

  // chrome.alarms.clear(string name, function callback)
  addAlarm(alarm) {
    console.log("Alarm Added: ", alarm);
    // chrome.alarms.create("test", { when: Date.now(), periodInMinutes: 1 });
  }

  removeReminder(id) {
    console.log("remove: ", id);
    let idx = id - 1,
      reminders = this.state.reminders;
    reminders.splice(idx, 1);
    this.setState({ reminders });
    chrome.storage.local.set(
      { reminders },
      console.log("chrome.storage.local.set remove")
    );
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