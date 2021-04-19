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


class EditarTipoOpcionProducto extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);



        this.state = {
            productoTipoOpcion: {
                IdProductoTipoOpcion:0,
                IdProducto: 0,
                Encabezado: '',
                IdTipoOpcion: 0,
                MostrarInicio: false,
                IdTipoSeleccion: 0,
                TipoOpciones: [],
                EsObligatoria: false,
                Orden: 0,
               
            },
            OrdenCombo: []
        };


        this.fields1 = { text: 'Nombre', value: 'IdTipoSeleccion' };
        this.fields = { text: 'Nombre', value: 'IdTipoOpcion' };
        this.fields2 = { text: 'Nombre', value: 'Orden' };

        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);

    }

    async agregarOrden() {
        let cantidadOrden = [];


        if (this.props.productos_tipo_opciones_agregadas.length > 0) {
            for (var i = 0; i < this.props.productos_tipo_opciones_agregadas.length; i++) {
                let pos = i + 1;
                await cantidadOrden.push({ Nombre: "Posicion " + pos, Orden: pos });
                if (i === this.props.productos_tipo_opciones_agregadas.length - 1) {
                    await cantidadOrden.push({ Nombre: "Posicion " + (pos + 1), Orden: pos + 1 });
                }
            }
        } else {

            await cantidadOrden.push({ Nombre: "Posicion " + 1, Orden: 1 });
        }

        return cantidadOrden
    }

    InputChange(e) {

        const { name, value } = e.target;
        const { productoTipoOpcion } = this.state;
        this.setState({
            productoTipoOpcion: {
                ...productoTipoOpcion,
                [name]: value
            }
        });
    }



    async componentDidMount() {
        loader.show();
        await this.props.obtener_tipos_seleccion(this);
        await  this.props.init_editar_tipo_opcion_producto(this.props.IdProductoTipoOpcion,this);
      
        let ordenArray = await this.agregarOrden();

       
        this.setState({
                OrdenCombo: ordenArray
        });



    }




    EditSubmit(e) {
        e.preventDefault();
        const {
            productoTipoOpcion,
        } = this.state;


        if (!productoTipoOpcion.Encabezado) {
            this.props.showMessage('Debes ingresar un encabezado .', true, 'Información');
            return;
        } else if (productoTipoOpcion.IdTipoOpcion === 0) {
            this.props.showMessage('Debes seleccionar un tipo de opción.', true, 'Información');
            return;
        }

        loader.show();


        this.props.editar_tipo_opcion_producto(productoTipoOpcion, this);


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
                        Agregar Tipos de Opción
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditSubmit} >

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" as="textarea" name="Encabezado" rows={3} value={this.state.productoTipoOpcion.Encabezado} className="pz-input" onChange={this.InputChange} placeholder="Encabezado" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={12}>

                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='¿Mostrar al Inicio?' checked={this.state.productoTipoOpcion.MostrarInicio} change={(val) => { this.InputChange({ target: { name: 'MostrarInicio', value: val.checked } }); }} />
                            </Form.Group>
                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='¿Es Obligatoria?' checked={this.state.productoTipoOpcion.EsObligatoria} change={(val) => { this.InputChange({ target: { name: 'EsObligatoria', value: val.checked } }); }} />
                            </Form.Group>
                            {this.state.productoTipoOpcion.IdTipoSeleccion === 2 ?
                                <Form.Group as={Col}   >
                                    <CheckBoxComponent label='¿Muestra partes de pizza?' checked={this.state.productoTipoOpcion.MostrarPartes} change={(val) => { this.InputChange({ target: { name: 'MostrarPartes', value: val.checked } }); }} />
                                </Form.Group>
                                : ""
                            }
                           

                        </Form.Row>

                        {this.state.OrdenCombo.length > 0 ?
                            <Form.Row sm={12}>
                                <Form.Group as={Col}>
                                    <ComboBoxComponent name="Orden" showClearButton={false} value={this.state.productoTipoOpcion.Orden} allowCustom={false} fields={this.fields2} change={(val) => { this.InputChange({ target: { name: 'Orden', value: val.value } }); }} allowFiltering={true} placeholder="Orden" className="pz-input" dataSource={this.state.OrdenCombo} />
                                </Form.Group>
                                
                            </Form.Row>
                            : ""
                        }
                        {
                            this.props.tipos_seleccion.length > 0 ?
                                <Form.Row sm={10}>
                                    <Form.Group as={Col} >
                                        <ComboBoxComponent name="IdTipoSeleccion" showClearButton={false} value={this.state.productoTipoOpcion.IdTipoSeleccion} allowCustom={false} fields={this.fields1} change={(val) => { this.InputChange({ target: { name: 'IdTipoSeleccion', value: val.value } }); }} allowFiltering={true} placeholder="Tipo Selección" className="pz-input" dataSource={this.props.tipos_seleccion} />
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
    const { mostrar_editar_tipo_opcion, tipos_opciones_producto, tipos_seleccion, productos_tipo_opciones_agregadas } = state.productoReducer;
    return { mostrar_editar_tipo_opcion, tipos_opciones_producto, tipos_seleccion, productos_tipo_opciones_agregadas};
};


const mapDispatchToProps = {

    obtener_tipo_opciones_producto_agregadas: productoActions.obtener_tipo_opciones_producto_agregadas,
    crear_tipo_opcion_producto: productoActions.crear_tipo_opcion_producto,
    editar_tipo_opcion_producto: productoActions.editar_tipo_opcion_producto ,
    showMessage: alertActions.showMessage,
    init_editar_tipo_opcion_producto: productoActions.init_editar_tipo_opcion_producto,
    ver_editar_tipo_opcion: productoActions.ver_editar_tipo_opcion,
    obtener_tipos_seleccion: productoActions.obtener_tipos_seleccion,


}; 





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarTipoOpcionProducto));