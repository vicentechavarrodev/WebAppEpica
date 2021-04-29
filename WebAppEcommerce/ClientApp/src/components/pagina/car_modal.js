import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import { pedidosActions } from '../pedidos/actions';


class Car_modal extends Component {

    constructor(props) {
        super(props);
        this.CloseCar = this.CloseCar.bind(this);
        this.Enviar = this.Enviar.bind(this);
        this.InputChange = this.InputChange.bind(this);
        this.state = {
            pedido: {
                IdPedido: 0,
                Solicitante: localStorage.getItem('Solicitante') !== null ? localStorage.getItem('Solicitante'): "",
                Direccion: localStorage.getItem('Direccion') !== null ? localStorage.getItem('Direccion') : "",
                Telefono: localStorage.getItem('Telefono') !== null ? localStorage.getItem('Telefono') : "",
                Comentario: localStorage.getItem('Comentario') !== null ? localStorage.getItem('Comentario') : "",
                TotalPedido: (this.props.total_domicilio + this.props.total_pedido),
                PedidoDetalles: this.props.productos_pedido
            }
        };


    }

   async componentDidMount() {

           
              
    }

    CloseCar() {
        const btn = document.getElementById('btn-car');
        btn.style.display = 'inline';
        this.props.ver_car(false);
    }

    async Enviar(e) {
        const {
            pedido
        } = this.state;
        if (!this.props.productos_pedido.length ===0 ) {
            this.props.showMessage('Debes agregar al menos un producto.', true, 'Información');
            return;
        } else if (!pedido.Solicitante) {
            this.props.showMessage('Debes ingresar un nombre.', true, 'Información');
            return;
        } else if (!pedido.Direccion) {
            this.props.showMessage('Debes ingresar una dirección.', true, 'Información');
            return;
        } else if (pedido.Telefono === 0) {
            this.props.showMessage('Debes seleccionar un teléfono.', true, 'Información');
            return;
        }
        


        await this.props.enviar_pedido(pedido,this);
       


    }


    InputChange(e) {

        const { name, value } = e.target;
        const { pedido } = this.state;
        this.setState({
            pedido: {
                ...pedido,
                [name]: value
            }
        });

        localStorage.setItem(name, value);
    }

    EliminarPedido(e) {
      
        let pedidos = this.props.productos_pedido.filter(item => e.target.value + item.Descripcion !== e.target.value + e.target.name)


        console.log(e.target.value)

        let cantidad=0, subtotal = 0;

        if (pedidos.length > 0) {

            for (var i = 0; i < pedidos.length; i++) {
                var item = pedidos[i];
                cantidad = cantidad + item.Cantidad;
                subtotal = subtotal + item.Subtotal;
            }

        }

        const { pedido } = this.state;
        this.setState({
            pedido: {
                ...pedido,
                TotalPedido: (this.props.total_domicilio + subtotal),
                PedidoDetalles: pedidos
            }
        });

        this.props.asignar_total_pedido(subtotal);
        this.props.asignar_cantidad_pedido(cantidad);
        this.props.limpiar_pedidos(pedidos)

    }


    render() {

        const { pedido } = this.state;

        return (

            <section id="cart-background">
                <div className="font" onClick={this.CloseCar} >
                </div>
                <div id="cart-fixed">
                  
                    <div className="tittle-car">
                        <h2>Tu pedido</h2>
                    </div>
                    <div class="container content-pedido">
                        {
                             this.props.productos_pedido.map((item,index) =>{
                                 return <div class="row" id={index} key={index}>
                                        <div class="col-1 col-amount-pedido">
                                            {item.Cantidad }
                                        </div>
                                       <div class="col-8 col-description-pedido">
                                            {item.Descripcion}
                                        </div>
                                      <div class="col-2 col-price-pedido">
                                            {item.Subtotal}
                                     </div>
                                     <div class="col-1 p-1 mb-3 ">
                                         <a className="btn btn-delete" onClick={(e) => { this.EliminarPedido({ target: { name: item.Descripcion, value: item.Cantidad } }); }} >
                                             <i className="fa fa-trash"></i>
                                         </a>
                                     </div>
                                 </div>
                            })
                        }
                       
                     
                     </div>
                    <div className="container content-pedido-static">
                        <div className="date-person">
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" name="Solicitante" value={pedido.Solicitante} id="Solicitante" onChange={this.InputChange} placeholder="Ingresa tu nombre" />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" name="Direccion" value={pedido.Direccion} id="Dirección" onChange={this.InputChange} placeholder="Digita tu dirección" />
                        </div>
                        <div className="mb-2">
                            <input type="number" className="form-control" name="Telefono" value={pedido.Telefono} id="Telefono" onChange={this.InputChange} placeholder="Telefono de contacto" />
                        </div>
                        <div className="mb-2">
                            <textarea type="text-area" rows="1" className="form-control" name="Comentario" value={pedido.Comentario} id="Comentario" onChange={this.InputChange} placeholder="Anexa un comentario" />
                        </div>
                        <div className="date-total">
                        </div>
                       <div class="row">
                            <div class="col-6 col-car-pedido">Subtotal</div>
                            <div class="col-6 col-car-pedido">$ {this.props.total_pedido}</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-6 col-car-pedido">Domicilio</div>
                            <div class="col-6 col-car-pedido">$ {this.props.total_domicilio}</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-6 col-car-pedido">TOTAL</div>
                            <div class="col-6 col-car-pedido">$ {(this.props.total_pedido + this.props.total_domicilio)}</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col col-btn-pedido"><button type="button" onClick={this.Enviar} class="btn btn-pedido">Hacer pedido</button></div>
                            
                        </div>
                    </div>
                   

                </div>
                <button type="button" className="btn btn-link" onClick={this.CloseCar}>
                    <i className="fa fa-cart-plus"></i>
                </button>
                <button type="button" className="btn button-movil" onClick={this.CloseCar}>
                    <i className="fa fa-times"></i>
                </button>
              
            </section> 

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    const { opciones_producto, id_producto_seleccionado, productos_pedido, total_pedido, total_domicilio, cantidad_pedidos } = state.productoReducer;
    return { loggingIn, user, categorias, opciones_producto, id_producto_seleccionado, productos_pedido, total_pedido, total_domicilio, cantidad_pedidos };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_car: productoActions.ver_car,
    asignar_cantidad_pedido: productoActions.asignar_cantidad_pedido,
    asignar_total_pedido: productoActions.asignar_total_pedido,
    limpiar_pedidos: productoActions.limpiar_pedidos,
    enviar_pedido: pedidosActions.enviar_pedido, 

};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Car_modal));