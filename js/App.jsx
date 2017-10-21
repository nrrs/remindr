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
    let oldReminders = this.state.reminders;

    oldReminders.push(reminder);
    this.setState({ reminders: oldReminders });

    chrome.storage.local.set({ reminders: this.state.reminders }, console.log("chrome.storage.local.set"));
  }

  removeReminder(id) {
    console.log("remove: ", id);
    let idx = id - 1,
        reminders = this.state.reminders;
    
    reminders.splice(idx, 1);

    this.setState({ reminders });
    chrome.storage.local.set({ reminders }, console.log("chrome.storage.sync.set remove"));
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