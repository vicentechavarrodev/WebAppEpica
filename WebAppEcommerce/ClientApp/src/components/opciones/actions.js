import { opcionesConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const opcionActions = {
   
    obtener_opciones,
    ver_crear,
    crear_opcion,
    cargar_crear,
    cargar_editar,
    ver_editar,
    editar_opcion,
    opcion_seleccionada,
    ver_opciones
    

};

function obtener_opciones() {
    return dispatch => {

        ServicesHelper.obtener_opciones()
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


    function success(opciones) { return { type: opcionesConstants.OBTENER_OPCIONES, opciones }; }
}

function cargar_crear() {
    return dispatch => {

        ServicesHelper.init_crear_opcion()
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


    function success(init_crear) { return { type: opcionesConstants.CARGAR_CREATE_OPCION, init_crear }; }
}


function cargar_editar(id, context) {
    
    return dispatch => {

        ServicesHelper.init_editar_opcion(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {
                      

                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                           
                            var visible = (response.Result.Precio !== 0 ? 'element-show' : 'element-hide');
                            context.setState({ opcion: response.Result, esVisibleOpcion1: visible });
                         

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


    function success(init_editar) { return { type: opcionesConstants.CARGAR_EDITAR_OPCION, init_editar };}
}


function ver_crear(mostrar_crear) {

    return { type: opcionesConstants.MOSTRAR_CREATE_OPCION, mostrar_crear };
   
}

function ver_opciones(mostrar_opciones) {

    return { type: opcionesConstants.MOSTRAR_OPCIONES, mostrar_opciones };

}


function opcion_seleccionada(id_opcion_seleccionada) {

    return { type: opcionesConstants.OPCION_SELECCIONADA, id_opcion_seleccionada };

}


function ver_editar(mostrar_editar) {

    return { type: opcionesConstants.MOSTRAR_EDITAR_OPCION, mostrar_editar };

}


function crear_opcion(opcion, context) {
    return dispatch => {


        ServicesHelper.crear_opcion(opcion)
            .then(
                response => {
                   
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            
                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_opciones();
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

    function success(opcion_creada) { return { type: opcionesConstants.CREAR_OPCION, opcion_creada }; }


}


function editar_opcion(opcion, context) {
    return dispatch => {


        ServicesHelper.editar_opcion(opcion)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_opciones();
                            context.props.ver_editar(false);
                            context.props.opcion_seleccionada(0);


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

    function success(opcion_actualizada) { return { type: opcionesConstants.EDITAR_OPCION, opcion_actualizada }; }


}

