
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_opciones,
    crear_opcion,
    init_editar_opcion,
    editar_opcion,
    init_crear_opcion
};



function obtener_opciones() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Opciones/Index`, requestOptions).then(handleResponse);

}

async function crear_opcion(opcion) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(opcion)
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Opciones/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}




function init_crear_opcion() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Opciones/Crear`, requestOptions).then(handleResponse);

}

function init_editar_opcion(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
      
    };

    return fetch(`${process.env.REACT_APP_API_URL }api/Opciones/Editar/${id}`, requestOptions).then(handleResponse);

}





async function editar_opcion(opcion) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(opcion)
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Opciones/Editar/${opcion.IdOpcion }`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
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


