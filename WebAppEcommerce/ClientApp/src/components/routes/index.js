import Usuarios from '../usuario/index';
import Categorias from '../categorias/index';
import Banners from '../banner/index';
import Productos from '../productos/index';
import Opciones from '../opciones/index';
import Details from '../productos/details';
import App from '../../App';
import React from 'react';
import Login from '../usuario/login';
import Ventana from '../ventana_principal/index';
import { Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../helpers/private_route';
import { MemoryRouter } from 'react-router';
import PublicRoute from '../helpers/public_route';
import Pagina from '../pagina/index';
import PideLinea from '../pagina/pideLinea';
import Novedades from '../pagina/novedades';
import Compania from '../pagina/compania';
import Pedidos from '../pedidos/index';
import Horarios from '../horario/index';
import Cards from '../card/index';


const AppRoutes = () =>
  
    <BrowserRouter>
            <App>
            <Switch>
                <PublicRoute restricted={true} component={Login} path="/login" exact />
                <PublicRoute component={Pagina} path="/pizza-neiva-domicilio" exact />
                <PublicRoute component={Novedades} path="/nove-pizza-italiana" exact />
                <PublicRoute component={Compania} path="/pizza-de-hornos" exact />
                <PublicRoute component={PideLinea} path="/pizza-artesanal-neiva" exact />

                <Ventana>
                    <PrivateRoute component={Usuarios} path="/usuarios" exact />
                    <PrivateRoute component={Categorias} path="/categorias" exact />
                    <PrivateRoute component={Opciones} path="/opciones" exact />
                    <PrivateRoute component={Productos} path="/productos" exact />
                    <PrivateRoute component={Details} path="/details" exact />
                    <PrivateRoute component={Pedidos} path="/pedidos" exact />
                    <PrivateRoute component={Banners} path="/banners" exact />
                    <PrivateRoute component={Horarios} path="/horarios" exact />
                    <PrivateRoute component={Cards} path="/cards" exact />
                </Ventana>

                       
               </Switch>
          </App>
    </BrowserRouter>;
        

export default AppRoutes;
        
        
                      