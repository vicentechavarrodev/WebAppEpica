import { bannerConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const bannerActions = {

    obtener_banners,
    ver_crear,
    crear_banner,
    cargar_crear,
    cargar_editar,
    ver_editar,
    editar_banner,
    banner_seleccionado
    


};

function obtener_banners() {

    return async  dispatch => {

        await ServicesHelper.obtener_banners().then(
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


    function success(banners) {
        return {
            type: bannerConstants.OBTENER_BANNERS,
            banners
        };
    }
}

function banner_seleccionado(id_banner_seleccionado) {

    return { type: bannerConstants.BANNER_SELECCIONADO, id_banner_seleccionado };

}

function cargar_crear() {
    return dispatch => {

        ServicesHelper.init_crear_banner()
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


    function success(init_crear) { return { type: bannerConstants.CARGAR_CREATE_BANNER, init_crear }; }
}


function cargar_editar(id, context) {
    return async dispatch => {

        await ServicesHelper.init_editar_banner(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ banner: response.Result });

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


    function success(init_editar) { return { type: bannerConstants.CARGAR_EDITAR_BANNER, init_editar }; }
}


function ver_crear(mostrar_crear) {

    return { type: bannerConstants.MOSTRAR_CREATE_BANNER, mostrar_crear };

}



function ver_editar(mostrar_editar) {

    return { type: bannerConstants.MOSTRAR_EDITAR_BANNER, mostrar_editar };

}


function crear_banner(banner, context) {
    return dispatch => {


        ServicesHelper.crear_banner(banner)
            .then(
                response => {
                    console.log(response);
                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_banners();
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

    function success(banner_creado) { return { type: bannerConstants.CREAR_BANNER, banner_creado }; }


}


function editar_banner(banner,id, context) {
    return dispatch => {


        ServicesHelper.editar_banner(banner,id)
            .then(
                response => {
                   if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_banners();
                            context.props.ver_editar(false);
                            context.props.banner_seleccionado(0);
                           


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

    function success(banner_actualizado) { return { type: bannerConstants.EDITAR_BANNER, banner_actualizado }; }


}

