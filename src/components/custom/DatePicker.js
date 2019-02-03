import React from "react";
// import "semantic-ui-css/semantic.min.css";
// import PropTypes from "prop-types";

const DatePicker = () => (
    <div className="ui calendar" id="example1">
        <div className="ui input left icon">
            <i className="calendar icon"></i>
            <input type="text" placeholder="Date/Time"/>
        </div>
    </div>);

DatePicker.propTypes = {
    // text: PropTypes.string.isRequired
};

export default DatePicker;




