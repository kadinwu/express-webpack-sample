import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, browserHistory, match } from 'react-router';
import Main from '../shared/components/main';
import reducers from '../shared/reducers/index';
import routes from '../shared/routes';


ReactDOM.render(
    <Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <Router history={ browserHistory } routes={ routes } />
    </Provider>,
    document.getElementById("root")
);