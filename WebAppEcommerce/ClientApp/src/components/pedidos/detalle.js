import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { Modal, Form, Col, Row, ListGroup, Card } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { pedidosActions } from './actions';

import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, Page } from '@syncfusion/ej2-react-grids';

class Detalle extends Component {

    constructor(props) {
        super(props);



        this.state = {
            pedido: {
                IdEstado: 0
            },
         
        };

        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
        this.fields = { text: 'Nombre', value: 'IdEstado' };

    }

    CreateSubmit(e) {
        e.preventDefault();

        if (this.props.pedido.IdEstado !== 0 && this.props.pedido.IdEstado !== this.state.pedido.IdEstado) {

            this.props.cambiar_estado(this.props.pedido.IdPedido, this.state.pedido.IdEstado, this.props.IdEstado,this)
        }
    }


    componentDidMount() {
        this.props.obtener_pedido(this.props.id_pedido_seleccionado, this);
    }

    InputChange(e) {

        const { name, value } = e.target;
        const { pedido } = this.state;
        this.setState({
            pedido: {
                ...pedido,
                [name]: value
            }
        });
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
                        {this.props.pedido.Solicitante}
                </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card.Title>Descripción</Card.Title>
                    <Card.Text>
                        {this.props.pedido.Descripcion}
                     </Card.Text>

                    <ListGroup variant="flush">
                       
                   
                        <ListGroup.Item className="p-0 text-center">
                            <Form.Group as={Row} >
                                <Form.Label column sm="6">
                                    Telefono:
                            </Form.Label>
                                <Col sm="6"  >
                                    <Form.Control className="text-center" plaintext readOnly defaultValue={this.props.pedido.Telefono} />

                                </Col>
                            </Form.Group>
                        </ListGroup.Item>
                        <ListGroup.Item className="p-0 text-center">
                            <Form.Group as={Row} >
                                <Form.Label column sm="6">
                                    Dirección:
                            </Form.Label>
                                <Col sm="6" className="p-0 text-center" >
                                    <Form.Control className="text-center" plaintext readOnly defaultValue={this.props.pedido.Direccion} />

                                </Col>
                            </Form.Group>
                        </ListGroup.Item>


                        {
                            this.props.pedido.Estados1 ?
                                <ListGroup.Item>
                                    <Form.Row sm={10}>
                                        <Form.Group as={Col} >
                                            <ComboBoxComponent name="IdEstado" showClearButton={false} value={this.props.pedido.IdEstado} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdEstado', value: val.value } }); }} allowFiltering={true} placeholder="Estado" className="pz-input" dataSource={this.props.pedido.Estados1} />
                                        </Form.Group>
                                    </Form.Row>
                                </ListGroup.Item>
                                :""
                        }
                       
                        <ListGroup.Item>
                            <div className='table-responsive '>
                                <GridComponent dataSource={this.props.pedido.PedidoDetalles} ref={grid => this.grid = grid} allowPaging={true}  >
                                    <ColumnsDirective>
                                        <ColumnDirective field='Cantidad' width='50' headerText='Cant' />
                                        <ColumnDirective field='Descripcion' width='250' headerText='Descripción' />
                                        <ColumnDirective field='Subtotal' width='50' headerText='Subtotal' />
                                    </ColumnsDirective>
                                    <Inject services={[Search, Toolbar, Page]} />
                                </GridComponent>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="p-0 text-center">
                            <Form.Group as={Row} >
                                <Form.Label column sm="6" className="text-danger font-weight-bold">
                                    Total:
                            </Form.Label>
                                <Col sm="6"  >
                                    <Form.Control className="text-center text-danger " plaintext readOnly defaultValue={this.props.pedido.TotalPedido} />

                                </Col>
                            </Form.Group>
                        </ListGroup.Item>
                    </ListGroup>

                   

                    
                   
                   
                   
                </Modal.Body>
                <Modal.Footer>
                        <Form.Group as={Col} >
                        <button onClick={this.CreateSubmit} className="btn btn-default-pz btn-3d-style  btn-block">Grabar </button>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <button type="button" onClick={this.props.onHide} className="btn btn-default-pz btn-3d-style  btn-block">Cancelar </button>
                        </Form.Group>
                  
                </Modal.Footer>

            </Modal>

        );
    }
}




function mapStateToProps(state) {
    const { mostrar_detalle, pedido, id_pedido_seleccionado} = state.pedidosReducer;
    return { mostrar_detalle, pedido, id_pedido_seleccionado};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    mostrar_detalle_pedido: pedidosActions.mostrar_detalle_pedido,
    obtener_pedido: pedidosActions.obtener_pedido,
    cambiar_estado: pedidosActions.cambiar_estado,
    obtener_pedidos: pedidosActions.obtener_pedidos,
   
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detalle));