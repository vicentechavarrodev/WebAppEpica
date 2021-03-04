import { categoriaConstants } from './constant';

import initialState from './initial_state';


export function categoriaReducer(state = initialState.categorias_state, action) {
  switch (action.type) {

      case categoriaConstants.OBTENER_CATEGORIAS:
          return {
              ...state, categorias: action.categorias
           
          };

      case categoriaConstants.CARGAR_EDITAR_CATEGORIA:
          return {
              ...state, init_editar: action.init_editar

          };

      case categoriaConstants.MOSTRAR_CREATE_CATEGORIA:
          return {
              ...state, mostrar_crear: action.mostrar_crear

          };
      case categoriaConstants.MOSTRAR_EDITAR_CATEGORIA:
          return {
              ...state, mostrar_editar: action.mostrar_editar

          };
      case categoriaConstants.CREAR_CATEGORIA:
          return {
              ...state, categoria_creada: action.categoria_creada

          };
      case categoriaConstants.EDITAR_CATEGORIA:
          return {
              ...state, categoria_actualizada: action.categoria_actualizada

          };

      case categoriaConstants.CATEGORIA_SELECCIONADA:
          return {
            
              ...state, id_categoria_seleccionada: action.id_categoria_seleccionada
          };
     
      default:
          return state;
  }
}