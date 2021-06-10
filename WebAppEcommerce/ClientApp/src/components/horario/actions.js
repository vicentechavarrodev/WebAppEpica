import { horarioConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const horarioActions = {

    obtener_horarios,
    ver_crear,
    crear_horario,
    cargar_crear,
    cargar_editar,
    ver_editar,
    editar_horario,
    horario_seleccionado,
    eliminar_horario,
    ver_rango
    


};

function obtener_horarios() {

    return async  dispatch => {

        await ServicesHelper.obtener_horarios().then(
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


    function success(horarios) {
        return {
            type: horarioConstants.OBTENER_HORARIOS,
            horarios
        };
    }
}

function horario_seleccionado(id_horario_seleccionado) {

    return { type: horarioConstants.HORARIO_SELECCIONADO, id_horario_seleccionado };

}

function cargar_crear() {
    return dispatch => {

        ServicesHelper.init_crear_horario()
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


    function success(init_crear) { return { type: horarioConstants.CARGAR_CREATE_HORARIO, init_crear }; }
}


function cargar_editar(id, context) {
    return async dispatch => {

        await ServicesHelper.init_editar_horario(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ horario: response.Result });

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


    function success(init_editar) { return { type: horarioConstants.CARGAR_EDITAR_HORARIO, init_editar }; }
}


function ver_crear(mostrar_crear) {

    return { type: horarioConstants.MOSTRAR_CREATE_HORARIO, mostrar_crear };

}
function ver_rango(horario_rango) {

    return { type: horarioConstants.HORARIO_RANGO, horario_rango };

}



function ver_editar(mostrar_editar) {

    return { type: horarioConstants.MOSTRAR_EDITAR_HORARIO, mostrar_editar };

}


function crear_horario(horario, context) {
    return dispatch => {


        ServicesHelper.crear_horario(horario)

            .then(
                response => {
                   
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_horarios();
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

    function success(horario_creado) { return { type: horarioConstants.CREAR_HORARIO, horario_creado }; }


}


function editar_horario(horario, context) {
    return dispatch => {


        ServicesHelper.editar_horario(horario)
            .then(
                response => {
                   if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_horarios();
                            context.props.ver_editar(false);
                            context.props.horario_seleccionado(0);
                                                  


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

    function success(horario_actualizado) { return { type: horarioConstants.EDITAR_HORARIO, horario_actualizado }; }
}
    function eliminar_horario(id, context) {
        return dispatch => {


            ServicesHelper.eliminar_horario(id)
                .then(
                    response => {

                        if (response.IsSuccess) {
                            loader.hide();
                            if (response.Result !== null) {

                                dispatch(success(true));
                                dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                                context.props.obtener_horarios();


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


    function success(horario_eliminado) { return { type: horarioConstants.ELIMINAR_HORARIO, horario_eliminado }; }


}

