import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { productoActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, Group } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';





class DetalleProducto extends Component {

    grid = React.createRef();

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



        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);




    }



    componentDidMount() {
        loader.hide();
      
        this.props.obtener_opciones_producto(this.props.location.IdProducto);

    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre ")
    }

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnNuevo") {

            this.props.ver_crear(true);

        } else if (e.currentTarget.id === "btnEditar") {
            if (this.props.id_opcion_producto_seleccionado !== 0) {
                this.props.ver_editar(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizar") {
            loader.show();
            this.props.obtener_opciones();
        }
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }

    rowSelected(e) {
        if (this.grid) {
            let opcion = this.grid.current.getSelectedRecords();
            console.log(opcion);
            this.props.opcion_producto_seleccionado(opcion[0].IdOpcion);
        }
    }

    rowDeselected(e) {
        if (this.grid) {
            this.props.opcion_producto_seleccionado(0);
        }
    }

    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }


    render() {
        const { opciones_producto } = this.props;


        return (
            <div>
                <nav id="nav" className="nav-form navbar bg-light ">
                    <div className="row col-12" >

                        <div className=" col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center" >
                            <h3>{opciones_producto.Nombre}</h3>
                        </div>
                    </div>



                </nav>

                <div className='wrap-form table-responsive container-fluid'>
                    <img Id="image-preview" src={`${process.env.REACT_APP_API_URL}app-images/${opciones_producto.UrlImagen}`} alt="Imagen" />
                    <div className=" col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center" >
                        <h3>Opciones</h3>
                    </div>
                    <GridComponent dataSource={opciones_producto.VistaProductoOpciones} ref={this.grid} allowGrouping={true} groupSettings={this.groupOptions} rowDeselected={this.rowDeselected} rowSelected={this.rowSelected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field='Opcion.NombreAlias' width='200' headerText='Nombre' />
                            <ColumnDirective field='Opcion.TipoOpcion.Nombre' width='200' headerText='Tipo' />
                            <ColumnDirective field='Opcion.Precio' width='200' headerText='Precio' />
                        </ColumnsDirective>
                        <Inject services={[Search, Toolbar, Group]} />
                    </GridComponent>
                </div>
               
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { opciones_producto, id_producto_seleccionado, id_opcion_producto_seleccionado } = state.productoReducer;
    return { opciones_producto, id_producto_seleccionado, id_opcion_producto_seleccionado};
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    opcion_producto_seleccionado: productoActions.opcion_producto_seleccionado,
    

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetalleProducto));