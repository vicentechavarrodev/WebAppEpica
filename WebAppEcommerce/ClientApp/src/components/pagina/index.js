﻿import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { loader } from '../helpers/loader';
import imageHeader1 from '../../imagenes/pagina/header1.jpg';
import imageHeader2 from '../../imagenes/pagina/header2.jpg';
import imageHeader3 from '../../imagenes/pagina/header3.jpg';
import { productoActions } from '../productos/actions';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { bannerActions } from '../banner/actions';
import Carrito from '../carrito/index';
import { Helmet } from 'react-helmet';
import Metatags from '../helpers/metatags';
import slide1 from '../../imagenes/pagina/pizzas_neiva01.gif';
import slide2 from '../../imagenes/pagina/pizzas_neiva02.gif';
import slide3 from '../../imagenes/pagina/pizzas_neiva03.gif';
import slide from '../../imagenes/pagina/slide1.gif';

class Pagina extends Component {
  




    async componentDidMount() {

       loader.hide();
       window.scroll(100, 0);
       await this.props.obtenerBanners(this);
      
     
        
     
    }
        

    render() {
       
         return (
             <div data-spy="scroll" data-target="#navbar" data-offset="57">
                 <Metatags title="Épica - Pizza Artesanal" description="La mejor y mas deliciosa pizza en Neiva ,y a domicilio ,artesanal hecha en horno de barro ,con variedad y tradición  italiana. Pide aquí y disfruta en casa!" />
            <Header visiblePagina="true" />
            
                  <section id="main">
                     <article id="carousel" className="carousel slide carousel-fade" data-ride="carousel" data-pause="false">
                         <div className="carousel-inner">
                             {this.props.banners.map((item, index) => 
                                 index===0 ?
                                              
                                 <div className="carousel-item active">
                                     <img className="d-block" src={`${process.env.REACT_APP_API_URL}app-images/${item.UrlImagen}`} alt={item.Nombre} />
                                     <div className="carousel-caption  d-md-block">
                                         <p>{item.Descripcion}</p>
                                     </div>
                                 </div>
                                     :
                                     <div className="carousel-item">
                                         <img className="d-block" src={`${process.env.REACT_APP_API_URL}app-images/${item.UrlImagen}`} alt={item.Nombre} />
                                         <div className="carousel-caption  d-md-block">
                                             <p>{item.Descripcion}</p>
                                         </div>
                                     </div>                                         
                                     
      
                             )}
                   
                         
                                        
                         </div>
                         <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                             <span className="sr-only">Previous</span>
                         </a>
                         <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
                             <span className="sr-only">Next</span>
                         </a>
                         <ol className="carousel-indicators">
                             <li data-target="#carousel" data-slide-to="0" className="active"></li>
                             <li data-target="#carousel" data-slide-to="1"></li>
                             <li data-target="#carousel" data-slide-to="2"></li>
                         </ol>
                     </article>
                </section>
                <section id="container" className="container mt-lg-3 mb-lg-5">
                    <div className="row smart-order">
                        <div className="col  text-center text-uppercase pt-2 pb-4">
                            <h6>EMPIEZA TU PEDIDO</h6>
                            <div className="icons-pedido">
                                <Link to="/pideLinea" className="btn btn-default btn-3d-style  btn-block" >
                                    <span className="element-hide"><AddIcon/></span>
                                    <span className="hidde-element"> Pedir ahora</span>
                                   
                                </Link>
                             
                            </div>
                        </div>
                      
                    </div>
                    <div className="row p-lg-4  p-sm-0 ">
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card ">
                                 <img className="card-img-top" src={slide2} alt="Pizzas en Huila" />
                                <div className="card-body">
                                     <h5 className="card-title text-center">Cambia de ambiente y tomate un descanso  &#128522;</h5>
                                    <p className="card-text">Hay un lugar ambientado , tradicional y fresco esperando por ti , para que tu y ese perfil social se nutran de momentos</p>
                                    </div>
                             </div>
                            </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card ">
                                 <img className="card-img-top" src={slide3} alt="Pizza en Neiva"/>
                                <div className="card-body">
                                     <h5 className="card-title text-center">Pide ahora y prueba nuestro  servicio &#x23f0;</h5>
                                    <p className="card-text">Si estas comodo en tu casa y existe un ambiente pizzero, pide ahora y, deja que  nuestros productos te acompañen .</p>
                                        </div>
                                   </div>
                                </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card ">
                                 <img className="card-img-top" src={slide1} alt="Pizza a domicilio"/>
                                <div className="card-body">
                                     <h5 className="card-title text-center">Somos lo que comemos, dicen por ahi &#128147;</h5>
                                    <p className="card-text">Nosotros preparamos nuestros productos con amor, asi que imagina lo feliz que te vas a ver despues de probarlos.</p>
                                            </div>
                                      </div>
                        </div>
                      
                    </div>
                   <Carrito/>     
           
                </section>
              
                
             
                <Footer />

            </div>  
            

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { mostrar_crear } = state.productoReducer;
    const { banners } = state.bannerReducer;
    return { loggingIn, user,mostrar_crear,banners};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerBanners: bannerActions.obtener_banners,
    ver_crear: productoActions.ver_crear,
};




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagina));