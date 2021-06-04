import { cardConstants } from './constant';

import initialState from './initial_state';


export function cardReducer(state = initialState.cards_state, action) {
  switch (action.type) {

      case cardConstants.OBTENER_CARDS:
          return {
              ...state, cards: action.cards
           
          };

      case cardConstants.CARGAR_EDITAR_CARD:
          return {
              ...state, init_editar: action.init_editar

          };
      case cardConstants.ELIMINAR_CARD:
          return {

              ...state, card_eliminada: action.card_eliminada
          };

      case cardConstants.MOSTRAR_CREATE_CARD:
          return {
              ...state, mostrar_crear: action.mostrar_crear

          };
      case cardConstants.MOSTRAR_EDITAR_CARD:
          return {
              ...state, mostrar_editar: action.mostrar_editar

          };
      case cardConstants.CREAR_CARD:
          return {
              ...state, card_creada: action.card_creada

          };
      case cardConstants.EDITAR_CARD:
          return {
              ...state, card_actualizada: action.card_actualizada

          };

      case cardConstants.CARD_SELECCIONADA:
          return {
            
              ...state, id_card_seleccionada: action.id_card_seleccionada
          };
     
      default:
          return state;
  }
}