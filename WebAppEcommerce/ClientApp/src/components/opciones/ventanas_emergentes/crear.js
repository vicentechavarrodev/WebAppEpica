import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { opcionActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import opciones from '..';


class CrearOpcion extends Component {

    NombreRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            opcion: {
                Nombre: '',
                NombreAlias: '',
                Precio: 0,
                IdTipoOpcion: 0,

            },
            esVisibleOpcion:'element-hide'
        };
        this.fields = { text: 'Nombre', value: 'IdTipoOpcion' };
        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
        this.GenerarNombreAlias = this.GenerarNombreAlias.bind(this);

        
    }

    InputChange(e) {

        const mostrarPrecio = (name, TienePrecio) => (name === 'IdTipoOpcion') ? (TienePrecio ? 'element-show' : 'element-hide') : this.state.esVisibleOpcion;
        
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
                Precio: name === 'Precio' ? value : precio
               
            },
            
            esVisibleOpcion: mostrarPrecio(name,TienePrecio)
        });
}



    componentDidMount() {

        this.props.cargar_crear();

    }

   


    CreateSubmit(e) {
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
        } else if (opcion.Precio === '' || opcion.Precio < 0  ) {
            this.props.showMessage('Debes ingresar un Precio.', true, 'Información');
            return;
        } else if (opcion.IdTipoOpcion === 0) {
            this.props.showMessage('Debes seleccionar un tipo de opción.', true, 'Información');
            return;
        }

        loader.show();
        this.props.crear_opcion(opcion, this);

    }

    GenerarNombreAlias(e) {
        const { opcion } = this.state;
        let NombreAlias = this.NombreRef.current.value.trim();
       

        this.setState({
            opcion: {
                ...opcion,
                NombreAlias
            }
        });

    }




    render() {
        const { opcion } = this.state;
        //className={this.state.esVisibleOpcion}
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Opción
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubmit} >

                      


                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={opcion.Nombre} maxLength={15} ref={this.NombreRef} onBlur={this.GenerarNombreAlias} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="NombreAlias" value={opcion.NombreAlias} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Alias" />
                            </Form.Group>
                        </Form.Row>
                    
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <ComboBoxComponent name="IdTipoOpcion" nueo={opcion.Precio} showClearButton={false} value={opciones.IdTipoOpcion} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdTipoOpcion', value: val.value, TienePrecio: val.itemData.TienePrecio } }); }} allowFiltering={true} placeholder="Opciones" className="pz-input" dataSource={this.props.init_crear.TipoOpciones} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}  >
                            <Form.Group as={Col} >
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                    <Form.Control type="number" name="Precio" value={opcion.Precio}

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
                                <button type="button"  onClick={this.props.onHide} className="btn btn-default-pz btn-3d-style  btn-block">Cancelar </button>
                            </Form.Group>
                        </Form.Row>
                      
                        </Form>
                </Modal.Body>
               
            </Modal>

        );
    }
}




function mapStateToProps(state) {
    const { mostrar_crear, init_crear } = state.opcionesReducer;
    return { mostrar_crear, init_crear};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: opcionActions.ver_crear,
    cargar_crear: opcionActions.cargar_crear,
    obtener_opciones: opcionActions.obtener_opciones,
    crear_opcion: opcionActions.crear_opcion
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearOpcion));