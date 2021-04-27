
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_banners,
    crear_banner,
    init_crear_banner,
    init_editar_banner,
    editar_banner
};



async function obtener_banners() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Banners/Index`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function crear_banner(banner) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": process.env.REACT_APP_PASSWORD_AUTH
        },
        body: banner
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Banners/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function init_crear_banner() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Banners/Crear`, requestOptions).then(handleResponse);

}




function init_editar_banner(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Banners/Editar/${id}`, requestOptions).then(handleResponse);

}


async function editar_banner(banner,id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Authorization": process.env.REACT_APP_PASSWORD_AUTH
        },
        body: banner
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Banners/Editar`, requestOptions)
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


