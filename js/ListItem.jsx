import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this._show = this._show.bind(this);
    }
    
    _show(message) {
        this.setState({ message });
        setTimeout(() => this.setState({ message: "" }), 750);
    }

    render() {
        const { id, alert, reoccur, frequency, onDate } = this.props.reminder;
        const { message } = this.state;

        const renderOccur = (reoccur) ?
            <i className="fa fa-clock-o"
                aria-hidden="true"
                title={frequency}
                onClick={() => this._show(frequency)}></i> :
            null;
            
        const renderOnDate = (onDate) ?
            <i className="fa fa-calendar-check-o"
                aria-hidden="true"
                title={onDate}
                onClick={() => this._show(onDate)}></i> :
            null;

        return (
            <li id={id}>
                <span className="alert">{alert}</span>
                <div className="options">
                    {message}
                    {renderOccur}
                    {renderOnDate}
                    <i className="fa fa-times" aria-hidden="true" title="Remove"></i>
                </div>
            </li>
        );
    }
};

export default ListItem;