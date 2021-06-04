﻿import { usuarioConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { formatDate } from '../helpers/date_helper';


export const usuarioActions = {
    login,
    logout,
    obtener_usuarios,
    ver_crear_usuario,
    cargar_crear_usuario,
    crear_usuario,
    cargar_editar_usuario,
    ver_editar_usuario,
    editar_usuario,
    usuario_seleccionado
    

};

function obtener_usuarios() {
    return dispatch => {

        ServicesHelper.obtener_usuarios()
            .then(
                response => {
                    loader.hide();
                    if (response.IsSuccess) {
                        if (response.result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage(usuarioConstants.OBTENER_USUARIOS +': ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(usuarioConstants.OBTENER_USUARIOS + ': ' + response.Message, true, 'Ups'));
                    }
                },
            error => {
                dispatch(alertActions.showMessage(usuarioConstants.OBTENER_USUARIOS + ': ' + error.toString(), true, 'Ups'));
                }
            );
    };


    function success(usuarios) { return { type: usuarioConstants.OBTENER_USUARIOS, usuarios };}
}


function cargar_crear_usuario() {
    return dispatch => {

        ServicesHelper.init_crear_usuario()
            .then(
                response => {
                    loader.hide();
                   
                    if (response.IsSuccess) {
                        

                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                        } else {
                            dispatch(alertActions.showMessage(usuarioConstants.CARGAR_CREATE_USER + ': ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(usuarioConstants.CARGAR_CREATE_USER + ': ' + response.Message, true, 'Ups'));
                    }
                },
                error => {
                  
                    dispatch(alertActions.showMessage(usuarioConstants.CARGAR_CREATE_USER + ': ' + error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_crear_usuario) { return { type: usuarioConstants.CARGAR_CREATE_USER, init_crear_usuario };}
}

function cargar_editar_usuario(id,context) {
    return dispatch => {

        ServicesHelper.init_editar_usuario(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {


                            var fechaRegistro = new Date(parseInt(response.Result.FechaRegistro.substr(6)));
                            response.Result.FechaRegistro = formatDate(fechaRegistro);

                            dispatch(success(response.Result));
                            context.setState({ usuario: response.Result });

                        } else {
                            dispatch(alertActions.showMessage(usuarioConstants.CARGAR_EDITAR_USER + ': ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(usuarioConstants.CARGAR_EDITAR_USER + ': ' + response.Message, true, 'Ups'));
                    }
                },
                error => {

                    dispatch(alertActions.showMessage(usuarioConstants.CARGAR_EDITAR_USER + ': ' + error.toString(), true, 'Ups'));
                }
            );
    };


    function success(init_editar_usuario) { return { type: usuarioConstants.CARGAR_EDITAR_USER, init_editar_usuario };}
}


function ver_crear_usuario(mostrar_crear_usuario) {

    return { type: usuarioConstants.MOSTRAR_CREATE_USER, mostrar_crear_usuario };
   
}

function usuario_seleccionado(id_usuario_seleccionado) {

    return { type: usuarioConstants.USUARIO_SELECCIONADO, id_usuario_seleccionado };

}

function ver_editar_usuario(mostrar_editar_usuario) {

    return { type: usuarioConstants.MOSTRAR_EDITAR_USER, mostrar_editar_usuario };

}


function crear_usuario(usuario, context) {
    return dispatch => {


        ServicesHelper.crear_usuario(usuario)
            .then(
                response => {
                    console.log(response);
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            
                            dispatch(success(true));
                            dispatch(alertActions.showMessage( response.Message, true, 'Hecho'));
                            context.props.obtener_usuarios();
                            context.props.ver_crear_usuario(false);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(usuarioConstants.CREAR_USUARIO + ': ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage(usuarioConstants.CREAR_USUARIO + ': ' + response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage(usuarioConstants.CREAR_USUARIO + ': ' + error.toString(), true, 'Ups'));
                }
            );
    };

    function success(usuario_creado) { return { type: usuarioConstants.CREAR_USUARIO, usuario_creado }; }


}


function editar_usuario(usuario, context) {
    return dispatch => {


        ServicesHelper.editar_usuario(usuario)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_usuarios();
                            context.props.ver_editar_usuario(false);
                            context.props.usuario_seleccionado(0);


                        } else {
                            loader.hide();
                            dispatch(success(false));
                            dispatch(alertActions.showMessage(usuarioConstants.EDITAR_USUARIO + ' : ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(success(false));
                        dispatch(alertActions.showMessage(usuarioConstants.EDITAR_USUARIO + ': ' + response.message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(success(false));
                    dispatch(alertActions.showMessage(usuarioConstants.EDITAR_USUARIO + ': ' + error.toString(), true, 'Ups'));
                }
            );
    };

    function success(usuario_actualizado) { return { type: usuarioConstants.EDITAR_USUARIO, usuario_actualizado }; }


}


function login(codigo, contrasena, history) {
    return dispatch => {

        ServicesHelper.login(codigo, contrasena)
            .then(
                response => {
                  
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                           
                            dispatch(success(response.Result));
                            history.push('/pizza-neiva-domicilio');

                        } else {
                            loader.hide();
                            dispatch(alertActions.showMessage(usuarioConstants.LOGIN_SUCCESS + ': ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        loader.hide();
                        dispatch(alertActions.showMessage(usuarioConstants.LOGIN_SUCCESS + ': ' + response.Message, true, 'Ups'));
                    }
                },
                error => {
                    loader.hide();
                    dispatch(alertActions.showMessage(usuarioConstants.LOGIN_SUCCESS + ': ' + error.toString(), true, 'Ups'));
                }
            );
    };

    function success(user) { return { type: usuarioConstants.LOGIN_SUCCESS, user }; }


}


function logout(history) {
    return dispatch => {
        localStorage.removeItem('usuario');
        history.push('/pizza-neiva-domicilio');
        success();
    };


    function success() { return { type: usuarioConstants.LOGOUT }; }
}