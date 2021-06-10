import { cardConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const cardActions = {
   
    obtener_cards,
    ver_crear,
    crear_card,
    cargar_editar,
    ver_editar,
    editar_card,
    eliminar_card,
    card_seleccionada
    

};

 function obtener_cards() {
    
    return async  dispatch => {

        await   ServicesHelper.obtener_cards().then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.Result !== null) {
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


    function success(cards) {
        return {
            type: cardConstants.OBTENER_CARDS,
            cards
        };
    }
}


function cargar_editar(id,context) {
    return dispatch => {

        ServicesHelper.init_editar_card(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ card: response.Result });

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


    function success(init_editar) { return { type: cardConstants.CARGAR_EDITAR_CARD, init_editar };}
}


function ver_crear(mostrar_crear) {

    return { type: cardConstants.MOSTRAR_CREATE_CARD, mostrar_crear };
   
}


function card_seleccionada(id_card_seleccionada) {

    return { type: cardConstants.CARD_SELECCIONADA, id_card_seleccionada };

}


function ver_editar(mostrar_editar) {

    return { type: cardConstants.MOSTRAR_EDITAR_CARD, mostrar_editar };

}


function crear_card(card, context) {
    return dispatch => {


        ServicesHelper.crear_card(card)
            .then(
                response => {
                   
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            
                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cards();
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

    function success(card_creada) { return { type: cardConstants.CREAR_CARD, card_creada }; }


}


function editar_card(card, context) {
    return dispatch => {


        ServicesHelper.editar_card(card)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cards();
                            context.props.ver_editar(false);
                            context.props.card_seleccionada(0);


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

    function success(card_actualizada) { return { type: cardConstants.EDITAR_CARD, card_actualizada }; }


}
function eliminar_card(id, context) {
    return dispatch => {


        ServicesHelper.eliminar_card(id)
            .then(
                response => {

                    if (response.IsSuccess) {
                        loader.hide();
                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_cards();


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
    function success(card_eliminada) { return { type: cardConstants.ELIMINAR_CARD, card_eliminada }; }


}
