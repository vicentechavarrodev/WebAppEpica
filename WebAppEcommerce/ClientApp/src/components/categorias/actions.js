import { categoriaConstants } from './constant';
import { ServicesHelper } from './services';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';



export const categoriaActions = {
   
    obtener_categorias,
    ver_crear,
    crear_categoria,
    cargar_editar,
    ver_editar,
    editar_categoria,
    categoria_seleccionada
    

};

 function obtener_categorias() {
    
    return async  dispatch => {

        await   ServicesHelper.obtener_categorias().then(
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


    function success(categorias) {
        return {
            type: categoriaConstants.OBTENER_CATEGORIAS,
            categorias
        };
    }
}


function cargar_editar(id,context) {
    return dispatch => {

        ServicesHelper.init_editar_categoria(id)
            .then(
                response => {
                    loader.hide();

                    if (response.IsSuccess) {


                        if (response.Result !== null) {
                            dispatch(success(response.Result));
                            context.setState({ categoria: response.Result });

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


    function success(init_editar) { return { type: categoriaConstants.CARGAR_EDITAR_CATEGORIA, init_editar };}
}


function ver_crear(mostrar_crear) {

    return { type: categoriaConstants.MOSTRAR_CREATE_CATEGORIA, mostrar_crear };
   
}


function categoria_seleccionada(id_categoria_seleccionada) {

    return { type: categoriaConstants.CATEGORIA_SELECCIONADA, id_categoria_seleccionada };

}


function ver_editar(mostrar_editar) {

    return { type: categoriaConstants.MOSTRAR_EDITAR_CATEGORIA, mostrar_editar };

}


function crear_categoria(categoria, context) {
    return dispatch => {


        ServicesHelper.crear_categoria(categoria)
            .then(
                response => {
                    console.log(response);
                    if (response.IsSuccess) {

                        if (response.Result !== null) {
                            
                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_categorias();
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

    function success(categoria_creada) { return { type: categoriaConstants.CREAR_CATEGORIA, categoria_creada }; }


}


function editar_categoria(categoria, context) {
    return dispatch => {


        ServicesHelper.editar_categoria(categoria)
            .then(
                response => {

                    if (response.IsSuccess) {

                        if (response.Result !== null) {

                            dispatch(success(true));
                            dispatch(alertActions.showMessage(response.Message, true, 'Hecho'));
                            context.props.obtener_categorias();
                            context.props.ver_editar(false);
                            context.props.categoria_seleccionada(0);


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

    function success(categoria_actualizada) { return { type: categoriaConstants.EDITAR_CATEGORIA, categoria_actualizada }; }


}

