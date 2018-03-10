import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from 'react-intl';

import { Login } from './scenes/Login/';

/*****************/
/****Component****/
/*****************/

class App extends Component {

  render() {
    var appStyle = {
        textAlign: "center",

        page: {
            width: "80vw",
            minHeight: "70vh",
            margin: "auto",
            border: "1px solid #000000",
            padding: 20
        }
    };

    return (
        <div>
            <h1 style={appStyle}>
                <FormattedMessage id="App.title" />
            </h1>

            <Router>
                <div style={appStyle.page}>

                    <Link to="/login">
                        <FormattedMessage id="App.testLink" />
                    </Link>

                    <Route exact path="/login" component={Login} />

                    <Route exact path="/" component={Login} />

                </div>
            </Router>
        </div>
    );
  }
}


export default injectIntl(App);
