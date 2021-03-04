import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { categoriaActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';


class CrearCategoria extends Component {

    idRef =  React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            categoria: {
                Nombre: '',
            }
        };
        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
    }

    InputChange(e) {
        const { name, value } = e.target;
        const { categoria } = this.state;
        this.setState({
            categoria: {
                ...categoria,
                [name]: value
            }
        });
    }

   


    CreateSubmit(e) {
        e.preventDefault();
         const { 
             categoria
         } = this.state;


        if (!categoria.Nombre) {
            this.props.showMessage('Debes ingresar un Nombre.', true, 'Información');
            return;
        } 

        loader.show();
        this.props.crear_categoria(categoria, this);

    }




    render() {
        const { categoria } = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Usuario
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubmit} >
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={categoria.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
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
    const { mostrar_crear } = state.categoriaReducer;
    return {  mostrar_crear};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: categoriaActions.ver_crear,
    obtener_categorias: categoriaActions.obtener_categorias,
    crear_categoria: categoriaActions.crear_categoria
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearCategoria));