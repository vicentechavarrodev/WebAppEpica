import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import CarModal from '../pagina/car_modal';
import { productoActions } from '../productos/actions';
import { withRouter } from "react-router-dom";
import { sliceElements } from '@syncfusion/ej2-react-grids';

class Carrito extends Component {

    constructor() {
        super();
        this.openCar = this.openCar.bind(this);
    }

    //-------------------------------Eventos------------------------

    openCar() {
        
        
        
        const btn = document.getElementById('btn-car');
       
        btn.style.display = 'none';
        this.props.ver_car(true);


    }



    


    //---------------------------------------------------------------
    render() {
     
        const { mostrar_car } = this.props;
    return (
        <section>
            <div className="car-lateral fixed-top">
                <button type="button" className="btn btn-link" id='btn-car' onClick={this.openCar}>
                    <i className="fa fa-cart-plus"></i>
                    <span className="cantidad-pedidos">{this.props.cantidad_pedidos}</span>
                </button>
               
            </div>
            {
                mostrar_car ?
                    <CarModal />
                    :
                    ""
            }
        </section>


    );
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {
    const { menuLateralVisible } = state.lateralBarReducer;
    const { mostrar_car, productos_pedido, cantidad_pedidos } = state.productoReducer;
    return {
        menuLateralVisible,
        mostrar_car,
        productos_pedido,
        cantidad_pedidos
    };


};

const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible,
    ver_car: productoActions.ver_car,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carrito));
