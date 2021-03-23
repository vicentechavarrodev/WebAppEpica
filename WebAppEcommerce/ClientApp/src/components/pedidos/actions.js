
import { pedidosConstants } from './constant';
import { ServicesHelper } from './services';
import { alertActions } from '../alerts_message/actions';
import { loader } from '../helpers/loader';

export const pedidosActions = {

    obtener_pedidos,
    mostrar_detalle_pedido,
    obtener_pedido,
    seleccionar_pedido,
    cambiar_estado
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

                        var recibidos = pedidos.filter(word => word.IdEstado === 1);
                        var pendientes = pedidos.filter(word => word.IdEstado === 2);
                        var enviados = pedidos.filter(word => word.IdEstado === 3);

                        if (id === 1) {
                            pedidos = recibidos;
                        } else if (id === 2) {
                            pedidos = pendientes;
                        } else if (id === 3) {
                            pedidos = enviados;
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










