import initialState from './initial_state';
import { pedidosConstants } from './constant';

export function pedidosReducer(state = initialState.pedidos_state, action) {
    switch (action.type) {

        case pedidosConstants.OBTENER_PEDIDOS: {
            return {
                ...state, pedidos: action.pedidos
            }

        }
        case pedidosConstants.MOSTRAR_DETALLE_PEDIDO: {
            return {
                ...state, mostrar_detalle: action.mostrar_detalle
            }

        }

        case pedidosConstants.OBTENER_PEDIDO: {
            return {
                ...state, pedido: action.pedido
            }

        }

        case pedidosConstants.SELECCIONAR_PEDIDO: {
            return {
                ...state, id_pedido_seleccionado: action.id_pedido_seleccionado
            }

        }


        case pedidosConstants.CAMBIAR_ESTADO: {
            return {
                ...state, estado_cambiado: action.estado_cambiado
            }

        }


        case pedidosConstants.ENVIAR_PEDIDO: {
            return {
                ...state, pedido_enviado: action.pedido_enviado
            }

        }




        case pedidosConstants.CAMBIAR_ESTADO_ENVIADO: {
            return {
                ...state, enviados: action.enviados
            }

        }

        case pedidosConstants.CAMBIAR_ESTADO_PENDIENTE: {
            return {
                ...state, pendientes: action.pendientes
            }

        }


        case pedidosConstants.CAMBIAR_ESTADO_RECIBIDO: {
            return {
                ...state, recibidos: action.recibidos
            }

        }
         
         

            


            
        default: return state;
    }
}