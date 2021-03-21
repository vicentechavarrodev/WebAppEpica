import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { loader } from '../helpers/loader';
import imageEpica1 from '../../imagenes/pagina/pizza1.jpg';
import imageEpica2 from '../../imagenes/pagina/pizza2.jpg';
import imageEpica3 from '../../imagenes/pagina/pizza3.jpg';
import imageHeader1 from '../../imagenes/pagina/header1.jpg';
import imageHeader2 from '../../imagenes/pagina/header2.jpg';
import imageHeader3 from '../../imagenes/pagina/header3.jpg';
import { Row, Col } from 'react-bootstrap';




class Pagina extends Component {

    componentDidMount() {
        loader.hide();
     
    }


    render() {

        return (
            <body data-spy="scroll" data-target="#navbar" data-offset="57">
            <Header visiblePagina="true" />
            
                  <section id="main">
                    <article id="carousel" className="carousel slide carousel-fade" data-ride="carousel" data-pause="false">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block" src={imageEpica1} alt="Epica 1" />
                                </div>
                                <div className="carousel-item">
                                <img className="d-block" src={imageEpica2} alt="Epica 2"/>
                                </div>
                                    <div className="carousel-item">
                                    <img className="d-block" src={imageEpica3} alt="Epica 3"/>
                                    </div>
                                    <div className="carousel-caption d-none d-md-block">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Ex, similique debitis inventore animi, hic incidunt, sapiente n</p>
                                     </div>
                                    </div>
                     </article>
                </section>
                <section id="container" className="container mt-lg-3 mb-lg-5">
                    <div className="row">
                        <div class="col linea text-center text-uppercase">
                            <small>Conoce nuestro</small>
                            <h2>Menu</h2>
                        </div>
                        <div className="linea"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <img className="card-img-top" src={imageHeader1} alt="Foto de Pizza 1" />
                                <div className="card-body">
                                    <h5 className="card-title">Pizza 1</h5>
                                    <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                                    </div>
                             </div>
                            </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <img className="card-img-top" src={imageHeader2} alt="Foto de Pizza 2"/>
                                <div className="card-body">
                                    <h5 className="card-title">Pizza 2</h5>
                                    <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                                        </div>
                                   </div>
                                </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <img className="card-img-top" src={imageHeader3} alt="Foto de Pizza 3"/>
                                <div className="card-body">
                                    <h5 className="card-title">Pizza 3</h5>
                                    <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                                            </div>
                                      </div>
                                    </div>
                                </div>
                </section>
                
             
            <Footer />
             </body>  
            

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return { loggingIn, user};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagina));