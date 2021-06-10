import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { productoActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, Group } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import SeleccionarOpcion from './ventanas_emergentes/seleccionar_opcion';
import AgregarOpcion from './ventanas_emergentes/agregar_tipo_opcion';
import EditarTipoOpcion from './ventanas_emergentes/editar_tipo_opcion';
import CrearOpcionSecundaria from './ventanas_emergentes/crear_opcion_secundaria';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import EditIcon from '@material-ui/icons/Edit';
import { Modal, Form, Col, Row, Container} from 'react-bootstrap';

class DetalleProducto extends Component {

    grid = React.createRef();
    details = React.createRef();
    detailsOp = React.createRef();

    constructor(props) {
        super(props);

        this.searchOptions = {
            fields: ['Nombre'],
            operator: 'contains'
        };

        this.groupOptions = {
            columns: ['Opcion.TipoOpcion.Nombre'],
            showDropArea: false

        };

        this.state = {
            IdProductoTipoOpcion: 0,
            IdProductoOpcion:0
        };



        this.toolbarOptions = ['Search'];
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);
        this.templateTipOpcion = this.gridTemplateTipoOpcion.bind(this);  
        this.ItemTipoOpcion = this.ItemTipoOpcion.bind(this);
        this.ItemOpcion = this.ItemOpcion.bind(this);
        this.templateOpcion = this.gridTemplateOpcion.bind(this);  
        this.templateSecundaria = this.gridTemplateSecundaria.bind(this);   
        this.dataBound = this.dataBound.bind(this);
        
    }



    componentDidMount() {
        loader.hide();
      
        this.props.obtener_opciones_producto(this.props.location.IdProducto, false, this);
        this.props.obtener_tipo_opciones_producto_agregadas(this.props.location.IdProducto,  this);

    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre ")
    }

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnNuevo") {

            this.props.ver_seleccionar_opcion(true);

        } else if (e.currentTarget.id === "btnEliminar") {
            loader.show();
            this.props.eliminar_opcion_producto(this.props.id_opcion_producto_seleccionado, this.props.location.IdProducto, this);
        } else if (e.currentTarget.id === "btnAtras") {
            this.props.history.goBack();
        } else if (e.currentTarget.id === "btnAgregar") {
            this.props.mostrar_agregar(true);
            
        }

        



            
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }



   
   

    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }

    dataBound(e) {

        this.grid.current.groupModule.collapseAll();

    }

    gridTemplateSecundaria(props) {


     
     
        
        return (
            <Container fluid="md" >
                <Row>
                    {
                       
                        props.MuestraSecundario ?
                            <p>{props.ProductoOpcionTipoOpciones[0].ProductoTipoOpcion.TipoOpcion.Nombre} </p>
                            :""
                    }
                </Row>
            </Container>

        );

    }
    

    gridTemplateOpcion(props) {
       
        return (
            <Container fluid="md" >
                <Row>
                    <Col className="mt-1">
                        <button id={props.IdProductoOpciones} ref={this.detailsOp} onClick={this.ItemOpcion} name="btnEliminar" className="btn btn-default btn-3d-style  "> <DeleteIcon /> </button>
                    </Col>
                    <Col className="mt-1">
                        <button id={props.IdProductoOpciones} ref={this.detailsOp} onClick={this.ItemOpcion} name="btnEditar" className="btn btn-default btn-3d-style  "> <EditIcon /> </button>
                    </Col>
                </Row>
            </Container>

        );

    }


    gridTemplateTipoOpcion(props) {
      
        return (
            <Container fluid="md" >
            <Row>
                 <Col className="mt-1">
                        <button  id={props.IdProductoTipoOpcion} ref={this.details} onClick={this.ItemTipoOpcion} name="btnEliminar" className="btn btn-default btn-3d-style  "> <DeleteIcon /> </button>
                </Col>
                    <Col className="mt-1">
                        <button  id={props.IdProductoTipoOpcion} ref={this.details} onClick={this.ItemTipoOpcion} name="btnEditar" className="btn btn-default btn-3d-style  "> <EditIcon /> </button>
                </Col>
          </Row>
            </Container>

        );

    }

    ItemTipoOpcion(e) {


      
        if (e.currentTarget.name === "btnEditar") {

            this.props.ver_editar_tipo_opcion(true);
            this.setState({ IdProductoTipoOpcion: e.currentTarget.id})

        } else if (e.currentTarget.name === "btnEliminar") {
            this.props.eliminar_tipo_opcion_producto(e.currentTarget.id, this.props.location.IdProducto, this);
        }

      



    }

    ItemOpcion(e) {

      
      
        if (e.currentTarget.name === "btnEditar") {
            this.setState({ IdProductoOpcion: e.currentTarget.id })
            this.props.ver_crear_opcion_secundaria(true);
           

        } else if (e.currentTarget.name === "btnEliminar") {
          
            this.props.eliminar_opcion_producto(e.currentTarget.id, this.props.location.IdProducto, this);
           
        }

    }


    render() {
        const { opciones_producto, mostrar_seleccion_opcion, mostrar_agregar_tipo_opcion, mostrar_editar_tipo_opcion, mostrar_crear_opcion_secundaria} = this.props;


        return (
            <div>
                <nav id="nav" className="nav-form navbar bg-light ">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-12 mt-3 col-lg-12 d-flex justify-content-center align-items-center" >
                            <h3>{opciones_producto.Nombre}</h3>
                        </div>
                    </div>

                    

                </nav>

                <div className='wrap-form '>
                    <img Id="image-preview" src={`${process.env.REACT_APP_API_URL}app-images/${opciones_producto.UrlImagen}`} alt="Imagen" />
                    <div className="row col-12" >
                        <div className=" col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center">
                            
                        </div>
                      
                        <div className=" col-sm-12 mb-2 col-md-6 col-lg-6  d-flex justify-content-end" >
                            <button id="btnAgregar" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style-pz ml-1">
                                <div>
                                    <FormatAlignCenterIcon />
                                </div>
                            </button>
                            <button id="btnNuevo" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style-pz ml-1">
                                <div>
                                    <FormatListBulletedIcon />
                                </div>
                            </button>
                            <button id="btnAtras" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style-pz ml-1">
                                <div>
                                    <ArrowBackIcon />
                                </div>
                            </button>
                        </div>
                    </div>

                    <Form.Row sm={10} className="p-1 align-items-center justify-content-center font-weight-bold">
                        <h4 className="font-weight-bold" >Opciones</h4>
                    </Form.Row>
                    <Form.Row sm={10}>

                        <div className=' table-responsive container-fluid'>
                            <GridComponent dataSource={this.props.productos_tipo_opciones_agregadas} dataBound={this.dataBound}    >
                                    <ColumnsDirective>
                                        <ColumnDirective field='TipoOpcion.Nombre' width='200' headerText='Tipo' />
                                        <ColumnDirective field='Encabezado' width='200' headerText='Encabezado' />
                                        <ColumnDirective field='MostrarInicio' width='200' headerText='MostrarInicio' />
                                        <ColumnDirective width='80' template={this.templateTipOpcion}  />
                                    </ColumnsDirective>
                                    <Inject/>
                            </GridComponent>
                        </div>
                    </Form.Row>
                    <Form.Row sm={10} className="p-1 m-2 align-items-center justify-content-center font-weight-bold">
                        <h4 className="font-weight-bold">Grupo de opciones</h4>
                    </Form.Row>
                    <Form.Row sm={10}>
                        <div className=' table-responsive container-fluid'>
                            <GridComponent dataSource={opciones_producto.VistaProductoOpciones} dataBound={this.dataBound} ref={this.grid} allowGrouping={true} groupSettings={this.groupOptions} rowDeselected={this.rowDeselected} rowSelected={this.rowSelected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                            <ColumnsDirective>
                                <ColumnDirective field='Opcion.NombreAlias' width='200' headerText='Nombre' />
                                <ColumnDirective field='Opcion.TipoOpcion.Nombre' width='200' headerText='Tipo' />
                                    <ColumnDirective field='Opcion.Precio' width='200' headerText='Precio' />
                                    <ColumnDirective width='100' template={this.templateSecundaria} headerText='Muestra' />
                                    <ColumnDirective width='80' template={this.templateOpcion} />
                            </ColumnsDirective>
                            <Inject services={[Search, Toolbar, Group]} />
                            </GridComponent>
                        </div>
                    </Form.Row>

                   
                </div>

                {mostrar_seleccion_opcion ?
                    <SeleccionarOpcion
                        show={mostrar_seleccion_opcion}
                        onHide={() => this.props.ver_seleccionar_opcion(false)}
                    /> : " "


                }
                {mostrar_agregar_tipo_opcion ?
                    <AgregarOpcion
                        IdProducto = { this.props.location.IdProducto}
                        show={mostrar_agregar_tipo_opcion}
                        onHide={() => this.props.mostrar_agregar(false)}
                    /> : " "


                }

                {mostrar_editar_tipo_opcion   ?
                    <EditarTipoOpcion
                        IdProductoTipoOpcion={this.state.IdProductoTipoOpcion}
                        show={mostrar_editar_tipo_opcion}
                        onHide={() => this.props.ver_editar_tipo_opcion(false)}
                    /> : " "


                }

                {this.props.mostrar_crear_opcion_secundaria ?
                    <CrearOpcionSecundaria
                        IdProductoOpcion={this.state.IdProductoOpcion}
                        IdProducto={this.props.location.IdProducto}
                        show={mostrar_crear_opcion_secundaria}
                        onHide={() => this.props.ver_crear_opcion_secundaria(false)}
                    /> : " "


                }

                {mostrar_agregar_tipo_opcion ?
                    <AgregarOpcion
                        IdProducto={this.props.location.IdProducto}
                        show={mostrar_agregar_tipo_opcion}
                        onHide={() => this.props.mostrar_agregar(false)}
                    /> : " "


                }

               

          


                

                
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { opciones_producto, id_producto_seleccionado, id_opcion_producto_seleccionado, mostrar_seleccion_opcion, opcion_producto_eliminada, mostrar_agregar_tipo_opcion, productos_tipo_opciones_agregadas, mostrar_editar_tipo_opcion, mostrar_crear_opcion_secundaria} = state.productoReducer;
    return { opciones_producto, id_producto_seleccionado, id_opcion_producto_seleccionado, mostrar_seleccion_opcion, opcion_producto_eliminada, mostrar_agregar_tipo_opcion, productos_tipo_opciones_agregadas, mostrar_editar_tipo_opcion, mostrar_crear_opcion_secundaria};
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    opcion_producto_seleccionado: productoActions.opcion_producto_seleccionado,
    ver_seleccionar_opcion: productoActions.ver_seleccionar_opcion,
    mostrar_agregar: productoActions.mostrar_agregar,
    eliminar_opcion_producto: productoActions.eliminar_opcion_producto,
    obtener_tipo_opciones_producto_agregadas: productoActions.obtener_tipo_opciones_producto_agregadas,
    eliminar_tipo_opcion_producto: productoActions.eliminar_tipo_opcion_producto,
    ver_editar_tipo_opcion: productoActions.ver_editar_tipo_opcion,
    ver_crear_opcion_secundaria: productoActions.ver_crear_opcion_secundaria

    


}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetalleProducto));