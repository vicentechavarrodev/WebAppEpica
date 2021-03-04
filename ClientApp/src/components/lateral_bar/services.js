
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    getFormularios,
};



function getFormularios(codigoUsuario, esPrincipal) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ codigoUsuario, esPrincipal })
    };

     return fetch(`api/Formularios/CargarMenu`, requestOptions).then(handleResponse);
        
}




function handleResponse(response) {
   
    if (!response.ok) {
        return response.json()
            .catch(() => {
                throw new Error(response.status);
            })
            .then(({ message }) => {
                throw new Error(message || response.status);
            });
    }
    return response.json();
}



