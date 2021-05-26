
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_cards,
    crear_card,
    init_crear_card,
    init_editar_card,
    eliminar_card,
    editar_card
};



async function obtener_cards() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Cards/Index`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function crear_card(card) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(card)
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Cards/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function init_crear_card() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Cards/Crear`, requestOptions).then(handleResponse);

}




function init_editar_card(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Cards/Editar/${id}`, requestOptions).then(handleResponse);

}


async function editar_card(card) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(card)
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Cards/Editar/${card.IdCard}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
async function eliminar_card(id) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Cards/Eliminar/${id}`, requestOptions)
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


