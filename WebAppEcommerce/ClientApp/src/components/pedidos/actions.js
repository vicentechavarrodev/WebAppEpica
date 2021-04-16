
import { pedidosConstants } from './constant';
import { ServicesHelper } from './services';
import { alertActions } from '../alerts_message/actions';
import { loader } from '../helpers/loader';

export const pedidosActions = {

    obtener_pedidos,
    mostrar_detalle_pedido,
    obtener_pedido,
    seleccionar_pedido,
    cambiar_estado,
    enviar_pedido
};

function obtener_pedidos(id,context) {
    return dispatch => {

        ServicesHelper.obtener_pedidos(id)
            .then(
                response => {
                    loader.hide();
                   
                    let pedidos;
                    if (response.IsSuccess) {
                        pedidos = response.Result;
                       
                        let pendientes = pedidos.filter(e => e.IdEstado === 1);
                        let recibidos = pedidos.filter(e => e.IdEstado === 2);
                        let enviados = pedidos.filter(e => e.IdEstado === 3);

                        if (id === 1) {
                            pedidos = pendientes;
                           
                        } else if (id === 2) {
                            pedidos = recibidos;
                        } else if (id === 3) {
                            pedidos = enviados;
                        }

                        console.log(context.state.pendientes)
                        console.log(context.state.pendientes.length)
                        if (context.state.pendientes !== 0 && context.state.pendientes != null) {
                            if (pendientes.length > context.state.pendientes) {
                                context.audioNotification()
                            }

                        }
                        
                        context.setState({
                            pendientes: pendientes.length,
                            recibidos: recibidos.length,
                            enviados: enviados.length
                        });

                        if (pedidos !== null) {
                            dispatch(success(pedidos));
                        } else {
                            dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage( response.Message, true, 'Ups'));
                    }
                },
            error => {
              
                dispatch(alertActions.showMessage(error.toString(), true, 'Ups'));
            }
            );
    };


    function success(pedidos) { return { type: pedidosConstants.OBTENER_PEDIDOS, pedidos } }
}


function obtener_pedido(id, context) {
    return dispatch => {

        ServicesHelper.obtener_pedido(id)
            .then(
                response => {
                    loader.hide();

                    let pedido;
                    if (response.IsSuccess) {
                        pedido = response.Result;

                        if (pedido !== null) {
                            dispatch(success(pedido));
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


    function success(pedido) { return { type: pedidosConstants.OBTENER_PEDIDO, pedido } }
}



function cambiar_estado(id,idEstado,idestadoActual, context) {
    return dispatch => {

        ServicesHelper.cambiar_estado(id, idEstado)
            .then(
                response => {
                    loader.hide();

                    let pedido;
                    if (response.IsSuccess) {
                        pedido = response.Result;

                        if (pedido !== null) {
                            dispatch(success(pedido));
                            context.props.mostrar_detalle_pedido(false);
                            context.props.obtener_pedidos(idestadoActual, context);
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


    function success(pedido) { return { type: pedidosConstants.CAMBIAR_ESTADO, pedido } }
}

function mostrar_detalle_pedido(mostrar_detalle) {

    return { type: pedidosConstants.MOSTRAR_DETALLE_PEDIDO, mostrar_detalle };

}



function seleccionar_pedido(id_pedido_seleccionado) {

    return { type: pedidosConstants.SELECCIONAR_PEDIDO, id_pedido_seleccionado };

}

function enviar_pedido(pedido,context) {

    return async dispatch => {
        await ServicesHelper.enviar_pedido(pedido)
            .then(
                response => {

                    if (response.IsSuccess) {
                        loader.hide();
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.ver_car(false);
                            context.props.limpiar_pedidos([])
                            context.props.asignar_cantidad_pedido(0);

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

    function success(pedido_enviado) { return { type: pedidosConstants.ENVIAR_PEDIDO, pedido_enviado }; }

}










