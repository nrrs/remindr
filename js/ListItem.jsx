import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
        this._show = this._show.bind(this);
        this._remove = this._remove.bind(this);
    }
    
    _show(message) {
        this.setState({ message });
        setTimeout(() => this.setState({ message: "" }), 750);
    }

    _remove(id) {
        console.log('remove: ', id);

        chrome.storage.local.get('reminders', result => {
            var reminders = result.reminders,
                idx = id - 1;

            reminders.splice(idx, 1);

            chrome.storage.local.set({ reminders: reminders }, console.log("chrome.storage.sync.set remove"));
        });
    }

    render() {
        const { id } = this.props;
        const { alert, last, reoccur, frequency, onDate } = this.props.reminder;
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

        const renderRemove = (id) ? 
            <i className="fa fa-times" 
                aria-hidden="true" 
                title="Remove" 
                onClick={() => this._remove(id)}></i> :
            null;


        return (
            <li id={id}>
                <span className="alert">{alert}</span>
                {/* <span className="alert">Last: {last}</span> */}
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