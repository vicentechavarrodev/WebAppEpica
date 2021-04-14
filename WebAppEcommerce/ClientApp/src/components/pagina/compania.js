import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import Carrito from '../carrito/index';
import imageHeader1 from '../../imagenes/pagina/header1.jpg';





class Compania extends Component {

    componentDidMount() {
        document.getElementById('compania').style.backgroundColor = "rgba(0, 0, 0, 0.24)";
    }


    render() {
        return (
            <body data-spy="scroll" data-target="#navbar" data-offset="57">
                <Header visiblePagina="true" />
                <div className="row smart-order-novedades">
                    <div className="col   text-center text-uppercase pt-2 pb-4">
                        <h1>COMPAÑIA</h1>

                    </div>

                </div>
                <div class="container container-compañia">
                    <div className="row">
                            <div class="col-12 subtittle">
                                <p>Nuestra Historia</p>
                            </div>
                            <div class="col-12 column-image">
                            <img className="image" src={imageHeader1} alt="Foto de Pizza 1" />
                        </div>
                        <div class="col-12">
                            <h6>Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer took
                            a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.</h6>
                        </div>
                    </div>
                    </div>
         
                <Carrito/>



                <Footer />
            </body>


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