import React, { Component } from 'react';

class Add extends Component {
  constructor(props) {
    super(props);

    this.remindersArray = [];

    this.state = {
      reminder: {
        alert: '',
        last: '',
        reoccur: true,
        frequency: "Every 3 Hours",
        onDate: false
      }
    };

    // this._handleSubmit = this._handleSubmit.bind(this);
    
    this._update = this._update.bind(this);
    this._toggle = this._toggle.bind(this);
  }

    _update(field) {
        return (e => {
            const reminder = this.state.reminder;

            reminder[field] = e.currentTarget.value;
            this.setState({ reminder });
        });
    }

    _toggle(field) {
        // document.getElementById(field).classList.add("fart");
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
    const { reminders } = this.state;

    return (
      <div>
          <input
              id="alert"
              type="text"
              placeholder="How may I help you?"
              onChange={this._update("alert")}
              onKeyPress={this._toggle("alert")}
              // onKeyPress={() => this.props.addReminder({alert:'norris'})}
          />
          {/* <input
              id="last"
              type="text"
              placeholder="How may I help you?"
              onChange={this._update("last")}
              onKeyPress={this._toggle("last")}
          /> */}
      </div>
    );
  }
}

export default Add;