
const producto_initial_state = {

    producto_state: {
        productos: [],
        opciones_producto: [],
        init_crear: { Categorias:  []},
        init_editar: { Categorias: [] },
        mostrar_crear: false,
        mostrar_editar: false,
        producto_creado: false,
        producto_actualizada: false,
        id_producto_seleccionado: 0,
        id_opcion_producto_seleccionado:0

    }
};

export default producto_initial_state;