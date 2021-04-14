import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import { Modal, ListGroup} from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { opcionActions } from '../opciones/actions';
import { Options} from '../helpers/item_opcion';

class ProductoModal extends Component {



    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            cantidad: 1,
            opcionesSeleccionadas: [],
            opcionesObligatorias: []
          
        }

    }

    async componentDidMount() {
        await this.props.obtener_opciones_producto(this.props.id_producto_seleccionado, true, this);
    }



    render() {

        const deseleccionar = async  (event, opcion) => {
            event.stopPropagation();

                let check = this.state[opcion.IdProductoOpciones];

                if (check === true) {

                    this.setState({ [opcion.IdProductoOpciones]: false });

                    let op = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion === opcion.Opcion.IdTipoOpcion);

                    if (op.length > 0 && op[0].subOpcion !== 0) {
                        var id = op[0].subOpcion;

                        let opciones = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion !== opcion.Opcion.IdTipoOpcion)

                        while (id !== 0) {

                            const sub = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === id);

                            var e = document.getElementById(`${id}-item-op`);
                            e.classList.remove("enable");

                            if (sub !== undefined) {

                                opciones = opciones.filter(item => item.idTipoOpcion !== sub.idTipoOpcion)

                                this.setState({  [sub.idProductoOpciones]: false });

                                id = sub.subOpcion;
                            } else {
                                id = 0;
                            }
                        await    this.setState({ opcionesSeleccionadas: opciones });


                        }

                    } else {
               
                        const opciones = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion !== opcion.Opcion.IdTipoOpcion)
                
                        await  this.setState({ opcionesSeleccionadas: opciones });
                    }


                }

                generarPrecio();
        }

        const HandleRadioChange = async (event) => {
            event.stopPropagation();

            let option = JSON.parse(event.target.value);

            let optioncheck = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === option.Opcion.IdTipoOpcion);

            this.setState({ [option.IdProductoOpciones]: false });


            if (optioncheck === undefined) {
                this.setState({ [option.IdProductoOpciones]: true });
            } else {
                this.setState({ [optioncheck.idProductoOpciones]: false, [option.IdProductoOpciones]: true });
            }
          
           
          await  procesarSeleccion(option)
            
          generarPrecio();
        }

        const procesarSeleccion = (option) => {

            const { opcionesSeleccionadas } = this.state;
            let IdsubOpcion = 0;

            if (option.MuestraSecundario) {
                let id = option.ProductoOpcionTipoOpciones[0].ProductoTipoOpcion.IdTipoOpcion;
                var element = document.getElementById(`${id}-item-op`);
                element.classList.add("enable");
                IdsubOpcion = id;
              

            } else {

                let op = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion === option.Opcion.IdTipoOpcion);

                if (op.length > 0 && op[0].subOpcion !== 0) {
                    var id = op[0].subOpcion;

                    while (id !== 0) {

                        const sub = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === id);

                        var e = document.getElementById(`${id}-item-op`);
                        e.classList.remove("enable");

                        if (sub !== undefined) {
                            let index = this.state.opcionesSeleccionadas.findIndex(item => item.idTipoOpcion === id);

                            if (index > -1) {
                                const opciones = this.state.opcionesSeleccionadas.splice(index, 1);
                                this.setState({ opcionesSeleccionadas: opciones });
                            }

                            this.setState({ [sub.idProductoOpciones]: false });

                            id = sub.subOpcion;
                        } else {
                            id = 0;
                        }

                    }

                }
            }

            let opcionSeleccionada = {
                idTipoOpcion: option.Opcion.IdTipoOpcion,
                nombreTipo: option.Opcion.TipoOpcion.Nombre,
                nombre: option.Opcion.Nombre,
                idProductoOpciones: option.IdProductoOpciones,
                subOpcion: IdsubOpcion,
                cantidad: 0,
                idTipoSeleccion: option.ProductoTipoOpcion.IdTipoSeleccion,
                precio: option.Opcion.Precio,
                añadir:''
            };

            if (this.state.opcionesSeleccionadas.length > 0) {

                const o = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === option.Opcion.IdTipoOpcion);

                this.setState({
                    opcionesSeleccionadas: o === undefined ? [...opcionesSeleccionadas, opcionSeleccionada] : this.state.opcionesSeleccionadas.map((item, index) =>
                        item.idTipoOpcion === option.Opcion.IdTipoOpcion ? { ...item, nombre: option.Opcion.Nombre, subOpcion: IdsubOpcion, idProductoOpciones: option.IdProductoOpciones, precio: option.Opcion.Precio } : item
                    )
                });


            } else {
                this.setState({
                    opcionesSeleccionadas: [...opcionesSeleccionadas, opcionSeleccionada]
                });
            }

        
        }

        const rdbtnSelec = async (opciones) => {

            if (opciones.length > 0) {
                if (opciones[0].ProductoTipoOpcion.EsObligatoria) {
                    let TipoOpcion = opciones[0].ProductoTipoOpcion.TipoOpcion;
                   
                    let opcion = this.state.opcionesObligatorias.find(item => item.IdTipoOpcion === TipoOpcion.IdTipoOpcion);

                    
                    if (opcion === undefined) {
                        await this.setState({
                            opcionesObligatorias: [...this.state.opcionesObligatorias, {
                                IdTipoOpcion: TipoOpcion.IdTipoOpcion,
                                Nombre: TipoOpcion.Nombre,
                                Orden: opciones[0].ProductoTipoOpcion.Orden
                            }]
                        });

                    }
                }
            }

                for (var i = 0; i < opciones.length; i++) {
                    let id = opciones[i].IdProductoOpciones;
                    var ids = this.state[id]
                    if (ids == null) {
                        this.setState({ [id]: false });
                    }
                }
            
        }

        const CambioSeleccion = (opcion) => {
            return this.state[opcion.IdProductoOpciones]
        }

        const AgregarAdicion = async (event, value, opcion) => {
           
            if (value === 0) {
                

                await this.setState({
                    opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Pmer. Sabor" } : item
                    )
                });
            } else if (value === 50) {
                
                await this.setState({
                    opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Toda" } : item
                    )
                });
            } else if (value === 100) {
        
                await this.setState({
                    opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Sdo. Sabor" } : item
                    )
                });
            }
          
        }

        const Agregar = async (event) => {

            if (this.state.opcionesObligatorias.length > 0) {

                 this.state.opcionesObligatorias.sort((a, b) => (a.Orden - b.Orden));

                for (var i = 0; i < this.state.opcionesObligatorias.length; i++) {

                    let e = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === this.state.opcionesObligatorias[i].IdTipoOpcion);

                    if (e === undefined) {
                        this.props.showMessage('Debes seleccionar ' + this.state.opcionesObligatorias[i].Nombre, true, 'Información');
                        break
                    }


                }
            }



        }

        const CantidadChange = async (event) => {
            let cantidad = this.state.cantidad;

            if (event.currentTarget.name === "cant-mas") {
                if (cantidad < 99) {
                    cantidad = cantidad + 1;
                }
            } else if (event.currentTarget.name === "cant-menos") {
                if (cantidad > 1) {
                    cantidad = cantidad - 1;
                }
            }

            await this.setState({
                cantidad
            });

            generarPrecio();
        }

        const HandleIncreChange = async (event, opcion) => {

            var element = document.getElementById(`${opcion.IdProductoOpciones}-item-op-var`);

            let cantidad = parseInt(element.innerHTML);

            if (event.currentTarget.name === "cant-mas") {
                if (cantidad < 99) {
                    cantidad = cantidad + 1;
                }
            } else if (event.currentTarget.name === "cant-menos") {
                if (cantidad > 0) {
                    cantidad = cantidad - 1;
                }
            }

            element.innerHTML = cantidad;

            let opcionSeleccionada = {
                idTipoOpcion: opcion.Opcion.IdTipoOpcion,
                nombreTipo: opcion.Opcion.TipoOpcion.Nombre,
                nombre: opcion.Opcion.Nombre,
                idProductoOpciones: opcion.IdProductoOpciones,
                subOpcion: 0,
                cantidad: cantidad,
                idTipoSeleccion: opcion.ProductoTipoOpcion.IdTipoSeleccion,
                precio: opcion.Opcion.Precio,
                añadir: ''
            };

            if (this.state.opcionesSeleccionadas.length > 0) {
                if (cantidad === 0) {
                    let opciones = this.state.opcionesSeleccionadas.filter(item => item.idProductoOpciones !== opcion.IdProductoOpciones);
                    await this.setState({ opcionesSeleccionadas: opciones });
       
                } else {
                    const o = this.state.opcionesSeleccionadas.find(item => item.idProductoOpciones === opcion.IdProductoOpciones);

                    await   this.setState({
                        opcionesSeleccionadas: o === undefined ? [...this.state.opcionesSeleccionadas, opcionSeleccionada] : this.state.opcionesSeleccionadas.map((item, index) =>
                            item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, nombre: opcion.Opcion.Nombre, subOpcion: 0, idProductoOpciones: opcion.IdProductoOpciones, cantidad: cantidad, precio :opcion.Opcion.Precio } : item
                        )
                    });
                }


            } else {
          
                if (cantidad !== 0) {
                    await   this.setState({
                        opcionesSeleccionadas: [...this.state.opcionesSeleccionadas, opcionSeleccionada]
                    });

                }
            }

            if (this.props.opciones_producto.EsPizza) {

                var e = document.getElementById(`${opcion.IdProductoOpciones}-item-add`);
                if (e != null) {
                    var child = e.getElementsByTagName('input')[0];

                    if (cantidad === 1) {
                        e.classList.add("enable");

                        await AgregarAdicion(event, parseInt(child.value), opcion)
                    } else if (cantidad === 0) {
                        e.classList.remove("enable");
                    }

                }
            }

            generarPrecio();
        }

        const generarPrecio =  () => {
            let total = 0;

            if (this.state.opcionesSeleccionadas.length > 0) {

                for (var i = 0; i < this.state.opcionesSeleccionadas.length; i++) {
                    let opcion = this.state.opcionesSeleccionadas[i];

                    if (opcion.idTipoSeleccion === 1) {
                        total = total + opcion.precio;

                    } else {
                        total = total + (opcion.precio * opcion.cantidad);
                    }

                    this.setState({
                        total: (total * this.state.cantidad)
                    });
                }
            } else {

               
                this.setState({ total: 0 });
            }


            
           
         
        }

        return (
            <Modal
                show={this.props.show}
                onHide={() => this.props.ver_crear(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <div>

                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{this.props.opciones_producto.Nombre}</h5>
                        <button type="button" onClick={this.props.onHide} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-scroll p-1 ">
                            <div className="row row-modal">
                                <div className="col-lg-6 col-12 col-image">
                                    <img className="image-add" src={`${process.env.REACT_APP_API_URL}app-images/${this.props.opciones_producto.UrlImagen}`} alt="producto" />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <p>{this.props.opciones_producto.Descripcion}</p>
                                </div>
                            </div>
                            <div className="col-12 col-size p-0 scroll-content">
                                {this.props.opciones_producto.VistaProductoOpcionesGroup != null && this.props.opciones_producto.VistaProductoOpcionesGroup.length > 0 ?
                                    <ListGroup variant="flush" >
                                        {

                                            this.props.opciones_producto.VistaProductoOpcionesGroup.map(function (opciones, index, array) {                                             
                                                rdbtnSelec(opciones);
                                      
                                                return <Options.OptionItems opciones={opciones} AgregarAdicion={AgregarAdicion} HandleIncreChange={HandleIncreChange} index={index}  HandleRadioChange={HandleRadioChange} CambioSeleccion={CambioSeleccion} deseleccionar={deseleccionar} />

                                            })
                                        }



                                    </ListGroup>
                                    : ""

                                }
                            </div>
                        </div>

                    </div>

                </div>

                <div className="modal-footer">
                    <div className="container container-footer">
                        <div className="row row-footer ">
                            <div className="col-sm-12 col-lg-6">

                                <div className="row h-100 p-1">
                                    <div className="col-4 col-cantidad align-items-center">
                                        <a className="btn btn-default btn-3d-style  btn-block" href="#" name="cant-menos" onClick={(e) =>  CantidadChange(e)} >
                                            <RemoveIcon />
                                        </a>
                                    </div>
                                    <div className="col-4 d-flex align-items-center mt-2 mb-2 justify-content-center ">
                                        <p> {this.state.cantidad}</p>
                                    </div>
                                    <div className="col-4 col-cantidad">
                                        <a className="btn btn-default btn-3d-style  btn-block" href="#" name="cant-mas" onClick={(e) => CantidadChange(e)} >
                                            <AddIcon />
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-3 col-value  d-flex align-items-center justify-content-center font-weight-bold">
                                <h4 className="font-weight-bold">  $  {this.state.total} </h4>
                            </div>
                            <div className="col-sm-12 col-lg-3 p-1 ">
                                <a className="btn btn-default btn-3d-style  btn-block" onClick={Agregar} >
                                    <i className="fa fa-cart-plus"></i>
                                            Agregar
                                 </a>

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
    const { mostrar_opciones } = state.opcionesReducer;
    return { loggingIn, user, categorias, opciones_producto, id_producto_seleccionado, mostrar_opciones};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_crear: productoActions.ver_crear,
    ver_opciones: opcionActions.ver_opciones,
    producto_seleccionado: productoActions.producto_seleccionado
    
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductoModal));