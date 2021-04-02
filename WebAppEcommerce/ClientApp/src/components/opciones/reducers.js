import { opcionesConstants } from './constant';

import initialState from './initial_state';


export function opcionesReducer(state = initialState.opciones_state, action) {
  switch (action.type) {

      case opcionesConstants.OBTENER_OPCIONES:
          return {
              ...state, opciones: action.opciones
          };

      case opcionesConstants.CARGAR_CREATE_OPCION:
          return {
              ...state, init_crear: action.init_crear

          };
      case opcionesConstants.CARGAR_EDITAR_OPCION:
          return {
              ...state, init_editar: action.init_editar

          };
      case opcionesConstants.MOSTRAR_CREATE_OPCION:
          return {
              ...state, mostrar_crear: action.mostrar_crear

          };
      case opcionesConstants.MOSTRAR_EDITAR_OPCION:
          return {
              ...state, mostrar_editar: action.mostrar_editar

          };
      case opcionesConstants.CREAR_OPCION:
          return {
              ...state, opcion_creada: action.opcion_creada

          };
      case opcionesConstants.EDITAR_CATEGORIA:
          return {
              ...state, opcion_actualizada: action.opcion_actualizada

          };

      case opcionesConstants.OPCION_SELECCIONADA:
          return {
            
              ...state, id_opcion_seleccionada: action.id_opcion_seleccionada
          };

      case opcionesConstants.MOSTRAR_OPCIONES:
          return {

              ...state, mostrar_opciones: action.mostrar_opciones
          };



          
      default:
          return state;
  }
}