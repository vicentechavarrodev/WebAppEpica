
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_categorias,
    crear_categoria,
    init_editar_categoria,
    editar_categoria
};



async function obtener_categorias() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

   
    return await fetch(`${process.env.REACT_APP_API_URL}api/Categorias/Index`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function crear_categoria(categoria) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(categoria)
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Categorias/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}





function init_editar_categoria(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
      
    };

    return fetch(`${process.env.REACT_APP_API_URL }api/Categorias/Editar/${id}`, requestOptions).then(handleResponse);

}





async function editar_categoria(categoria) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(categoria)
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Categorias/Editar/${categoria.IdCategoria }`, requestOptions)
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


