
const producto_initial_state = {

    producto_state: {
        productos: [],
        opciones_producto: [],
        opciones_seleccion: [],
        init_crear: { Categorias:  []},
        init_editar: { Categorias: [] },
        mostrar_crear: false,
        mostrar_editar: false,
        mostrar_seleccion_opcion: false,
        producto_creado: false,
        producto_actualizada: false,
        producto_opciones_creados: false,
        id_producto_seleccionado: 0,
        id_opcion_producto_seleccionado: 0,
        opcion_producto_eliminada:false

    }
};

export default producto_initial_state;