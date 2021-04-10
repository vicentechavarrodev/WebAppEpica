import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import CarModal from '../pagina/car_modal';
import { productoActions } from '../productos/actions';
import { withRouter } from "react-router-dom";

class Carrito extends Component {

    constructor() {
        super();
        this.openCar = this.openCar.bind(this);
    }

    //-------------------------------Eventos------------------------

    openCar() {
        const btn = document.getElementById('btn-car');

        btn.style.display = 'none';
        this.props.ver_crear(true);


    }



    


    //---------------------------------------------------------------
    render() {
     
        const { mostrar_crear } = this.props;
    return (
        <section>
            <div className="car-lateral fixed-top">
                <button type="button" className="btn btn-link" id='btn-car' onClick={this.openCar}>
                    <i className="fa fa-cart-plus"></i>
                </button>
            </div>
            {
                mostrar_crear ?
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
    const { mostrar_crear } = state.productoReducer;
    return { mostrar_crear};

    return {
        menuLateralVisible
    };


};

const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible,
    ver_crear: productoActions.ver_crear,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carrito));
