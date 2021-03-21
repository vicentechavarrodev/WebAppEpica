import { productoConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const productoActions = {
   
    obtener_productos,
    ver_crear,
    crear_producto,
    cargar_crear,
    cargar_editar,
    ver_editar,
    editar_producto,
    producto_seleccionado,
    obtener_opciones_producto,
    opcion_producto_seleccionado,
    obtener_opciones_seleccion,
    ver_seleccionar_opcion,
    crear_opciones_producto,
    eliminar_opcion_producto
    

};

function obtener_productos() {
    return dispatch => {

        ServicesHelper.obtener_productos()
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
            error => {
                dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(productos) { return { type: productoConstants.OBTENER_PRODUCTOS, productos }; }
}

function cargar_crear() {
    return dispatch => {

        ServicesHelper.init_crear_producto()
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                          //  context.setState({ opcion: response.Result });

                        } else {
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_crear) { return { type: productoConstants.CARGAR_CREATE_PRODUCTO, init_crear }; }
}

function obtener_opciones_producto(id, context) {

    return dispatch => {

        ServicesHelper.obtener_opciones_producto(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            //context.setState({ producto: response.Result });


                        } else {
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(opciones_producto) { return { type: productoConstants.OBTENER_OPCIONES_PRODUCTO, opciones_producto }; }
}

function obtener_opciones_seleccion(id, context) {

    return dispatch => {

        ServicesHelper.obtener_opciones_seleccion(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            //context.setState({ producto: response.Result });


                        } else {
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };


    function success(opciones_seleccion) { return { type: productoConstants.OBTENER_OPCIONES_SELECCION, opciones_seleccion }; }
}

function cargar_editar(id, context) {
    
    return dispatch => {

        ServicesHelper.init_editar_producto(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {
                        console.log(response.Result);

                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ producto: response.Result });
                         

                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_editar) { return { type: productoConstants.CARGAR_EDITAR_PRODUCTO, init_editar };}
}

function ver_crear(mostrar_crear) {

    return { type: productoConstants.MOSTRAR_CREATE_PRODUCTO, mostrar_crear };
   
}

function ver_seleccionar_opcion(mostrar_seleccion_opcion) {

    return { type: productoConstants.MOSTRAR_SELECCION_OPCION, mostrar_seleccion_opcion };

}

function producto_seleccionado(id_producto_seleccionado) {

    return { type: productoConstants.PRODUCTO_SELECCIONADO, id_producto_seleccionado };

}

function opcion_producto_seleccionado(id_opcion_producto_seleccionado) {

    return { type: productoConstants.OPCION_PRODUCTO_SELECCIONADA, id_opcion_producto_seleccionado };

}

function ver_editar(mostrar_editar) {

    return { type: productoConstants.MOSTRAR_EDITAR_PRODUCTO, mostrar_editar };

}

function crear_producto(producto, context) {
    return dispatch => {


        ServicesHelper.crear_producto(producto)
            .then(
                response => {
                   
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            
                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_productos();
                            context.props.ver_crear(false);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };

    function success(producto_creado) { return { type: productoConstants.CREAR_PRODUCTO, producto_creado }; }


}

function editar_producto(producto,id, context) {
    return dispatch => {

      
        ServicesHelper.editar_producto(producto, id)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_productos();
                            context.props.ver_editar(false);
                            context.props.producto_seleccionado(0);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage( response.message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage( error.toString(), true, 'Ups'));
                }
            );
    };

    function success(producto_actualizada) { return { type: productoConstants.EDITAR_PRODUCTO, producto_actualizada }; }


}

function crear_opciones_producto(id,producto, context) {
    return dispatch => {


        ServicesHelper.crear_opciones_producto(id,producto)
            .then(
                response => {
                   
                    if (response.IsSuccess) {
                        loader.hide();
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_opciones_producto(id);
                            context.props.ver_seleccionar_opcion(false);


                        } else {
                           
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };

    function success(producto_opciones_creados) { return { type: productoConstants.CREAR_OPCIONES_PRODUCTO, producto_opciones_creados }; }


}

function eliminar_opcion_producto(id,idproducto,context) {
    return dispatch => {


        ServicesHelper.eliminar_opcion_producto(id)
            .then(
                response => {

                    if (response.IsSuccess) {
                        loader.hide();
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_opciones_producto(idproducto);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage(response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
                }
            );
    };

    function success(opcion_producto_eliminada) { return { type: productoConstants.ELIMINAR_OPCION_PRODUCTO, opcion_producto_eliminada }; }


}


