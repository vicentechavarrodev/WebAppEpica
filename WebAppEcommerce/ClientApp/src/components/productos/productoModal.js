import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import { HorarioActions } from '../horario/actions';
import { Modal, ListGroup, Accordion} from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { opcionActions } from '../opciones/actions';
import { Options } from '../helpers/item_opcion';
import { loader } from '../helpers/loader';

class ProductoModal extends Component {



    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            cantidad: 1,
            opcionesSeleccionadas: [],
            opcionesObligatorias: []
          
        }

        this.baseState = this.state

    }

    async componentDidMount() {
        loader.show();
        await this.props.obtener_opciones_producto(this.props.id_producto_seleccionado, true, this);
       if (!this.props.opciones_producto.EsVariable) {
            this.setState({ total: this.props.opciones_producto.Precio})
       }
    }

    render() {

        const Deseleccionar = async  (event, opcion) => {
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

                GenerarPrecio();
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
          
           
          await ProcesarSeleccion(option);
            
          await GenerarPrecio();

            if (option.CambiaPrecio) {

                let optionSelected = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === option.ProductoTipoOpcionCambio.IdTipoOpcion);

                var e = document.getElementById(`${option.ProductoTipoOpcionCambio.IdTipoOpcion}-item-op`);
                var elementsPrecio = e.getElementsByClassName('col-price-modal');

                var elementsRdio = e.getElementsByTagName('input');

            

                if (elementsPrecio !== undefined && elementsPrecio.length > 0) {

                    let objeto = JSON.parse(elementsRdio[0].value);
                    let total = (parseFloat(this.state.total) - parseFloat(objeto.Opcion.Precio)) + parseFloat(option.Precio)  ;
                        if (optionSelected !== undefined) {
                          await  this.setState({
                              total: total
                            });
                        }

                        for (let i = 0; i < elementsPrecio.length; i++) {
                            elementsPrecio[i].innerHTML = "$ " + option.Precio
                        }

                        for (let i = 0; i < elementsRdio.length; i++) {
                       
                            let objeto = JSON.parse(elementsRdio[i].value);
                            objeto.Opcion.Precio = option.Precio
                            let value = JSON.stringify(objeto);
                            elementsRdio[i].value = value
                        }
                }
            }
        }

        const ProcesarSeleccion = (option) => {

            

            const { opcionesSeleccionadas } = this.state;
            console.log(opcionesSeleccionadas);
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
                añadir: '',
                orden: option.ProductoTipoOpcion.Orden
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

        const RdbtnSelec = async (opciones) => {

          
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
          
            var e = document.getElementById(`${opcion.IdProductoOpciones}-item-flavor`);

           
            if (value === 0) {

                e.textContent = "Primer Sabor";
                await this.setState({
                    opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Pmer. Sabor" } : item
                    )
                });
            } else if (value === 50) {
                e.textContent  = "Toda";
                await this.setState({
                    opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Toda" } : item
                    )
                });
            } else if (value === 100) {
                e.innerHTML = "Segundo sabor";
                await this.setState({
                    opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Sdo. Sabor" } : item
                    )
                });
            }
          
        }

        const Agregar = async (event) => {

            if (this.props.horario_rango === 'false' || this.props.horario_rango === 'dia') {
               return
            }
                      
            if (this.state.opcionesObligatorias.length > 0) {

                 this.state.opcionesObligatorias.sort((a, b) => (a.Orden - b.Orden));

                for (var i = 0; i < this.state.opcionesObligatorias.length; i++) {

                    let e = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === this.state.opcionesObligatorias[i].IdTipoOpcion);

                    if (e === undefined) {
                        this.props.showMessage('Debes seleccionar ' + this.state.opcionesObligatorias[i].Nombre, true, 'Información');
                        return
                    }


                }
            }

            let descripcion =  this.props.opciones_producto.Nombre ;

            this.state.opcionesSeleccionadas.sort((a, b) => (a.orden - b.orden));

            for (var j = 0; j < this.state.opcionesSeleccionadas.length; j++) {

                descripcion += " / " + this.state.opcionesSeleccionadas[j].nombreTipo + " :" +
                    (this.state.opcionesSeleccionadas[j].cantidad !== 0 ? ` ${this.state.opcionesSeleccionadas[j].cantidad} `  : " ") +
                    this.state.opcionesSeleccionadas[j].nombre + 
                    (this.state.opcionesSeleccionadas[j].cantidad !== 0 ? ` $${(this.state.opcionesSeleccionadas[j].cantidad * this.state.opcionesSeleccionadas[j].precio)} ` : this.state.opcionesSeleccionadas[j].precio !== 0 ? ` $${this.state.opcionesSeleccionadas[j].precio} ` : "") +
                    (this.state.opcionesSeleccionadas[j].añadir !== "" ? ` Agregar a: ${this.state.opcionesSeleccionadas[j].añadir} ` : "")
            }


          
            let productoPedido = {
                Cantidad: this.state.cantidad,
                Descripcion: descripcion,
                Subtotal: this.state.total,
                IdPedido: 0,
                IdPedidoDetalle:0
            }

            this.props.asignar_cantidad_pedido((this.state.cantidad + this.props.cantidad_pedidos))
            this.props.asignar_total_pedido((this.state.total + this.props.total_pedido))
            this.props.limpiar_opciones_productos({ VistaProductoOpciones: [], VistaProductoOpcionesGroup: [] });
            await this.setState(this.baseState)
            this.props.agregar_pedido_general(productoPedido);
            this.props.ver_crear(false)
           
          
            
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

            GenerarPrecio();
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
                añadir: '',
                orden: opcion.ProductoTipoOpcion.Orden
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
          
            if (opcion.ProductoTipoOpcion.MostrarPartes) {

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

            GenerarPrecio();
        }

        const GenerarPrecio = async () => {
            let total = 0;

         

                if (this.state.opcionesSeleccionadas.length > 0) {

                    for (var i = 0; i < this.state.opcionesSeleccionadas.length; i++) {
                        let opcion = this.state.opcionesSeleccionadas[i];

                        if (opcion.idTipoSeleccion === 1) {
                            total = total + opcion.precio;

                        } else {
                            total = total + (opcion.precio * opcion.cantidad);
                        }

                       
                    }

                  await  this.setState({
                        total: (total * this.state.cantidad + (this.props.opciones_producto.EsVariable ? 0 : (this.props.opciones_producto.Precio * this.state.cantidad)) )
                    });
                } else {


                    await  this.setState({ total: 0 + (this.props.opciones_producto.EsVariable ? 0 : (this.props.opciones_producto.Precio * this.state.cantidad))});
                }

           

            
           
         
        }

        const CerrarModal = async (event) => {
            this.props.limpiar_opciones_productos({ VistaProductoOpciones: [], VistaProductoOpcionesGroup: [] });
            this.props.ver_crear(false)
        }

        return (
            <Modal
                show={this.props.show}
                onHide={(e) => CerrarModal(e)}
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
                                <div className="col-lg-6 col-12 col-description">
                                    <p>{this.props.opciones_producto.Descripcion}</p>
                                </div>
                            </div>
                            <div className="col-12 col-size  p-0 p-sm-0  scroll-content">
                                {this.props.opciones_producto.VistaProductoOpcionesGroup != null && this.props.opciones_producto.VistaProductoOpcionesGroup.length > 0 ?

                                    <Accordion defaultActiveKey="2">
                                    <ListGroup variant="flush" >
                                        {
                                         
                                            this.props.opciones_producto.VistaProductoOpcionesGroup.map(function (opciones, index, array) {                                             
                                                RdbtnSelec(opciones);
                                                return <Options.OptionItems opciones={opciones} index={index} AgregarAdicion={AgregarAdicion} HandleIncreChange={HandleIncreChange}   HandleRadioChange={HandleRadioChange} CambioSeleccion={CambioSeleccion} Deseleccionar={Deseleccionar} />

                                            })
                                        
                                        }



                                        </ListGroup>
                                    </Accordion>
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
                                        <a className="btn btn-default btn-3d-style  btn-block"  name="cant-menos" onClick={(e) =>  CantidadChange(e)} >
                                            <RemoveIcon />
                                        </a>
                                    </div>
                                    <div className="col-4 d-flex align-items-center mt-2 mb-2 justify-content-center ">
                                        <h2> {this.state.cantidad}</h2>
                                    </div>
                                    <div className="col-4 col-cantidad">
                                        <a className="btn btn-default btn-3d-style  btn-block"  name="cant-mas" onClick={(e) => CantidadChange(e)} >
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
    const { opciones_producto, id_producto_seleccionado, productos_pedido, total_pedido, cantidad_pedidos } = state.productoReducer;
    const { mostrar_opciones } = state.opcionesReducer;
    const {horario_rango } = state.horarioReducer;
    return { productos_pedido, loggingIn, user, categorias, opciones_producto, id_producto_seleccionado,horario_rango, mostrar_opciones, total_pedido, cantidad_pedidos};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_crear: productoActions.ver_crear,
    ver_opciones: opcionActions.ver_opciones,
    producto_seleccionado: productoActions.producto_seleccionado,
    agregar_pedido_general: productoActions.agregar_pedido_general,
    ver_car: productoActions.ver_car,
    limpiar_opciones_productos: productoActions.limpiar_opciones_productos,
    asignar_cantidad_pedido: productoActions.asignar_cantidad_pedido,
    asignar_total_pedido: productoActions.asignar_total_pedido
    
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductoModal));