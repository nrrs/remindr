import React, { Component } from 'react';

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: {
        alert: "",
        // when: new Date().toDateInputValue(),
        // when: Date.now(),
        onDay: new Date().toDateInputValue(),
        atTime: "",
        occurEvery: "",
        frequency: ""
      },
      currentInput: "alert"
    };
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update(field) {
    return e => {
      const reminder = this.state.reminder;

      reminder[field] = e.currentTarget.value;
      this.setState({ reminder });
    };
  }

  submit(field) {
    return e => {
      if (!e) e = window.event;

      const keyCode = e.keyCode || e.which;

      if (keyCode == 13) {
        switch (field) {
          case "alert":
            this.setState({ currentInput: "onDay" });
            break;
          case "onDay":
            this.setState({ currentInput: "atTime" });
            break;
          case "atTime":
            this.setState({ currentInput: "frequency" });
            break;
          case "frequency":
            this.setState({ currentInput: "submit" });
            break;
          case "submit":
            this.props.addReminder(this.state.reminder); // update App state
            this.setState({ // reset this.state.reminder
              reminder: { alert: "", onDay: "", atTime: "", occurEvery: "", frequency: "" }, currentInput: "alert" });
            break;
        }
      }
    };
  }
  

  renderInput() {
    const { alert, onDay, atTime, frequency } = this.state.reminder;

    switch (this.state.currentInput) {
      case "alert":
        return <input id="alert" type="text" placeholder="Remind me to..." value={alert} onChange={this.update("alert")} onKeyPress={this.submit("alert")} autoFocus />;
      case "onDay":
        return <div className="label-container">
            <label>What day?</label>
            <input id="onDay" type="date" value={onDay} onChange={this.update("onDay")} onKeyPress={this.submit("onDay")} autoFocus />
          </div>;
      case "atTime":
        return <div className="label-container">
            <label>What time?</label>
            <input id="onDay" type="time" value={atTime} onChange={this.update("atTime")} onKeyPress={this.submit("atTime")} autoFocus />
          </div>;
      case "frequency":
        return <div className="label-container">
            <label>How often?</label>
            <div onKeyPress={this.submit("frequency")}>
              <input type="radio" name="frequency" value="hourly" defaultChecked />
              <span>
                Every <input id="frequency" type="number" placeholder="0" min="0" max="9" value={frequency} onChange={this.update("frequency")} onKeyPress={this.submit("frequency")} autoFocus /> hours.
              </span>
              <input type="radio" name="frequency" value="daily" />Daily
            </div>
          </div>;
      case "submit":
        return <button className="submit" onKeyPress={this.submit("submit")} autoFocus>
            Gotcha! Press enter to confirm!
          </button>;
    }
  }

  render() {
    const { alert } = this.state.reminder;

    return <div id="add">{this.renderInput()}</div>;
  }
}

export default Add;