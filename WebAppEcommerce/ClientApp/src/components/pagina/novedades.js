import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import Carrito from '../carrito/index';
import imageHeader1 from '../../imagenes/pagina/header1.jpg';
import imageHeader2 from '../../imagenes/pagina/header2.jpg';
import imageHeader3 from '../../imagenes/pagina/header3.jpg';





class Novedades extends Component {

    componentDidMount() {
        window.scroll(100, 0);
        document.getElementById('novedades').style.backgroundColor = "rgba(0, 0, 0, 0.24)";
      
    }


    render() {

        return (
            <body data-spy="scroll" data-target="#navbar" data-offset="57">
                <Header visiblePagina="true" />
                <div className="row smart-order-novedades">
                    <div className="col   text-center text-uppercase pt-2 pb-4">
                        <h1>NOVEDADES</h1>
                     
                    </div>

                </div>
                <div className="row row-novedades p-lg-4  p-sm-0 ">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader1} alt="Foto de Pizza 1" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 1</h5>
                                <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader2} alt="Foto de Pizza 2" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 2</h5>
                                <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader3} alt="Foto de Pizza 3" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 3</h5>
                                <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader1} alt="Foto de Pizza 1" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 1</h5>
                                <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader1} alt="Foto de Pizza 1" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 1</h5>
                                <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card ">
                            <img className="card-img-top" src={imageHeader1} alt="Foto de Pizza 1" />
                            <div className="card-body">
                                <h5 className="card-title">Pizza 1</h5>
                                <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                            </div>
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Novedades));