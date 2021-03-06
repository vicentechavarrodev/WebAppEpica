﻿import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import Carrito from '../carrito/index';
import imageHeader1 from '../../imagenes/pagina/header1.jpg';
import Atras from '../atras/index';
import Metatags from '../helpers/metatags';




class Compania extends Component {

    componentDidMount() {
        window.scroll(100, 0);
        document.getElementById('compania').style.backgroundColor = "rgba(0, 0, 0, 0.24)";
    }


    render() {
        return (
            <div>
                <Metatags title="Pizza Artesanal 🔥🤤" description="Ya abrimos hoy, deléitate con nuestros productos artesanales" />
                <Header visiblePagina="true" />
                <div className="row smart-order-novedades">
                    <div className="col   text-center text-uppercase pt-2 pb-4">
                        <h1>COMPAÑIA</h1>

                    </div>

                </div>
                <div className="row row-compania p-lg-4  p-sm-0 ">
                    <div className="col-lg-7 col-sm-10 col-xs-12 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader1} alt="Foto de Pizza 1" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 1</h5>
                                <p className="card-text">Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took
                                a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                                more recently with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                    </div>
              
         
                <Carrito />
                <Atras/>



                <Footer />
            </div>


        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return { loggingIn, user };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Compania));