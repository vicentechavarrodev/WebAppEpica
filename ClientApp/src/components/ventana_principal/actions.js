
import { principalConstants } from './constant';

export const VentanaPrincipalActions = {
    es_paginaprincipal
   
};

function es_paginaprincipal  (esPrincipal) {
    return {
        type: principalConstants.ES_PAGINA_PRINCIPAL,
        payload: esPrincipal
    }
}



