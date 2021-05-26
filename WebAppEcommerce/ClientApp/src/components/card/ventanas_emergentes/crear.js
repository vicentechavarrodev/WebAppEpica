import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { cardActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';


class CrearCard extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            card: {
                Titulo: '',
                Descripcion: '',
                Enlace:''
            }
        };
        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
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




    CreateSubmit(e) {
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
        this.props.crear_card(card, this);

    }




    render() {
        const { card } = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Card
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubmit} >
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Titulo" value={card.Titulo} className="pz-input" onChange={this.InputChange} placeholder="Titulo" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" as="textarea" name="Descripcion" rows={3} value={card.Descripcion} className="pz-input" onChange={this.InputChange} placeholder="Descripcion" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Enlace" value={card.Enlace}  className="pz-input" onChange={this.InputChange} placeholder="Enlace" />
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




function mapStateToProps(state) {
    const { mostrar_crear } = state.cardReducer;
    return { mostrar_crear };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: cardActions.ver_crear,
    obtener_cards: cardActions.obtener_cards,
    crear_card: cardActions.crear_card
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearCard));