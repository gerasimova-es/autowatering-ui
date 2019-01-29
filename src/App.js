import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import HomePage from "./components/pages/Home";

const App = ({ location}) => (
    <div className="ui container">
        <Route location={location} path="/" exact component={HomePage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};

export default App;
