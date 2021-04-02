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
import { productoActions } from '../productos/actions';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import CarModal from './car_modal';



class Pagina extends Component {



    constructor(props) {
        super(props);
        this.openCar = this.openCar.bind(this);
      
    }

    componentDidMount() {
        loader.hide();
        
     
    }
    openCar() {
        const btn = document.getElementById('btn-car');
      
        btn.style.display = 'none';
        this.props.ver_crear(true);
      
       
    }
       

    render() {
        const { mostrar_crear } = this.props;
         return (
            <div data-spy="scroll" data-target="#navbar" data-offset="57">
            <Header visiblePagina="true" />
            
                  <section id="main">
                    <article id="carousel" className="carousel slide carousel-fade" data-ride="carousel" data-pause="false">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block" src={imageEpica1} alt="Epica 1" />
                                <div className="carousel-caption d-none d-md-block">
                                    <p>Parrafo 1 olor sit amet consectetur adipisicing elit.Ex, similique debitis inventore animi, hic incidunt, sapiente n</p>
                                </div>
                                </div>
                                <div className="carousel-item">
                                <img className="d-block" src={imageEpica2} alt="Epica 2" />
                                <div className="carousel-caption d-none d-md-block">
                                    <p>Parrafo 2 olor sit amet consectetur adipisicing elit.Ex, similique debitis inventore animi, hic incidunt, sapiente n</p>
                                </div>
                                </div>
                                <div className="carousel-item">
                                <img className="d-block" src={imageEpica3} alt="Epica 3" />
                                <div className="carousel-caption d-none d-md-block">
                                    <p>Parrafo 3 olor sit amet consectetur adipisicing elit.Ex, similique debitis inventore animi, hic incidunt, sapiente n</p>
                                </div>
                                </div>
                                   
                         </div>
                         <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                             <span class="sr-only">Previous</span>
                         </a>
                         <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                             <span class="carousel-control-next-icon" aria-hidden="true"></span>
                             <span class="sr-only">Next</span>
                         </a>
                         <ol class="carousel-indicators">
                             <li data-target="#carousel" data-slide-to="0" class="active"></li>
                             <li data-target="#carousel" data-slide-to="1"></li>
                             <li data-target="#carousel" data-slide-to="2"></li>
                         </ol>
                     </article>
                </section>
                <section id="container" className="container mt-lg-3 mb-lg-5">
                    <div className="row smart-order">
                        <div className="col   text-center text-uppercase pt-2 pb-4">
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
                     <div className="car-lateral fixed-top">
                         <button type="button" className="btn btn-link" id='btn-car' onClick={this.openCar}>
                             <i className="fa fa-cart-plus"></i>
                         </button>
                     </div>
                     {mostrar_crear ?
                         <CarModal/>
                         :
                         ""
                     }
                    
                 
           
                </section>
              
                
             
                <Footer />

            </div>  
            

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const {mostrar_crear } = state.productoReducer;
    return { loggingIn, user,mostrar_crear};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: productoActions.ver_crear,
};




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagina));