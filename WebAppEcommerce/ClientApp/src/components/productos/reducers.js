import { productoConstants } from './constant';

import initialState from './initial_state';


export function productoReducer(state = initialState.producto_state, action) {
  switch (action.type) {

      case productoConstants.OBTENER_PRODUCTOS:
          return {
              ...state, productos: action.productos
          };
      case productoConstants.OBTENER_TIPO_OPCIONES_AGREGADAS:
          return {
              ...state, productos_tipo_opciones_agregadas: action.productos_tipo_opciones_agregadas
          };
      case productoConstants.OBTENER_OPCIONES_PRODUCTO:
          return {
              ...state, opciones_producto: action.opciones_producto
          };

      case productoConstants.OBTENER_OPCIONES_SELECCION:
          return {
              ...state, opciones_seleccion: action.opciones_seleccion
          };


      case productoConstants.CARGAR_CREATE_PRODUCTO:
          return {
              ...state, init_crear: action.init_crear

          };
      case productoConstants.CARGAR_EDITAR_PRODUCTO:
          return {
              ...state, init_editar: action.init_editar

          };
      case productoConstants.MOSTRAR_CREATE_PRODUCTO:
          return {
              ...state, mostrar_crear: action.mostrar_crear

          };
      case productoConstants.MOSTRAR_SELECCION_OPCION:
          return {
              ...state, mostrar_seleccion_opcion: action.mostrar_seleccion_opcion

          };
          
      case productoConstants.MOSTRAR_EDITAR_PRODUCTO:
          return {
              ...state, mostrar_editar: action.mostrar_editar

          };
      case productoConstants.CREAR_PRODUCTO:
          return {
              ...state, producto_creado: action.producto_creado

          };
      case productoConstants.EDITAR_PRODUCTO:
          return {
              ...state, producto_actualizado: action.producto_actualizado

          };

      case productoConstants.PRODUCTO_SELECCIONADO:
          return {
            
              ...state, id_producto_seleccionado: action.id_producto_seleccionado
          };
      case productoConstants.OPCION_PRODUCTO_SELECCIONADA:
          return {

              ...state, id_opcion_producto_seleccionado: action.id_opcion_producto_seleccionado
          };
      case productoConstants.CREAR_OPCIONES_PRODUCTO:
          return {

              ...state, producto_opciones_creados: action.producto_opciones_creados
          };

      case productoConstants.ELIMINAR_OPCION_PRODUCTO:
          return {

              ...state, opcion_producto_eliminada: action.opcion_producto_eliminada
          };

      case productoConstants.ELIMINAR_TIPO_OPCION_PRODUCTO:
          return {

              ...state, tipo_opcion_producto_eliminada: action.tipo_opcion_producto_eliminada
          };

      case productoConstants.PRODUCTOS_POR_CATEGORIA:
          return {

              ...state, productos_categoria: action.productos_categoria
          };


      case productoConstants.OBTENER_TIPO_OPCIONES_PRODUCTO:
          return {

              ...state, tipos_opciones_producto: action.tipos_opciones_producto
          };
      case productoConstants.MOSTRAR_CREAR_TIPO_OPCION:
          return {

              ...state, mostrar_agregar_tipo_opcion: action.mostrar_agregar_tipo_opcion
          };
      case productoConstants.PRODUCTO_TIPO_OPCION_CREADA:
          return {

              ...state, producto_tipo_opcion_creada: action.producto_tipo_opcion_creada
          };

      case productoConstants.CARGAR__EDITAR_TIPO_OPCION_PRODUCTO:
          return {

              ...state, init_editar_producto_tipo_op: action.init_editar_producto_tipo_op
          };

      case productoConstants.MOSTRAR_EDITAR_TIPO_OPCION_PRODUCTO:
          return {

              ...state, mostrar_editar_tipo_opcion: action.mostrar_editar_tipo_opcion
          };
      case productoConstants.EDITAR_TIPO_OPCION_PRODUCTO:
          return {

              ...state, tipo_opcion_producto_actualizada: action.tipo_opcion_producto_actualizada
          };


      case productoConstants.OPCION_SECUNDARIA_CREADA:
          return {

              ...state, opcion_secundaria_creada: action.opcion_secundaria_creada
          };


      case productoConstants.CARGAR_TIPO_OPCION_SECUNDARIA:
          return {

              ...state, opcion_secundaria: action.opcion_secundaria
          };

      case productoConstants.MOSTRAR_CREAR_TIPO_OPCION_SECUNDARIA:
          return {

              ...state, mostrar_crear_opcion_secundaria: action.mostrar_crear_opcion_secundaria
          };
      case productoConstants.OBTENER_TIPO_SELECCIONES:
          return {

              ...state, tipos_seleccion: action.tipos_seleccion
          };
      case productoConstants.AGREGAR_PRODUCTO_PEDIDO:
          return {
              ...state,
              productos_pedido: state.productos_pedido.concat(action.productos_pedido)
           
          };


          
      default:
          return state;
  }
}