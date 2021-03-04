import Usuarios from '../usuario/index';
import Categorias from '../categorias/index';
import Opciones from '../opciones/index';
import App from '../../App';
import React from 'react';
import Login from '../usuario/login';
import Ventana from '../ventana_principal/index';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../helpers/private_route';
import { MemoryRouter } from 'react-router';
import PublicRoute from '../helpers/public_route';



const AppRoutes = () =>
  
    <MemoryRouter>
            <App>
            <Switch>
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <Ventana>
                    <PrivateRoute component={Usuarios} path="/usuarios" exact />
                    <PrivateRoute component={Categorias} path="/categorias" exact />
                    <PrivateRoute component={Opciones} path="/opciones" exact />
                </Ventana>

           
               </Switch>
          </App>
    </MemoryRouter>;
        

export default AppRoutes;
        
        
                      