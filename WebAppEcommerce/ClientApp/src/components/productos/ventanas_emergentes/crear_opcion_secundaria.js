import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { productoActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';


class CrearOpcionSecundaria extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            vista: {
                IdProductoOpciones: 0 ,
                IdProductoTipoOpcionSecundaria: 0,
                MuestraSecundario: false,
                CambiaPrecio: false,
                IdProductoTipoOpcion:0,
                ProductoTipoOpciones: [],
                Precio:0
            }
        };

        this.fields = { text: 'TipoOpcion.Nombre', value: 'IdProductoTipoOpcion' };
        this.InputChange = this.InputChange.bind(this);
        this.CrearSubmit = this.CrearSubmit.bind(this);
    }

    InputChange(e) {

        const { name, value } = e.target;
        const { vista } = this.state;
        this.setState({
            vista: {
                ...vista,
                [name]: value
            }
        });

        console.log(e)

        
       
    }



    async componentDidMount() {
        loader.show();
        await this.props.init_crear_opcion_secundaria(this.props.IdProductoOpcion, this);
        const { vista } = this.state;
        this.setState({vista: {...vista, IdProductoOpciones: this.props.IdProductoOpcion}});
    }



    




    CrearSubmit(e) {
        e.preventDefault();
        const {
            vista,
        } = this.state;

     
        if (vista.IdProductoTipoOpcion === 0) {
            this.props.showMessage('Debes seleccionar un tipo de opción.', true, 'Información');
            return;
        } else if (vista.IdProductoOpciones === 0) {
            this.props.showMessage('Debes seleccionar una opción.', true, 'Información');
        }

        console.log(this.state.vista);

        this.props.crear_opcion_secundaria(vista, this.props.IdProducto, this);


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
                       Agregar tipo opción secundaria
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CrearSubmit} >

                        <Form.Row sm={12}>

                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='Mostrar grupo de opciones secundario' checked={this.state.vista.MuestraSecundario} change={(val) => { this.InputChange({ target: { name: 'MuestraSecundario', value: val.checked } }); }} />
                            </Form.Group>

                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='Cambiar el precio de otro grupo de opciones ' checked={this.state.vista.CambiaPrecio} change={(val) => { this.InputChange({ target: { name: 'CambiaPrecio', value: val.checked } }); }} />
                            </Form.Group>

                        </Form.Row>

                        {
                            this.state.vista.MuestraSecundario &&  this.state.vista.ProductoTipoOpciones.length > 0 ?
                                <Form.Row sm={10}>
                                    <Form.Group as={Col} >
                                        <ComboBoxComponent name="IdProductoTipoOpcion" showClearButton={false} value={this.state.vista.IdProductoTipoOpcionSecundaria} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdProductoTipoOpcionSecundaria', value: val.value } }); }} allowFiltering={true} placeholder="Opción secundaría" className="pz-input" dataSource={this.state.vista.ProductoTipoOpciones} />
                                    </Form.Group>
                                </Form.Row>
                                : ""
                        }

                        {
                            this.state.vista.CambiaPrecio && this.state.vista.ProductoTipoOpciones.length > 0 ?
                                <Form.Row sm={10}>
                                    <Form.Group as={Col} >
                                        <ComboBoxComponent name="IdProductoTipoOpcion" showClearButton={false} value={this.state.vista.IdProductoTipoOpcion} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdProductoTipoOpcion', value: val.value } }); }} allowFiltering={true} placeholder="Grupo de opciones" className="pz-input" dataSource={this.state.vista.ProductoTipoOpciones.filter(e => e.IdTipoSeleccion === 1)} />
                                    </Form.Group>
                                    <Form.Group as={Col} >

                                        <div className="input-group-prepend">
                                            <span className="input-group-text">$</span>
                                            <Form.Control type="number" name="Precio" value={this.state.vista.Precio}
                                                onChange={this.InputChange}
                                                className="pz-input" placeholder="Nuevo Precio" />
                                        </div>

                                    </Form.Group>
                                </Form.Row>


                                : ""
                        }

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
    const { mostrar_editar_tipo_opcion, tipos_opciones_producto, opcion_secundaria } = state.productoReducer;
    return { mostrar_editar_tipo_opcion, tipos_opciones_producto, opcion_secundaria };
};


const mapDispatchToProps = {

   
    showMessage: alertActions.showMessage,
    crear_opcion_secundaria: productoActions.crear_opcion_secundaria,
    init_crear_opcion_secundaria: productoActions.init_crear_opcion_secundaria,
    ver_crear_opcion_secundaria: productoActions.ver_crear_opcion_secundaria,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    
    

};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearOpcionSecundaria));