import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import imageHeader2 from '../../imagenes/pagina/header2.jpg';
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import { Modal} from 'react-bootstrap';


class ProductoModal extends Component {

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
                <div id="cart-fixed">
                  
                    <div className="tittle-car">
                        <h2>Tu pedido</h2>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-car-pedido">Subtotal</div>
                            <div class="col-12 col-sm-6 col-car-pedido">$12.000</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-12 col-sm-6 col-car-pedido">Domicilio</div>
                            <div class="col-12 col-sm-6 col-car-pedido">$12.000</div>
                            <div class="w-100 d-none d-md-block"></div>
                            <div class="col-12 col-sm-6 col-car-pedido">TOTAL</div>
                            <div class="col-12 col-sm-6 col-car-pedido">$24.000</div>

                            <div class="w-100 d-none d-md-block"></div>

                            <div class="col-12 col-sm-6 col-btn-pedido"><button type="button" class="btn btn-pedido">Hacer pedido</button></div>
                            
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductoModal));