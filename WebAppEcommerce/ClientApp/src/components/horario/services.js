﻿
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_horarios,
    crear_horario,
    init_crear_horario,
    init_editar_horario,
    eliminar_horario,
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
        body: JSON.stringify(horario)
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


async function editar_horario(horario) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(horario)
    };

    return await fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Editar/${horario.IdHorario}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
async function eliminar_horario(id) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Horarios/Eliminar/${id}`, requestOptions)
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


