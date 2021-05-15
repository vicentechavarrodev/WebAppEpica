import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { opcionActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { log } from 'util';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

class EditarOpcion extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            opcion: {
                Nombre: '',
                NombreAlias: '',
                Precio: 0,
                IdTipoOpcion: 0,
             

            },
            esVisibleOpcion1: ''
        };

        this.fields = { text: 'Nombre', value: 'IdTipoOpcion' };

        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);
      
    }

    InputChange(e) {

        const mostrarPrecio = (name, TienePrecio) => (name === 'IdTipoOpcion') ? (TienePrecio ? 'element-show' : 'element-hide') : this.state.esVisibleOpcion1;

        const { name, value, TienePrecio } = e.target;
        let precio;
        if ((name === 'IdTipoOpcion') && !TienePrecio) {
            precio = 0;
        }

       

        const { opcion } = this.state;
        this.setState({
            opcion: {
                ...opcion,
                [name]: value,
                //Precio: name === 'Precio' ? value : precio

            },

            esVisibleOpcion1: mostrarPrecio(name, TienePrecio)
        });
    }


    async componentDidMount() {
      
      await  this.props.cargar_editar(this.props.id_opcion_seleccionada, this);
        
    }

    EditSubmit(e) {
        e.preventDefault();
        const {
            opcion
        } = this.state;


        if (!opcion.Nombre) {
            this.props.showMessage('Debes ingresar un Nombre.', true, 'Información');
            return;
        } else if (!opcion.NombreAlias) {
            this.props.showMessage('Debes ingresar un Nombre Alias.', true, 'Información');
            return;
        } else if (opcion.Precio === '' || opcion.Precio < 0) {
            this.props.showMessage('Debes ingresar un Precio.', true, 'Información');
            return;
        } else if (opcion.IdTipoOpcion === 0) {
            this.props.showMessage('Debes seleccionar un tipo de opción.', true, 'Información');
            return;
        }

       
        loader.show();
        this.props.editar_opcion(opcion, this);


    }




    render() {

        console.log(this.state.opcion)
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Usuario
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditSubmit} >
                       
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={this.state.opcion.Nombre} maxLength={100} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="NombreAlias" value={this.state.opcion.NombreAlias} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <ComboBoxComponent name="IdTipoOpcion" showClearButton={false} value={this.state.opcion.IdTipoOpcion} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdTipoOpcion', value: val.value, TienePrecio: val.itemData.TienePrecio } }); }} allowFiltering={true} placeholder="Opciones" className="pz-input" dataSource={this.props.init_editar.TipoOpciones} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}  >
                            <Form.Group as={Col} >
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                    <Form.Control type="number" name="Precio" value={this.state.opcion.Precio}

                                        onChange={this.InputChange}
                                        className="pz-input" placeholder="Precio" />
                                </div>
                            </Form.Group>
                        </Form.Row>
                    
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <button type="submit" className="btn btn-default-pz btn-3d-style  btn-block">Grabar </button>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <button type="button" onClick={this.props.onHide} className="btn btn-default-pz btn-3d-style  btn-block">Cancelar </button>
                            </Form.Group>
                        </Form.Row>

                    </Form>
                </Modal.Body>

            </Modal>

        );
    }
}


//-------------------------------Redux Event------------------------

function mapStateToProps(state) {
    const { mostrar_editar, init_editar, opcion_actualizada, id_opcion_seleccionada } = state.opcionesReducer;
    return { mostrar_editar, init_editar, opcion_actualizada, id_opcion_seleccionada };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_opciones: opcionActions.obtener_opciones,
    cargar_editar: opcionActions.cargar_editar,
    editar_opcion: opcionActions.editar_opcion,
    ver_editar: opcionActions.ver_editar,
    opcion_seleccionada: opcionActions.opcion_seleccionada

    

};

//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarOpcion));