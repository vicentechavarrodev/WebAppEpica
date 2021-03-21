import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../../alerts_message/actions';
import { productoActions } from '../actions';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import RoomIcon from '@material-ui/icons/Room';
import { loader } from '../../helpers/loader';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, Group } from '@syncfusion/ej2-react-grids';

class SeleccionarOpcion extends Component {

    grid = React.createRef();

    state = {
        selected: false,
        opcionesSeleccionada: [],
    }

    constructor(props) {
        super(props);

        this.searchOptions = {
            fields: ['NombreAlias'],
            operator: 'contains'
        };
        this.groupOptions = {
            columns: ['TipoOpcion.Nombre'],
            showDropArea: false


        };

        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);

        this.dataBound = this.dataBound.bind(this);

        this.grabar = this.grabar.bind(this);
        
    }

    grabar(e) {
        loader.show();
        if (this.state.opcionesSeleccionada.length > 0) {
            this.props.crear_opciones_producto(this.props.location.IdProducto, this.state.opcionesSeleccionada,this);
        } else {
            this.props.showMessage('Debes seleccionar al menos una opción para poder grabar.', true, 'Información');
            return;
        }

       
    }




    filterTemplate() {

        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }




    componentDidMount() {
        loader.show();
      
        this.props.obtener_opciones_seleccion(this.props.location.IdProducto);
       

    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre ")
    } 

    rowSelected(e) {
        if (this.grid) {
            const selectedrecords = this.grid.current.getSelectedRecords();
            this.setState({ opcionesSeleccionada: selectedrecords });
        }
    }

    rowDeselected(e) {
        if (this.grid) {
            const selectedrecords = this.grid.current.getSelectedRecords();
            this.setState({ opcionesSeleccionada: selectedrecords });
        }
    }

    dataBound(e) {
       
        this.grid.current.groupModule.collapseAll();
         
    }


    render() {


        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="mg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header  >
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        {this.props.nombreCategoria}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='wrap-form table-responsive container-fluid'>

                        <GridComponent dataSource={this.props.opciones_seleccion} ref={this.grid} rowSelected={this.rowSelected} rowDeselected={this.rowDeselected} allowGrouping={true} groupSettings={this.groupOptions} toolbar={this.toolbarOptions} searchSettings={this.searchOptions}  created={this.created.bind(this)} >
                            <ColumnsDirective>
                                <ColumnDirective type='checkbox' width='50' />
                                <ColumnDirective field='NombreAlias' width='200' headerText='Nombre' />
                                <ColumnDirective field='Precio' width='200' headerText='Precio' />
                                <ColumnDirective field='TipoOpcion.Nombre' width='200' headerText='Tipo' />
                            </ColumnsDirective>
                            <Inject services={[Search, Toolbar, Group]} />
                        </GridComponent>
                    </div>
                    <Form.Row sm={10}>
                        <Form.Group as={Col} >
                            <button  onClick={this.grabar} className="btn btn-default-pz btn-3d-style  btn-block">Grabar </button>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <button type="button" onClick={this.props.onHide} className="btn btn-default-pz btn-3d-style  btn-block">Cancelar </button>
                        </Form.Group>
                    </Form.Row>
                    
                </Modal.Body>

            </Modal>

        );
    }
}


function mapStateToProps(state) {
    const { mostrar_seleccion_opcion, opciones_seleccion} = state.productoReducer;
    return { mostrar_seleccion_opcion, opciones_seleccion };
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_opciones_seleccion: productoActions.obtener_opciones_seleccion,
    ver_seleccionar_opcion: productoActions.ver_seleccionar_opcion,
    crear_opciones_producto: productoActions.crear_opciones_producto,
    obtener_opciones_producto: productoActions.obtener_opciones_producto
    

    

};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SeleccionarOpcion));