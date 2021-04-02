import { authHeader } from '../helpers/header_auth';

export const ServicesHelper = {
    obtener_productos,
    crear_producto,
    init_editar_producto,
    editar_producto,
    init_crear_producto,
    obtener_opciones_producto,
    crear_opciones_producto,
    eliminar_opcion_producto,
    productos_por_categoria,
    obtener_tipo_opciones_producto,
    crear_producto_tipo_opcion,
    obtener_opciones_seleccion,
    obtener_tipo_opciones_producto_agregadas,
    eliminar_tipo_opcion_producto,
    init_editar_tipo_opcion_producto,
    editar_tipo_opcion_producto,
    crear_opcion_secundaria,
    init_crear_opcion_secundaria,
    obtener_tipos_seleccion
};




function obtener_tipo_opciones_producto_agregadas(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Opciones/ObtenerTipoOpcionesProductoAgregadas/${id}`, requestOptions).then(handleResponse);

}

function obtener_tipo_opciones_producto(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Opciones/ObtenerTipoOpciones/${id}`, requestOptions).then(handleResponse);

}


function obtener_productos() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/Index`, requestOptions).then(handleResponse);

}

async function crear_producto(producto) {

    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: producto
    };



    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/Crear`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}


async function crear_opcion_secundaria(opcion) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(opcion)
    };



    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/CrearOpcionSecundaria`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}




async function editar_tipo_opcion_producto(producto) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(producto)
    };



    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/EditarTipoOpcionProducto`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function crear_producto_tipo_opcion(producto) {
   
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(producto)
    };



    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/CrearProductoTipoOpcion`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function init_crear_producto() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/Crear`, requestOptions).then(handleResponse);

}

function obtener_tipos_seleccion() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/TipoSelecciones`, requestOptions).then(handleResponse);

}

function init_crear_opcion_secundaria(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/CrearOpcionSecundaria/${id}`, requestOptions).then(handleResponse);

}

function init_editar_producto(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
      
    };

    return fetch(`${process.env.REACT_APP_API_URL }api/Productos/Editar/${id}`, requestOptions).then(handleResponse);

}

function init_editar_tipo_opcion_producto(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/EditarTipoOpcionProducto/${id}`, requestOptions).then(handleResponse);

}

async function editar_producto(producto, id) {
    console.log(id);
    const requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: producto
    };



    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/Editar`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });

}

function obtener_opciones_producto(id, agrupado) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/ProductoOpciones/${id}/${agrupado}`, requestOptions).then(handleResponse);

}


function obtener_opciones_seleccion(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Opciones/ProductoOpciones/${id}`, requestOptions).then(handleResponse);

}




async function crear_opciones_producto(id,listadoOpciones) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(listadoOpciones)
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Opciones/CrearOpcionesProducto/${id}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}



async function eliminar_opcion_producto(id) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/EliminarProductoOpcion/${id}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

async function eliminar_tipo_opcion_producto(id) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };


    return await fetch(`${process.env.REACT_APP_API_URL}api/Productos/EliminarProductoTipoOpcion/${id}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function productos_por_categoria(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()

    };

    return fetch(`${process.env.REACT_APP_API_URL}api/Productos/ProductosPorCategoria/${id}`, requestOptions).then(handleResponse);

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


