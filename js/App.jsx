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

  removeReminder() {
    console.log('removed');
  }

  render() {
    const { reminders } = this.state;

    return (
      <div className="App">
        <Add addReminder={this.addReminder} />
        <List data={reminders} removeReminder={this.removeReminder} />
      </div>
    );
  }
}

export default App;