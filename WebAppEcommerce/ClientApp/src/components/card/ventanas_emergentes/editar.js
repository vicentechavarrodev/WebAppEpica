import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { cardActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { log } from 'util';


class EditarCard extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            card: {
                Titulo: '',
                Descripcion: '',
                Enlace: ''
            }
        };

        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);

    }

    InputChange(e) {
        const { name, value } = e.target;
        const { card } = this.state;
        this.setState({
            card: {
                ...card,
                [name]: value
            }
        });
    }


    componentDidMount() {

        this.props.cargar_editar(this.props.id_card_seleccionada, this);
     
    }

    EditSubmit(e) {
        e.preventDefault();
        const {
            card
        } = this.state;


        if (!card.Titulo) {
            this.props.showMessage('Debes ingresar un Titulo.', true, 'Información');
            return;
        }
        else if (!card.Descripcion) {
            this.props.showMessage('Debes ingresar una Descripcion.', true, 'Información');
            return;
        }
        else if (!card.Enlace) {
            this.props.showMessage('Debes ingresar un Enlace.', true, 'Información');
            return;
        }


        loader.show();
        this.props.editar_card(card, this);


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
                        Editar Card
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditSubmit} >

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Titulo" value={this.state.card.Titulo} className="pz-input" onChange={this.InputChange} placeholder="Titulo" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" rows={3} as="textarea" name="Descripcion" value={this.state.card.Descripcion} className="pz-input" onChange={this.InputChange} placeholder="Descripcion" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Enlace" value={this.state.card.Enlace} className="pz-input" onChange={this.InputChange} placeholder="Enlace" />
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
    const { mostrar_editar, init_editar, card_actualizada, id_card_seleccionada } = state.cardReducer;
    return { mostrar_editar, init_editar, card_actualizada, id_card_seleccionada };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_cards: cardActions.obtener_cards,
    cargar_editar: cardActions.cargar_editar,
    editar_card: cardActions.editar_card,
    ver_editar: cardActions.ver_editar,
    card_seleccionada: cardActions.card_seleccionada



};

//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarCard));