import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../App.jsx';
import Home from '../components/Home.jsx';
import Comparator from '../components/Comparator.jsx';
import Details from '../components/Details.jsx';

export function route(store) {
    const history = syncHistoryWithStore(browserHistory, store);

    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="comparator" component={Comparator}/>
                <Route path="details" component={Details}/>
            </Route>
        </Router>
    );
}
