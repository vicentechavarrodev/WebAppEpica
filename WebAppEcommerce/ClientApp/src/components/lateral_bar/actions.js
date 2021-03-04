
import { LateralBarConstants } from './constant';
import { ServicesHelper } from './services';
import { alertActions } from '../alerts_message/actions';
import { loader } from '../helpers/loader';

export const LateralBarActions = {
    lateral_bar_visible,
    obtener_formularios
};

function obtener_formularios(codigoUsuario, esPrincipal) {
    return dispatch => {

        ServicesHelper.getFormularios(codigoUsuario, esPrincipal)
            .then(
                response => {
                    loader.hide();
                   
                    let formularios;
                    if (response.IsSuccess) {
                        formularios = response.Result;
                      

                        if (formularios !== null) {
                            dispatch(success(formularios));
                        } else {
                            dispatch(alertActions.showMessage(LateralBarConstants.GET_FORMULARIOS + ': ' + response.Message, true, 'Ups'));
                        }


                    } else {
                        dispatch(alertActions.showMessage(LateralBarConstants.GET_FORMULARIOS + ': ' + response.Message, true, 'Ups'));
                    }
                },
            error => {
              
                dispatch(alertActions.showMessage(LateralBarConstants.GET_FORMULARIOS + ': ' +error.toString(), true, 'Ups'));
            }
            );
    };


    function success(formularios) { return { type: LateralBarConstants.GET_FORMULARIOS, formularios } }
}

function lateral_bar_visible(menuLateralVisible) {

    return { type: LateralBarConstants.LATERAL_BAR_ACTIVE, menuLateralVisible };
}
















