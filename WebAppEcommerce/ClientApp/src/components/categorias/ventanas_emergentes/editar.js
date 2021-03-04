import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { categoriaActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { log } from 'util';


class EditarUsuario extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            categoria: {
                IdCategoria: 0,
                Nombre: '',

            }
        };

        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);
      
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


    componentDidMount() {
       
        this.props.cargar_editar(this.props.id_categoria_seleccionada, this);
        
    }

    EditSubmit(e) {
        e.preventDefault();
        const {
            categoria
        } = this.state;


        if (!categoria.Nombre) {
            this.props.showMessage('Debes ingresar un nombre.', true, 'Información');
            return;
        } 


        loader.show();
        this.props.editar_categoria(categoria, this);


    }




    render() {
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
                                <Form.Control type="text" name="Nombre" value={this.state.categoria.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
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
    const { mostrar_editar,  init_editar, categoria_actualizada, id_categoria_seleccionada } = state.categoriaReducer;
    return { mostrar_editar,  init_editar, categoria_actualizada, id_categoria_seleccionada };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_categorias: categoriaActions.obtener_categorias,
    cargar_editar: categoriaActions.cargar_editar,
    editar_categoria: categoriaActions.editar_categoria,
    ver_editar: categoriaActions.ver_editar,
    categoria_seleccionada: categoriaActions.categoria_seleccionada

    

};

//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarUsuario));