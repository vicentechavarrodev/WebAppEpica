import React, { Component } from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import ModalOpciones from '../productos/productoModal';
import Carrito from '../carrito/index';

class PideLinea extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

            selected: '1',
            opciones_productos:[],
            
        };

        this.AbrirModal = this.AbrirModal.bind(this);

    }

    async componentDidMount() {
        window.scroll(100, 0);
        document.getElementById('pideLinea').style.backgroundColor = "rgba(0, 0, 0, 0.24)";
        await this.props.obtenerCategorias(this);
        if (this.props.location.Id_categoria_seleccionada !== undefined) {
             this.props.productos_por_categoria(this.props.location.Id_categoria_seleccionada);
             this.onSelect(this.props.location.Id_categoria_seleccionada);
        } else {
            if (this.props.categorias.length  > 0) {
                this.props.productos_por_categoria(this.props.categorias[0].IdCategoria);
            }
          
        }
        
       
    }

   
    onSelect = key => {

        this.setState({ selected: key });
        this.props.productos_por_categoria(key);
        
    }
   async AbrirModal(e) {
       console.log(e.currentTarget.id)
        await this.props.producto_seleccionado(e.currentTarget.id);
        this.props.ver_crear(true);
    }

       render() {
           const {mostrar_crear } = this.props;

           const MenuItem = ({ text, selected }) => {
               return <div
                   className={`menu-item ${selected ? 'active' : ''}`}
               >{text}</div>;
           };


           const Menu = (list, selected) =>
               list.map(el => {
                   const { Nombre, IdCategoria } = el;
                   
                   return <MenuItem text={Nombre} key={IdCategoria} selected={selected} />;
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
            <div data-spy="scroll" data-target="#navbar" data-offset="57">
                <Header visiblePagina="true" />
                <div className="horizontal-menu bg-light">
                 <div className="container container-horizontal">
                    <div className="content">
                       
                        <ScrollMenu
                         
                                alignOnResize={true}
                                data={this.menuItems}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                selected={this.state.selected}
                                onSelect={this.onSelect}
                                scrollBy={1}
                                alignCenter={false}
                        />
                    </div>
                    </div>
                </div>
                <div className="album py-5 bg-light">
                    <div className="container p-lg-4  p-sm-0 rounded nav-icon">
                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1">
                            {this.props.productos_categoria.map((item) =>
                                <div className="col-lg-4 col-sm-6 col-md-6 justify-card" key={item.IdProducto}>
                                    <div className="card cards">
                                        <img className="image-pizzas" src={`${process.env.REACT_APP_API_URL}app-images/${item.UrlImagen}`} alt="producto" width="100%" height="225" />
                                           <div className="card-body card-style">
                                            <p className="card-text card-tittle">{item.Nombre}</p>
                                            <p className="paragraph">{item.Descripcion}</p>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-6 col-price">
                                                        {!item.PrecioVariable ?
                                                            <p className="text-price">${item.Precio}</p>
                                                            :""
                                                        }
                                                    </div>
                                                    <div className="col-lg-6 col-button">
                                                        <button type="button" className="btn btn-pidelinea" id={item.IdProducto} onClick={this.AbrirModal} data-toggle="modal" data-target="#añadirModal">
                                                            {item.PrecioVariable ?
                                                                <span>
                                                                    <i className="fa fa-th-list mr-2"></i>
                                                                        Personalizar
                                                                 </span>

                                                                :
                                                                <span>
                                                                    <i className="fa fa-cart-plus"></i>
                                                                        Agregar
                                                                 </span>


                                                            }

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )                        
                            }
                            {mostrar_crear ?
                                <ModalOpciones show={mostrar_crear}
                                    onHide={() => this.props.ver_crear(false)} />
                                :
                                ""
                            }
                            

                         
                        </div>
                    </div>
                </div>
             
                    <Carrito />
                  

         
            
                <Footer />
            </div>


        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    const { productos_categoria, id_producto_seleccionado, opciones_producto, mostrar_crear } = state.productoReducer;
    return { loggingIn, user, categorias, productos_categoria, id_producto_seleccionado, opciones_producto,mostrar_crear };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    productos_por_categoria: productoActions.productos_por_categoria,
    producto_seleccionado: productoActions.producto_seleccionado,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_crear: productoActions.ver_crear,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PideLinea));