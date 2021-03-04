import { principalConstants } from './constant';
const initialState =  { esPrincipal: true} ;

export function ventanaPrincipalReducer(state = initialState, action) {
    switch (action.type) {
        case principalConstants.ES_PAGINA_PRINCIPAL:
            return {
                esPrincipal: action.payload
            };

        default:
            return state
    }
}
