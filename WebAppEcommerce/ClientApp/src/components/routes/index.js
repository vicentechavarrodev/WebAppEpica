import Usuarios from '../usuario/index';
import Categorias from '../categorias/index';
import Productos from '../productos/index';
import Opciones from '../opciones/index';
import Details from '../productos/details';
import Pedidos from '../pedidos/index';
import Pagina from '../pagina/index';
import App from '../../App';
import React from 'react';
import Login from '../usuario/login';
import Ventana from '../ventana_principal/index';
import { MemoryRouter } from 'react-router'
import PrivateRoute from '../helpers/private_route';
import PublicRoute from '../helpers/public_route';

import {
   
    BrowserRouter,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";



const AppRoutes = () =>

    <MemoryRouter>
        <App>
            <Switch>
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute restricted={true} component={Pagina} path="/pagina" exact />
              
                <Ventana>
                    <div>
                        <PrivateRoute component={Pedidos} path="/pedidos" exact />
                        <PrivateRoute component={Categorias} path="/categorias" exact />
                        <PrivateRoute component={Opciones} path="/opciones" exact />
                        <PrivateRoute component={Productos} path="/productos" exact />
                        <PrivateRoute component={Details} path="/details" exact />
                    </div>
                </Ventana>
                </Switch>
                  
        </App>
    </MemoryRouter>;


export default AppRoutes;