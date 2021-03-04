import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes from './components/routes/index';
import { Router } from "react-router";
import { history } from './components/helpers/history';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';



const Root = (
    <Provider store={store}>
        <Router history={history}>
            <AppRoutes />
        </Router>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));


registerServiceWorker();



