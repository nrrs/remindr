import React, { Component } from 'react';
import ListItem from "./ListItem";
import List from "./List";

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

    this._handleSubmit = this._handleSubmit.bind(this);
    this._update = this._update.bind(this);
    this._toggle = this._toggle.bind(this);
  }

  componentWillMount() {
    chrome.storage.local.get({ reminders: [] }, results => {
    //   console.log("On Mount Reminders List: ", results);
      this.remindersArray = results.reminders;

      this.setState({
        reminders: this.remindersArray
      });
    });
  }

    _update(field) {
        // console.log('update');
        return (e => {
            this.setState({
                reminder: { [field]: e.currentTarget.value }
            });
        });
    }

    _toggle(field) {
        // document.getElementById(field).classList.add("fart");
        return (e => {
            if (!e) e = window.event;
            
            var keyCode = e.keyCode || e.which;
            
            if (keyCode == "13") {
              // Enter pressed
              this._handleSubmit();
            }
        });
    }

    _handleSubmit() {
        console.log('submit');
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
      const { reminders } = this.state;
    //   console.log(reminders);
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
            <input
                id="alert"
                type="text"
                placeholder="How may I help you?"
                onChange={this._update("alert")}
                onKeyPress={this._toggle("alert")}
            />
        </form>
        <List data={reminders} />
      </div>
    );
  }
}

export default Add;