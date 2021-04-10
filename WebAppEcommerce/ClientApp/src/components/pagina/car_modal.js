import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';


class Car_modal extends Component {

    constructor(props) {
        super(props);
        this.closeCar = this.closeCar.bind(this);
    }

   async componentDidMount() {

           
              
    }
    closeCar() {
        const btn = document.getElementById('btn-car');
        btn.style.display = 'inline';
        this.props.ver_crear(false);
    }


    render() {
          
    

        return (

            <section id="cart-background">
                <div className="font" onClick={this.closeCar} >
                </div>
                <div id="cart-fixed">
                  
                    <div className="tittle-car">
                        <h2>Tu pedido</h2>
                    </div>
                    <div class="container content-pedido">
                        <div class="row">
                            <div class="col-1 col-amount-pedido">
                                1
                            </div>
                            <div class="col-8 col-description-pedido">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </div>
                            <div class="col col-price-pedido">
                                $10.000
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-1 col-amount-pedido">
                                2
                            </div>
                            <div class="col-8 col-description-pedido">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </div>
                            <div class="col col-price-pedido">
                                $20.000
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-1 col-amount-pedido">
                                1
                            </div>
                            <div class="col-8 col-description-pedido">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </div>
                            <div class="col col-price-pedido">
                                $10.000
                            </div>
                        </div>
                     </div>
                    <div className="container content-pedido-static">
                        <div className="date-person">
                        </div>
                            <div className="mb-2">
                                <input type="text" className="form-control" id="Solicitante" placeholder="Ingresa tu nombre"/>
                        </div>
                            <div className="mb-2">
                                <input type="text" className="form-control" id="Direccion" placeholder="Digita tu direccion" />
                        </div>
                            <div className="mb-2">
                                <input type="text" className="form-control" id="Telefono" placeholder="Telefono de contacto" />
                        </div>
                        <div className="date-total">
                        </div>
                       <div class="row">
                            <div class="col-6 col-car-pedido">Subtotal</div>
                            <div class="col-6 col-car-pedido">$12.000</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-6 col-car-pedido">Domicilio</div>
                            <div class="col-6 col-car-pedido">$12.000</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-6 col-car-pedido">TOTAL</div>
                            <div class="col-6 col-car-pedido">$24.000</div>

                            <div class="w-100 d-none d-md-block"></div>

                            <div class="col col-btn-pedido"><button type="button" class="btn btn-pedido">Hacer pedido</button></div>
                            
                        </div>
                    </div>
                   

                </div>
                <button type="button" className="btn btn-link" onClick={this.closeCar}>
                    <i className="fa fa-cart-plus"></i>
                </button>
                <button type="button" className="btn button-movil" onClick={this.closeCar}>
                    <i className="fa fa-times"></i>
                </button>
              
            </section> 
           
           

                          



        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    const { opciones_producto, id_producto_seleccionado } = state.productoReducer;
    return { loggingIn, user, categorias, opciones_producto, id_producto_seleccionado};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_crear: productoActions.ver_crear,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Car_modal));