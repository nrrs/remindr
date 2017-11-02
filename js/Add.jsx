import React, { Component } from 'react';
import moment from "moment/src/moment";

class Add extends Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      reminder: {
        alert: "",
        when: moment.utc(new Date()).format("YYYY-MM-DDT09:00"),
        frequency: "",
        betweenStart: "09:00",
        betweenEnd: "18:00"
      },
      currentInput: "alert"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => {
      const reminder = this.state.reminder;
      reminder[field] = e.currentTarget.value;
      this.setState({ reminder });
    };
  }

  handleSubmit(field) {
    return e => {
      if (!e) e = window.event;

      const keyCode = e.keyCode || e.which;

      if (keyCode == 13) {
        switch (field) {
          case "alert":
            this.setState({ currentInput: "when" });
            break;
          case "when":
            this.setState({ currentInput: "frequency" });
            break;
          case "frequency":
            this.setState({ currentInput: "between" });
            break;
          case "between":
            this.setState({ currentInput: "submit" });
            break;
          case "submit":
            let reminder = this.state.reminder;
            reminder.when = moment(reminder.when).utc().valueOf();
            // reminder.frequency = moment(reminder.frequency * 60).utc().valueOf();
            console.log(reminder);

            this.props.addReminder(reminder); // handleChange App state
            this.setState({
              reminder: {
                alert: "",
                when: moment.utc(new Date()).format("YYYY-MM-DDT09:00"),
                frequency: "",
                betweenStart: "09:00",
                betweenEnd: "18:00"
              },
              currentInput: "alert"
            });
            break;
        }
      }
    };
  }
  

  renderInput() {
    const { alert, when, onDay, atTime, frequency, betweenStart, betweenEnd } = this.state.reminder;

    switch (this.state.currentInput) {
      case "alert":
        return <input id="alert" type="text" placeholder="Remind me to..." value={alert} onChange={this.handleChange("alert")} onKeyPress={this.handleSubmit("alert")} autoFocus />;
      case "when":
        return <div className="label-container">
            <label>When?</label>
            <input id="when" type="datetime-local" value={when} onChange={this.handleChange("when")} onKeyPress={this.handleSubmit("when")} autoFocus />
          </div>;
      case "frequency":
        return <div className="label-container">
            <label>How often?</label>
            <div>
              <span>
                Every <input id="frequency" type="number" placeholder="0" min="0" max="9" value={frequency} onChange={this.handleChange("frequency")} onKeyPress={this.handleSubmit("frequency")} autoFocus /> hours.
              </span>
            </div>
          </div>;
      case "between":
        return <div className="label-container">
            <label>Between?</label>
            <div>
              <input id="betweenStart" type="time" value={betweenStart} onChange={this.handleChange("betweenStart")} onKeyPress={this.handleSubmit("between")} autoFocus />
              &amp;
              <input id="betweenEnd" type="time" value={betweenEnd} onChange={this.handleChange("betweenEnd")} onKeyPress={this.handleSubmit("between")} />
            </div>
          </div>;
      case "submit":
        return <button className="submit" onKeyPress={this.handleSubmit("submit")} autoFocus>
            Gotcha! Press enter to confirm!
          </button>;
    }
  }

  render() {
    return <div id="add">{this.renderInput()}</div>;
  }
}

export default Add;