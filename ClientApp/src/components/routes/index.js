import Login from '../usuario/login';
import Usuario from '../usuario/index';
import App from '../../App';
import React from 'react';
import Ventana from '../ventana_principal/index';
import Empresas from '../empresa';
import PaginaWeb from '../pagina_web/index';
import { Switch, BrowserRouter} from 'react-router-dom';
import PrivateRoute from '../helpers/private_route';
import PublicRoute from '../helpers/public_route';
import ReporteUsuarios from '../reportes_generales/report_usuarios';
import ReporteVentas from '../reportes_generales/report_ventas';
import { MemoryRouter } from 'react-router'

const AppRoutes = () =>
  
    <MemoryRouter>
            <App>
            <Switch>
                   <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute component={PaginaWeb} path="/" exact />

                <Ventana>
                        <PrivateRoute component={Empresas} path="/empresa" exact />
                        <PrivateRoute component={Usuario} path="/usuario" exact />
                        <PrivateRoute component={ReporteUsuarios} path="/reporteUsuarios" exact />
                        <PrivateRoute component={ReporteVentas} path="/reporteVentas" exact />
                    </Ventana>
               </Switch>
          </App>
    </MemoryRouter>;
        

export default AppRoutes;
        
        
                      