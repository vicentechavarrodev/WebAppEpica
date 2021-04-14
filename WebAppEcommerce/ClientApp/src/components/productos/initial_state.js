
const producto_initial_state = {

    producto_state: {
        productos: [],
        opciones_producto: { VistaProductoOpciones: [], VistaProductoOpcionesGroup:[] },
        opciones_seleccion: [],
        init_crear: { Categorias:  []},
        init_editar: { Categorias: [] },
        mostrar_crear: false,
        mostrar_car:false,
        mostrar_editar: false,
        mostrar_seleccion_opcion: false,
        producto_creado: false,
        producto_actualizada: false,
        producto_opciones_creados: false,
        id_producto_seleccionado: 0,
        id_opcion_producto_seleccionado: 0,
        opcion_producto_eliminada: false,
        tipo_opcion_producto_eliminada:false,
        productos_categoria: [],
        tipos_opciones_producto: [],
        mostrar_agregar_tipo_opcion: false,
        producto_tipo_opcion_creada: false,
        productos_tipo_opciones_agregadas: [],
        init_editar_producto_tipo_op: { TipoOpciones: [] },
        mostrar_editar_tipo_opcion: false,
        tipo_opcion_producto_actualizada:false,
        opcion_secundaria_creada: false,
        opcion_secundaria: { ProductoTipoOpciones: [] },
        mostrar_crear_opcion_secundaria: false,
        tipos_seleccion: [],
        productos_pedido:[]


    }
};

export default producto_initial_state;