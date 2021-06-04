import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { Modal, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { pedidosActions } from './actions';


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

    async CreateSubmit(e) {
        e.preventDefault();
        loader.show();
        if (this.props.pedido.IdEstado !== 0 && this.props.pedido.IdEstado !== this.state.pedido.IdEstado) {
            await this.props.cambiar_estado(this.props.pedido.IdPedido, this.state.pedido.IdEstado, this.state.pedido.IdEstado, this)
            
        }
    }

    enviarMensaje(idEstado) {
        const urlDesktop = 'https://web.whatsapp.com/';
        let pedidoCompleto = "";

        this.props.pedido.PedidoDetalles.map((item, index) => {
            pedidoCompleto = pedidoCompleto + item.Cantidad + "  " + item.Descripcion + "= $" + item.Subtotal + (index !== (this.props.pedido.PedidoDetalles.length - 1) ? "%0A" : ("%0A y su estado es " + this.obtenerEstado(idEstado) ))
        },this)

        let mensaje = `send?phone=${"57" + this.props.pedido.Telefono}&text=Hola, ${this.props.pedido.Solicitante}%0ASomos Epica 🍕, te contamos que tu pedido de: %0A${pedidoCompleto}%0ADomicilio: $ ${this.props.total_domicilio}%0ATotal: $ ${this.props.pedido.TotalPedido}%0A🚚 Gracias por confiar en nosotros 😀`

        let w = 900;
        let h = 600;
        var left = (window.innerWidth / 2) - (w / 2);
        var top = (window.innerHeight / 2) - (h / 2);

        window.open(urlDesktop + mensaje, "Mensajeria", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    
      
    }

    obtenerEstado(idEstado) {
        if (idEstado === 1) {
            return "*PENDIENTE*"
        } else if (idEstado === 2) {
            return "*RECIBIDO*"
        } else if (idEstado === 3) {
            return "*ENVIADO*"
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
                onHide={(e) => this.props.mostrar_detalle_pedido(false)}
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
                        <ListGroup.Item className="p-0 text-center">
                            <Form.Group as={Row} >
                                <Form.Label column sm="6">
                                    Comentario:
                            </Form.Label>
                                <Col sm="6" className="p-0 text-center" >
                                    <Form.Control className="text-center" plaintext readOnly defaultValue={this.props.pedido.Comentario} />

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
                            <div className="container content-pedido-detalle">
                                {
                                    this.props.pedido.PedidoDetalles.map((item, index) => {
                                        return <div className="row" id={index} key={index}>
                                            <div className="col-2 col-amount-pedido">
                                                {item.Cantidad}
                                            </div>
                                            <div className="col-8 col-description-pedido">
                                                {item.Descripcion}
                                            </div>
                                            <div className="col-2 col-price-pedido">
                                                {item.Subtotal}
                                            </div>
                                            
                                        </div>
                                    })
                                }


                            </div>

                   
                        </ListGroup.Item>
                        <ListGroup.Item className="p-0 text-center">
                            <Form.Group as={Row} >
                                <Form.Label column sm="6" className="text-danger font-weight-bold">
                                    Total:
                            </Form.Label>
                                <Col sm="6"  >
                                    <Form.Control className="text-center text-danger " plaintext readOnly value={this.props.pedido.TotalPedido} />

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
    const { total_domicilio } = state.productoReducer;
    const { mostrar_detalle, pedido, id_pedido_seleccionado, pendientes, recibidos, enviados } = state.pedidosReducer;
    return { mostrar_detalle, pedido, id_pedido_seleccionado, pendientes, recibidos, enviados, total_domicilio };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    mostrar_detalle_pedido: pedidosActions.mostrar_detalle_pedido,
    obtener_pedido: pedidosActions.obtener_pedido,
    cambiar_estado: pedidosActions.cambiar_estado,
    obtener_pedidos: pedidosActions.obtener_pedidos,
    cambiar_estado_pendiente: pedidosActions.cambiar_estado_pendiente,
    cambiar_estado_recibido: pedidosActions.cambiar_estado_recibido,
    cambiar_estado_enviado: pedidosActions.cambiar_estado_enviado,
   
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detalle));