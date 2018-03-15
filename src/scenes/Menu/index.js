import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import Accueil from './components/Accueil';
import Jouer from './components/Jouer/';
import Rejoindre from './components/Rejoindre/';

/****************************/
/***CONTENEUR PAGE DE MENU***/
/****************************/

export class Menu extends Component {

    render() {
        return (
        <div>
            <Router>
                <div>
                    <Route exact path="/" component={Accueil} />
                    <Route exact path="/jouer" component={Jouer} />
                    <Route exact path="/rejoindre" component={Rejoindre} />
                </div>
            </Router>
        </div>
    );
  }
}
/**


<Route exact path="/scores" component={} />
<Route exact path="/aide" component={} />
<Route exact path="/options" component={} />
<Route exact path="/credits" component={} />

**/
