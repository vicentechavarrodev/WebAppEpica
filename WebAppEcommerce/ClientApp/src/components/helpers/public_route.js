import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({ component: Component, ...rest }) => {

   
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('usuario') ? <Redirect to="/ventana" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;