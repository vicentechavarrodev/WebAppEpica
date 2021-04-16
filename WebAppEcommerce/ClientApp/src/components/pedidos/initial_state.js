const pedidos_initial_state = {
  
    pedidos_state: {
        pedidos: [],
        mostrar_detalle: false,
        pedido: { PedidoDetalles:[]},
        id_pedido_seleccionado: 0,
        estado_cambiado: {},
        pedido_enviado:false
       
    }
}

export default pedidos_initial_state;