import React, { Component } from 'react';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: {
        alert: '',
        reoccur: true,
        frequency: "Every 3 Hours",
        onDate: false
      },
      currentInput: 'alert'
    };
    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

    update(field) {
        return (e => {
            const reminder = this.state.reminder;

            reminder[field] = e.currentTarget.value;
            this.setState({ reminder });
        });
    }

    submit(field) {
        return ((e) => {
            if (!e) e = window.event;
            
            var keyCode = e.keyCode || e.which;
            
            if (keyCode == "13" && field !== 'last' ) { // on Enter key press
              this.props.addReminder(this.state.reminder); // update App state
              this.setState({ // reset this.state.reminder
                reminder: {
                  alert: '',
                  last: '',
                  reoccur: true,
                  frequency: "Every 3 Hours",
                  onDate: false
                }
              });
              

              // this._handleSubmit();
            } else if (keyCode == "13") {
                console.log('next input', field);
                document.getElementById(field).classList.add('hi');
            } else {
                return;
            }
        });
    }

  render() {
    const { alert } = this.state.reminder;

    return (
      <div id="add">
          <input
              id="alert"
              type="text"
              placeholder="How may I help you?"
              value={alert}
              onChange={this.update("alert")}
              onKeyPress={this.submit("alert")}
          />
          {/* <input
              id="last"
              type="text"
              placeholder="How may I help you?"
              onChange={this.update("last")}
              onKeyPress={this.submit("last")}
          /> */}
      </div>
    );
  }
}

export default Add;