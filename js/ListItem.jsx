import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    
    show(message) {
        this.setState({ message });
    }

    hide(message) {
        this.setState({ message: "" });
    }

    render() {
        const { id } = this.props;
        const { alert, reoccur, frequency, onDate } = this.props.reminder;
        const { message } = this.state;

        const renderOccur = (reoccur) ?
            <i className="fa fa-repeat"
                aria-hidden="true"
                title={frequency}
                onMouseOver={() => this.show(frequency)}
                onMouseLeave={() => this.hide(frequency)}></i> :
            null;
            
        const renderOnDate = (onDate) ?
            <i className="fa fa-calendar-check-o"
                aria-hidden="true"
                title={onDate}
                onMouseOver={()=> this.show(onDate)}></i> :
            null;

        const renderRemove = (id) ? 
            <i className="fa fa-times" 
                aria-hidden="true" 
                title="Remove" 
                // onClick={() => this._remove(id)}>
                onClick={() => this.props.remove(id)}></i> :
            null;


        return (
            <li id={id}>
                <span className="alert">{alert}, {`reoccur: ${reoccur}`}, {frequency}, {onDate}</span>
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