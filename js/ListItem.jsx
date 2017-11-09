import React from 'react';
import Moment from "moment/src/moment";

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
        this.hide = this.hide.bind(this);
    }
    
    show(key, message) {
        switch(key) {
            case 'frequency':
                if (parseInt(message) > 1) {
                    this.setState({ message: `Every ${message} Minutes`}); // update minutes to hours app.42 or add.53
                } else {
                    this.setState({ message: `Every Minute`});
                }
                break;
            case 'when':
                let formattedDate = Moment.utc(message).format("ll");
                this.setState({ message: formattedDate });
                break;
            default:
                this.setState({ message });
        }
    }

    hide() {
        this.setState({ message: "" });
    }

    render() {
        const { id } = this.props;
        const { alert, when, frequency } = this.props.reminder;
        const { message } = this.state;

        const renderOccur = frequency ? <i className="fa fa-repeat" aria-hidden="true" title={frequency} onMouseOver={() => this.show('frequency', frequency)} onMouseLeave={this.hide} /> : null;
            
        const renderOnDate = when ? <i className="fa fa-calendar-check-o" aria-hidden="true" title={when} onMouseOver={() => this.show('when', when)} onMouseLeave={this.hide} /> : null;

        const renderRemove = alert ? <i className="fa fa-times" aria-hidden="true" title="Remove" onClick={() => this.props.remove(alert)}></i> : null;

        return (
            <li id={id}>
                <span className="alert">{alert}</span>
                <div className="options">
                    {message}
                    {renderOccur}
                    {renderOnDate}
                    {renderRemove}
                </div>
            </li>
        );
    }
};

export default ListItem;