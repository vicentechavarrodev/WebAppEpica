
const usuarios_initial_state = {

    usuario_state: {
        loggedIn: true,
        user: localStorage.getItem('usuario') !== null?  JSON.parse(localStorage.getItem('usuario')) : {},
        usuarios: [],
        init_crear_usuario: { Roles: [] },
        init_editar_usuario: { Roles: [] },
        mostrar_crear_usuario: false,
        mostrar_editar_usuario: false,
        usuario_creado: false,
        usuario_actualizado: false,
        id_usuario_seleccionado: 0
    }
};

export default usuarios_initial_state;