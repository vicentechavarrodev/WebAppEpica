
import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_pedidos,
    obtener_pedido,
    cambiar_estado,
    enviar_pedido
};



function obtener_pedidos(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Pedidos/Index`, requestOptions).then(handleResponse);

}

function cambiar_estado(id,idEstado) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };


    return fetch(`${process.env.REACT_APP_API_URL}api/Pedidos/CambiarEstado/${id}/${idEstado}`, requestOptions).then(handleResponse);

}

function enviar_pedido(pedido) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(pedido)
    };

  
    return fetch(`${process.env.REACT_APP_API_URL}api/Pedidos/GrabarPedido`, requestOptions).then(handleResponse);

}


function obtener_pedido(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Pedidos/ObtenerPedidoCompleto/${id}`, requestOptions).then(handleResponse);

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



