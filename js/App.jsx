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
  }

  componentWillMount() {
    chrome.storage.local.get({ reminders: [] }, results => {
      this.setState({
        reminders: results.reminders
      });
    });
  }

  addReminder(reminder) {
    console.log('addReminder arg: ', reminder);
    let oldReminders = this.state.reminders;
    console.log(oldReminders);
    oldReminders.push(reminder);
    console.log(oldReminders);

    this.setState({
      reminders: oldReminders
    });

    chrome.storage.local.set({ reminders: this.state.reminders }, console.log("chrome.storage.sync.set"));
  }

  // componentWillUnmount() {
  //   chrome.storage.local.set({ reminders: this.state.reminders }, console.log("chrome.storage.sync.set"));
  // }

  render() {
    const { reminders } = this.state;

    return (
      <div className="App">
        <Add addReminder={this.addReminder} />
        <List data={reminders} />
      </div>
    );
  }
}

export default App;