import { createStore, combineReducers, applyMiddleware } from 'redux';
import lateral_bar_reducers from './components/lateral_bar/reducers';
import { authentication } from './components/usuario/reducers';
import { ventanaPrincipalReducer } from './components/ventana_principal/reducers';
import { reportes } from './components/reportes_generales/reducers';
import empresasReducer from './components/empresa/reducers';
import sedesReducer from './components/sede/reducers';
import { alerts } from './components/alerts_message/reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    lateral_bar_reducers,
    authentication,
    alerts,
    ventanaPrincipalReducer,
    empresasReducer,
    sedesReducer,
    reportes
});


const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));


export default store;