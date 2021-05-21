import React, { Component } from 'react';
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
                                     <div className="carousel-caption d-none d-md-block">
                                         <p>{item.Descripcion}</p>
                                     </div>
                                 </div>
                                     :
                                     <div className="carousel-item">
                                         <img className="d-block" src={`${process.env.REACT_APP_API_URL}app-images/${item.UrlImagen}`} alt={item.Nombre} />
                                         <div className="carousel-caption d-none d-md-block">
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
                                    <span className="hidde-element"> Entrega a domicilio</span>
                                   
                                </Link>
                             
                            </div>
                        </div>
                      
                    </div>
                    <div className="row p-lg-4  p-sm-0 ">
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
                                <img className="card-img-top" src={imageHeader2} alt="Foto de Pizza 2"/>
                                <div className="card-body">
                                    <h5 className="card-title">Pizza 2</h5>
                                    <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
                                        </div>
                                   </div>
                                </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card ">
                                <img className="card-img-top" src={imageHeader3} alt="Foto de Pizza 3"/>
                                <div className="card-body">
                                    <h5 className="card-title">Pizza 3</h5>
                                    <p className="card-text">Vivamus quam mi, egestas eu metus id, mollis suscipit ipsum. In vel mollis mauris. Nunc id sem a lacus tincidunt pretium in in urna. Nam mi nisi, tincidunt ac tincidunt id, fermentum at metus.</p>
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