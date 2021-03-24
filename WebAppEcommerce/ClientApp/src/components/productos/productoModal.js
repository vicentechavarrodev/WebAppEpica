import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import imageHeader2 from '../../imagenes/pagina/header2.jpg';
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import { Modal} from 'react-bootstrap';


class ProductoModal extends Component {

    constructor(props) {
        super(props);
     
    }

   async componentDidMount() {

       await this.props.obtener_opciones_producto(this.props.id_producto_seleccionado, this);
      
              
    }


    render() {
          
    

        return (
            
            <Modal
                show={this.props.show}
                onHide={() => this.props.ver_crear(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
            >        
                 
                     <div className="modal-dialog modal-content">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{this.props.opciones_producto.Nombre}</h5>
                             <button type="button" onClick={this.props.onHide} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container pl-0 pr-0">
                                    <div className="row row-modal">
                                    <div className="col-lg-6 col-12 col-image">
                                        <img className="image-add" src={this.props.opciones_producto.UrlImagen} />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                        <p>{this.props.opciones_producto.Descripcion}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-size">
                                    <p>Elige el tamaño que deseas</p>
                                    {this.props.opciones_producto.VistaProductoOpciones.map(function(opciones)
                                    {
                                        if (opciones.Opcion.IdTipoOpcion == "2")
                                            
                                         return(<div className="radio-size">
                                            <div className="row-size">
                                                <div className="col col-radio">
                                                     <label>
                                                         <input type="radio" className="option-input radio" name={opciones.Opcion.IdTipoOpcion} />
                                                        {opciones.Opcion.Nombre}
                                                </label>
                                                </div>
                                                <div className="col col-price-modal">
                                                    {opciones.Opcion.Precio}
                                              </div>
                                            </div>
                                          </div>)
                                                
                                           
                                    }                                
                                        )}
                                    
                                    {this.props.opciones_producto.VistaProductoOpciones.map(function (opciones,index) {
                                      
                                                                             

                                        if (opciones.Opcion.IdTipoOpcion == "4") {
                                            const parrafo = (index) => index == 0 ? <p>Elige la combinacion que deseas</p> : ""
                                            return (
                                                <div>
                                                   parrafo(index)
                                              
                                                <div className = "radio-size" >
                                                    <div className="row-size">
                                                        <div className="col col-radio">
                                                            <label>
                                                                <input type="radio" className="option-input radio" name="example2" />
                                                                {opciones.Opcion.Nombre}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                   


                                            )
                                        }
                                            

                                    }
                                    )}
                                   
                                       
                                    <p>¿Deseas agregar algun reborde?</p>
                                    {this.props.opciones_producto.VistaProductoOpciones.map(function (opciones) {
                                        if (opciones.Opcion.IdTipoOpcion == "3")
                                            return (
                                                <div className="radio-size">
                                                    <div className="row-size">
                                                        <div className="col col-radio">
                                                            <label>
                                                                <input type="radio" className="option-input radio" name="example2" />
                                                                {opciones.Opcion.Nombre}
                                                             </label>
                                                        </div>
                                                        <div className="col col-price-modal">
                                                            {opciones.Opcion.Precio}
                                                        </div>
                                                    </div>

                                                </div>
                                                )

                                    }
                                    )}
                                      

                                    <p>¿Deseas agregar alguna adicion?</p>
                                    {this.props.opciones_producto.VistaProductoOpciones.map(function (opciones) {
                                        if (opciones.Opcion.IdTipoOpcion == "1")
                                            return(
                                            <div className="radio-size">
                                                <div className="row-size">
                                                    <div className="col">
                                                        <label>
                                                            <input type="radio" className="option-input radio" name="example2" />
                                                                {opciones.Opcion.Nombre}
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
                                                            {opciones.Opcion.Precio}
                                                    </div>
                                                </div>


                                                </div>
                                            )
                                    }
                                    )}
                                       
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
                    

               
            </Modal>

           
           

                          



        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    const { opciones_producto, id_producto_seleccionado } = state.productoReducer;
    return { loggingIn, user, categorias, opciones_producto, id_producto_seleccionado};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_crear: productoActions.ver_crear,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductoModal));