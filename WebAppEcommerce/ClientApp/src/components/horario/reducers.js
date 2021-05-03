import { horarioConstants } from './constant';

import initialState from './initial_state';


export function horarioReducer(state = initialState.horarios_state, action) {
    switch (action.type) {

        case horarioConstants.OBTENER_HORARIOS:
            return {
                ...state, horarios: action.horarios

            };
        case horarioConstants.CARGAR_CREATE_HORARIO:
            return {
                ...state, init_crear: action.init_crear

            };

        case horarioConstants.CARGAR_EDITAR_HORARIO:
            return {
                ...state, init_editar: action.init_editar

            };

        case horarioConstants.MOSTRAR_CREATE_HORARIO:
            return {
                ...state, mostrar_crear: action.mostrar_crear

            };
        case horarioConstants.MOSTRAR_EDITAR_HORARIO:
            return {
                ...state, mostrar_editar: action.mostrar_editar

            };
        case horarioConstants.CREAR_HORARIO:
            return {
                ...state, horario_creado: action.horario_creado

            };
        case horarioConstants.EDITAR_HORARIO:
            return {
                ...state, horario_actualizado: action.horario_actualizado

            };
        case horarioConstants.HORARIO_SELECCIONADO:
            return {

                ...state, id_horario_seleccionado: action.id_horario_seleccionado
            };
        case horarioConstants.HORARIO_RANGO:
            return {
                ...state, horario_rango: action.horario_rango

            };

      

        default:
            return state;
    }
}