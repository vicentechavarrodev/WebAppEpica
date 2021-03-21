import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import imageHeader2 from '../../imagenes/pagina/header2.jpg';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { categoriaActions } from '../categorias/actions';


class PideLinea extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

            selected: 'item1'

        };



    }

    componentDidMount() {
        this.props.obtenerCategorias();
        console.log(this.props.categorias);
        
    }

    onSelect = key => {
        this.setState({ selected: key });
    }

       render() {


           const MenuItem = ({ text, selected }) => {
               return <div
                   className={`menu-item ${selected ? 'active' : ''}`}
               >{text}</div>;
           };


           const Menu = (list, selected) =>
               list.map(el => {
                   const { Nombre } = el;

                   return <MenuItem text={Nombre} key={Nombre} selected={selected} />;
               });


           const Arrow = ({ text, className }) => {
               return (
                   <div
                       className={className}
                   >{text}</div>
               );
           };

           const ArrowLeft = Arrow({ text: <ArrowBackIosIcon />, className: 'arrow-prev' });
           const ArrowRight = Arrow({ text: <ArrowForwardIosIcon />, className: 'arrow-next' });

           this.menuItems = Menu(this.props.categorias, this.state.selected);

    
   
        return (
            <body data-spy="scroll" data-target="#navbar" data-offset="57">
                <Header visiblePagina="true" />
                <div className="horizontal-menu">
                 <div className="container container-horizontal">
                    <div className="content">
                       
                        <ScrollMenu
                            alignCenter={true}
                            alignOnResize={true}
                            data={this.menuItems}
                            arrowLeft={ArrowLeft}
                            arrowRight={ArrowRight}
                            selected={this.state.selected}
                            onSelect={this.onSelect}
                            scrollBy={1}
                            scrollToSelected={true}
                            transition={1}
                            clickWhenDrag={false}

                        />
                    </div>
                    </div>
                </div>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1">
                            <div className="col-lg-4 col-sm-6">
                                <div className="card shadow-sm">
                                    <img className="image-pizzas" src={imageHeader2} width="100%" height="225" />
                                    <div className="card-body card-style">
                                        <p className="card-text card-tittle">Pizza Napolitana</p>
                                        <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit oluptates recusandae consequatur?</p>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-6 col-button">
                                                    <button type="button" className="btn" data-toggle="modal" data-target="#añadirModal">
                                                        <i class="fas fa-cart-plus"></i>
                                                         Agregar</button>
                                                </div>
                                                <div className="col-lg-6 col-price">
                                                    <p className="text-price">$10.000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="añadirModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Pizza Napolitana</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                            <div className="modal-body">
                                <div className="container pl-0 pr-0">
                                    <div className="row row-modal">
                                        <div className="col-lg-6 col-12 col-image">
                                            <img className="image-add" src={imageHeader2}/>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, iste</p>
                                      </div>
                                      </div>
                                    <div className="col-12 col-size">
                                           <p>Elige el tamaño que deseas</p>
                                        <div className="radio-size">
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example"/>
                                                  Porcion
                                                </label>
                                              </div>
                                                <div className="col col-price-modal">
                                                $8.000
                                              </div>
                                            </div>
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example"/>
                                                  Mediana
                                                </label>
                                              </div>
                                                <div className="col col-price-modal">
                                                $17.000
                                              </div>
                                            </div>
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example"/>
                                                  Grande
                                                </label>
                                              </div>
                                                <div className="col col-price-modal">
                                                $25.000
                                              </div>
                                            </div>
                                         </div>

                                          <p>Elige la combinacion que deseas</p>
                                        <div className="radio-size">
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                  Napolitana
                                                </label>
                                              </div>
                                            </div>
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                  Hawaiana
                                                </label>
                                              </div>
                                            </div>
                                            <div class="row-size">
                                                <div class="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                  Peperoni
                                                </label>
                                              </div>
                                            </div>
                                         </div>

                                         <p>¿Deseas agregar algun reborde?</p>
                                        <div className="radio-size">
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                  Queso
                                                </label>
                                              </div>
                                                <div className="col col-price-modal">
                                                $8.000
                                              </div>
                                            </div>
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                  Bocadillo
                                                </label>
                                              </div>
                                                <div className="col col-price-modal">
                                                $17.000
                                              </div>
                                            </div>
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                  Vegetales
                                                </label>
                                              </div>
                                                <div className="col col-price-modal">
                                                $25.000
                                              </div>
                                            </div>
                                         </div>

                                         <p>¿Deseas agregar alguna adicion?</p>
                                        <div className="radio-size">
                                            <div className="row-size">
                                                <div className="col">
                                              <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                Vegetales
                                              </label>
                                            </div>
                                                <div className="row">
                                                    <div className="col">
                                                -
                                              </div>
                                                    <div className="col">
                                                1
                                              </div>
                                                    <div className="col">
                                                +
                                              </div>
                                            </div>
                                                <div className="col col-price-modal-adicion">
                                              $8.000
                                            </div>
                                          </div>
                                            <div className="row-size">
                                                <div className="col">
                                              <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                Bocadillo
                                              </label>
                                            </div>
                                                <div className="row">
                                                    <div className="col">
                                                -
                                              </div>
                                                    <div className="col">
                                                1
                                              </div>
                                                    <div className="col">
                                                +
                                              </div>
       
                                            </div>
                                                <div className="col col-price-modal-adicion">
                                              $17.000
                                            </div>
                                          </div>
                                            <div className="row-size">
                                                <div className="col">
                                              <label>
                                                        <input type="radio" className="option-input radio" name="example2"/>
                                                Tocineta
                                              </label>
                                            </div>
                                                <div className="row">
                                                    <div className="col">
                                                -
                                              </div>
                                                    <div className="col">
                                                2
                                              </div>
                                                    <div className="col">
                                                +
                                              </div>
       
                                            </div>
                                                <div className="col col-price-modal-adicion">
                                              $25.000
                                            </div>
                                          </div>
                                       </div>
                                 </div>
                                    <div className="modal-footer">
                                        <div className="container container-footer">
                                            <div className="row row-footer">
                                                <div className="col-sm">
                                                    <div className="container container-cantidad">
                                                        <div className="row">
                                                            <div className="col col-cantidad">
                                               -
                                              </div>
                                                            <div className="col">
                                                1
                                              </div>
                                                            <div className="col col-cantidad">
                                                +
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                                <div className="col-sm col-value">
                                         $10.000
                                        </div>
                                                <div className="col col-buttonadd">
                                                    <button type="button" className="btn">
                                                        <i className="fas fa-cart-plus"></i>
                                            Agregar</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
            
                <Footer />
            </body>


        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    return { loggingIn, user, categorias };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PideLinea));