import React, { Component } from 'react';
import ListItem from "./ListItem";

class Add extends Component {
  constructor(props) {
    super(props);

    this.remindersArray = [];

    this.state = {
      reminder: {
        alert: "fake",
        reoccur: true,
        frequency: "Every 3 Hours",
        onDate: false
      },
      reminders: this.remindersArray
    };

    this._submit = this._submit.bind(this);
    this._update = this._update.bind(this);
  }

  componentWillMount() {
    chrome.storage.local.get({ reminders: [] }, results => {
      console.log("On Mount Reminders List: ", results);
      this.remindersArray = results.reminders;

      this.setState({
        reminders: this.remindersArray
      });
    });
  }

  _update(field) {
    return e =>
      this.setState({
        reminder: { [field]: e.currentTarget.value }
      });
  }

  _submit() {
    const reminder = this.state.reminder;

    this.remindersArray.push(reminder);

    chrome.storage.local.set({ reminders: this.remindersArray }, () => {
      console.log("chrome.storage.sync.set");
    });

    chrome.storage.local.get({ reminders: [] }, results => {
      console.log("Post Submit Reminders: ", results);
      this.setState({ reminders: results.reminders });
    });
  }

  render() {
    return (
      <div>
        <input
          id="alert"
          type="text"
          placeholder="How may I help you?"
          onChange={this._update("alert")}
        />
        <button onClick={this._submit}>submit</button>
        <ul id="reminders">
          {this.remindersArray.map((el, i) => <ListItem key={i} reminder={el} />)}
        </ul>
      </div>
    );
  }
}

export default Add;