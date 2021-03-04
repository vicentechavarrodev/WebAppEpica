import { createStore, combineReducers, applyMiddleware } from 'redux';
import { lateralBarReducer } from './components/lateral_bar/reducers';
import { opcionesReducer } from './components/opciones/reducers';
import { authentication } from './components/usuario/reducers';
import { categoriaReducer } from './components/categorias/reducers';
import { ventanaPrincipalReducer } from './components/ventana_principal/reducers';
import { alerts } from './components/alerts_message/reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    lateralBarReducer,
    authentication,
    categoriaReducer,
    alerts,
    ventanaPrincipalReducer,
    opcionesReducer
});


const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));


export default store;