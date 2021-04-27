
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_horarios,
    crear_horario,
    init_crear_horario,
    init_editar_horario,
    editar_horario
};



async function obtener_horarios() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Index`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function crear_horario(horario) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: horario
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function init_crear_horario() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Crear`, requestOptions).then(handleResponse);

}




function init_editar_horario(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Editar/${id}`, requestOptions).then(handleResponse);

}


async function editar_horario(horario,id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: horario
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Editar`, requestOptions)
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


