import { productoConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const productoActions = {
   
    obtener_productos,
    ver_crear,
    ver_car,
    crear_producto,
    cargar_crear,
    cargar_editar,
    ver_editar,
    editar_producto,
    producto_seleccionado,
    obtener_opciones_producto,
    opcion_producto_seleccionado,
    ver_seleccionar_opcion,
    crear_opciones_producto,
    eliminar_opcion_producto,
    productos_por_categoria,
    obtener_tipo_opciones_producto,
    mostrar_agregar,
    crear_tipo_opcion_producto,
    obtener_opciones_seleccion,
    obtener_tipo_opciones_producto_agregadas,
    eliminar_tipo_opcion_producto,
    init_editar_tipo_opcion_producto,
    ver_editar_tipo_opcion,
    editar_tipo_opcion_producto,
    crear_opcion_secundaria,
    init_crear_opcion_secundaria,
    ver_crear_opcion_secundaria,
    obtener_tipos_seleccion,
    agregar_pedido_general

};


function obtener_tipo_opciones_producto_agregadas(id) {
    return async dispatch => {

        await ServicesHelper.obtener_tipo_opciones_producto_agregadas(id)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            dispatch(success(response.Result));
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


    function success(productos_tipo_opciones_agregadas) { return { type: productoConstants.OBTENER_TIPO_OPCIONES_AGREGADAS, productos_tipo_opciones_agregadas }; }
}

function obtener_tipo_opciones_producto(id) {
    return async dispatch => {

        await ServicesHelper.obtener_tipo_opciones_producto(id)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
                            dispatch(success(response.Result));
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


    function success(tipos_opciones_producto) { return { type: productoConstants.OBTENER_TIPO_OPCIONES_PRODUCTO, tipos_opciones_producto }; }
}

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

function init_editar_tipo_opcion_producto(id, context) {
    return dispatch => {

        ServicesHelper.init_editar_tipo_opcion_producto(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {
                     

                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ productoTipoOpcion: response.Result });

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


    function success(init_editar_producto_tipo_op) { return { type: productoConstants.CARGAR__EDITAR_TIPO_OPCION_PRODUCTO, init_editar_producto_tipo_op }; }
}

function obtener_opciones_producto(id,agrupado, context) {

    return async dispatch => {

      await  ServicesHelper.obtener_opciones_producto(id, agrupado)
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

function cargar_editar(id, context) {
    
    return dispatch => {

        ServicesHelper.init_editar_producto(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {

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
function ver_car(mostrar_car) {

    return { type: productoConstants.MOSTRAR_CAR_PRODUCTO, mostrar_car };

}

function mostrar_agregar(mostrar_agregar_tipo_opcion) {

    return { type: productoConstants.MOSTRAR_CREAR_TIPO_OPCION, mostrar_agregar_tipo_opcion };

}

function ver_seleccionar_opcion(mostrar_seleccion_opcion) {

    return { type: productoConstants.MOSTRAR_SELECCION_OPCION, mostrar_seleccion_opcion };

}

function ver_editar_tipo_opcion(mostrar_editar_tipo_opcion) {

    return { type: productoConstants.MOSTRAR_EDITAR_TIPO_OPCION_PRODUCTO, mostrar_editar_tipo_opcion };

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

    function success(producto_creado) { return { type: productoConstants.CREAR_PRODUCTO, producto_creado }; }


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

function crear_tipo_opcion_producto(producto, context) {
    return dispatch => {


        ServicesHelper.crear_producto_tipo_opcion(producto)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            
                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.mostrar_agregar(false);
                            context.props.obtener_tipo_opciones_producto_agregadas(producto.IdProducto, context);
                            
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

function editar_tipo_opcion_producto (producto, context) {
    return dispatch => {


        ServicesHelper.editar_tipo_opcion_producto(producto)
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.ver_editar_tipo_opcion(false);
                            context.props.obtener_tipo_opciones_producto_agregadas(producto.IdProducto, context);

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
                            context.props.obtener_opciones_producto(id,false,this);
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
                            context.props.obtener_opciones_producto(idproducto, false, this);
                          


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


function eliminar_tipo_opcion_producto(id_tipo_opcion_producto, idproducto, context) {
    return dispatch => {


        ServicesHelper.eliminar_tipo_opcion_producto(id_tipo_opcion_producto)
            .then(
                response => {
                   
                    if (response.IsSuccess) {
                        loader.hide();
                        if (response.Result !== null) {
                          
                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_tipo_opciones_producto_agregadas(idproducto, context);
                            context.props.obtener_opciones_producto(idproducto, false);


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

    function success(tipo_opcion_producto_eliminada) { return { type: productoConstants.ELIMINAR_TIPO_OPCION_PRODUCTO, tipo_opcion_producto_eliminada }; }


}

function productos_por_categoria(id, context) {

    return dispatch => {

        ServicesHelper.productos_por_categoria(id)
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


    function success(productos_categoria) { return { type: productoConstants.PRODUCTOS_POR_CATEGORIA, productos_categoria }; }
}

function crear_opcion_secundaria(opcion,idProducto, context) {
    return dispatch => {


        ServicesHelper.crear_opcion_secundaria(opcion)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_opciones_producto(idProducto, false, context)
                            context.props.ver_crear_opcion_secundaria(false);


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

    function success(opcion_secundaria_creada) { return { type: productoConstants.OPCION_SECUNDARIA_CREADA, opcion_secundaria_creada }; }


}

function init_crear_opcion_secundaria(id, context) {
    return async dispatch => {

        await ServicesHelper.init_crear_opcion_secundaria(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ vista: response.Result });

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


    function success(opcion_secundaria) { return { type: productoConstants.CARGAR_TIPO_OPCION_SECUNDARIA, opcion_secundaria }; }
}

function ver_crear_opcion_secundaria(mostrar_crear_opcion_secundaria) {

    return { type: productoConstants.MOSTRAR_CREAR_TIPO_OPCION_SECUNDARIA, mostrar_crear_opcion_secundaria };

}


function obtener_tipos_seleccion( context) {

    return dispatch => {

        ServicesHelper.obtener_tipos_seleccion()
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


    function success(tipos_seleccion) { return { type: productoConstants.OBTENER_TIPO_SELECCIONES, tipos_seleccion }; }
}


function agregar_pedido_general(productos_pedido) {
    return { type: productoConstants.AGREGAR_PRODUCTO_PEDIDO, productos_pedido };

}