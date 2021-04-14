import { bannerConstants } from './constant';

import initialState from './initial_state';


export function bannerReducer(state = initialState.banners_state, action) {
    switch (action.type) {

        case bannerConstants.OBTENER_BANNERS:
            return {
                ...state, banners: action.banners

            };
        case bannerConstants.CARGAR_CREATE_BANNERS:
            return {
                ...state, init_crear: action.init_crear

            };

        case bannerConstants.CARGAR_EDITAR_BANNER:
            return {
                ...state, init_editar: action.init_editar

            };

        case bannerConstants.MOSTRAR_CREATE_BANNER:
            return {
                ...state, mostrar_crear: action.mostrar_crear

            };
        case bannerConstants.MOSTRAR_EDITAR_BANNER:
            return {
                ...state, mostrar_editar: action.mostrar_editar

            };
        case bannerConstants.CREAR_BANNER:
            return {
                ...state, banner_creado: action.banner_creado

            };
        case bannerConstants.EDITAR_BANNER:
            return {
                ...state, banner_actualizado: action.banner_actualizado

            };
        case bannerConstants.BANNER_SELECCIONADO:
            return {

                ...state, id_banner_seleccionado: action.id_banner_seleccionado
            };

      

        default:
            return state;
    }
}