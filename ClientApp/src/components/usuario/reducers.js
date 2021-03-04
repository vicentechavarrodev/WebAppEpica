import { usuarioConstants } from './constant';

import initialState from './initial_state';


export function authentication(state = initialState.usuario_state, action) {
  switch (action.type) {
      case usuarioConstants.LOGIN_REQUEST:
          return {
              ...state, user: action.user
            };
      case usuarioConstants.LOGIN_SUCCESS:
          return {
              ...state, user: action.user

          };
      case usuarioConstants.OBTENER_USUARIOS:
          return {
              ...state, usuarios: action.usuarios
           
          };
      case usuarioConstants.CARGAR_CREATE_USER:
          return {
              ...state, init_crear_usuario: action.init_crear_usuario

          };
      case usuarioConstants.CARGAR_EDITAR_USER:
          return {
              ...state, init_editar_usuario: action.init_editar_usuario

          };

      case usuarioConstants.MOSTRAR_CREATE_USER:
          return {
              ...state, mostrar_crear_usuario: action.mostrar_crear_usuario

          };
      case usuarioConstants.MOSTRAR_EDITAR_USER:
          return {
              ...state, mostrar_editar_usuario: action.mostrar_editar_usuario

          };
      case usuarioConstants.CREAR_USUARIO:
          return {
              ...state, usuario_creado: action.usuario_creado

          };
      case usuarioConstants.USUARIO_SELECCIONADO:
          return {
              ...state, id_usuario_seleccionado: action.id_usuario_seleccionado

          };

      case usuarioConstants.EDITAR_USUARIO:
          return {
            
              ...state, usuario_actualizado: action.usuario_actualizado
          };
      case usuarioConstants.LOGIN_FAILURE:
          return {};
      case usuarioConstants.LOGOUT:
          return {};
     
      default:
          return state;
  }
}