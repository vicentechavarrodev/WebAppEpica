import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { productoActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import {  CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

import '../styles.scss';

class TipoOpcionProducto extends Component {

    idRef =  React.createRef();

    constructor(props) {
        super(props);

      

        this.state = {
            productoTipoOpcion: {
                IdProducto:0,
                Encabezado: '',
                IdTipoOpcion: 0,
                MostrarInicio: true,
                IdTipoSeleccion: 0,
                EsPrincipal: false,
                Orden: 0,
                OrdenCombo:[]
            }
        };

     

        this.fields = { text: 'Nombre', value: 'IdTipoOpcion' };
        this.fields1 = { text: 'Nombre', value: 'IdTipoSeleccion' };
        this.fields2 = { text: 'Nombre', value: 'Orden' };
        
      
        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
      
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


    async agregarOrden() {
        let cantidadOrden = [];


        if (this.props.productos_tipo_opciones_agregadas.length > 0) {
            for (var i = 0; i < this.props.productos_tipo_opciones_agregadas.length; i++) {
                let pos = i + 1;
                await  cantidadOrden.push({ Nombre: "Posicion " + pos, Orden: pos });
                if (i === this.props.productos_tipo_opciones_agregadas.length - 1) {
                    await    cantidadOrden.push({ Nombre: "Posicion " + (pos + 1), Orden: pos + 1 });
                }
            }
        } else {

         await   cantidadOrden.push({ Nombre: "Posicion " + 1, Orden: 1 });
        }

        return cantidadOrden
    }
   

    async componentDidMount() {
        loader.show();
        await this.props.obtener_tipo_opciones_producto(this.props.IdProducto);

        await this.props.obtener_tipos_seleccion(this);

        let ordenArray=  await this.agregarOrden();

       
       
        
        const { productoTipoOpcion } = this.state;
        this.setState({
            productoTipoOpcion: {
                ...productoTipoOpcion,
                IdProducto: this.props.IdProducto,
                OrdenCombo: ordenArray
            }
        });

        
    }


 

     CreateSubmit(e) {
        e.preventDefault();
         const { 
             productoTipoOpcion,
         } = this.state;


         if (!productoTipoOpcion.Encabezado) {
            this.props.showMessage('Debes ingresar un encabezado .', true, 'Información');
             return;
         }  else if (productoTipoOpcion.IdTipoOpcion === 0) {
            this.props.showMessage('Debes seleccionar un tipo de opción.', true, 'Información');
            return;
         } else if (productoTipoOpcion.IdTipoSeleccion === 0) {
             this.props.showMessage('Debes seleccionar un tipo de opción.', true, 'Información');
             return;
         }

         

         loader.show();

       
         this.props.crear_tipo_opcion_producto(productoTipoOpcion,this);
       

    }





    render() {
        const { productoTipoOpcion } = this.state;

        return (


            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        ¿Cual sera la opción que mostrara?
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubmit} >
                    
                            
                      
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" as="textarea" name="Encabezado" rows={3} value={productoTipoOpcion.Descripcion} className="pz-input" onChange={this.InputChange} placeholder="Encabezado" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={12}>
                           
                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='MostrarInicio' checked={productoTipoOpcion.MostrarInicio} change={(val) => { this.InputChange({ target: { name: 'MostrarInicio', value: val.checked } }); }} />
                            </Form.Group>
                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='EsPrincipal' checked={productoTipoOpcion.EsPrincipal} change={(val) => { this.InputChange({ target: { name: 'EsPrincipal', value: val.checked } }); }} />
                            </Form.Group>


                        </Form.Row>
                        {this.state.productoTipoOpcion.OrdenCombo.length > 0 ?
                            <Form.Row sm={12}>
                                <Form.Group as={Col}>
                                    <ComboBoxComponent name="Orden" showClearButton={false} value={productoTipoOpcion.Orden} allowCustom={false} fields={this.fields2} change={(val) => { this.InputChange({ target: { name: 'Orden', value: val.value } }); }} allowFiltering={true} placeholder="Orden" className="pz-input" dataSource={this.state.productoTipoOpcion.OrdenCombo} />
                                </Form.Group>
                            </Form.Row>
                            :""
                        }

                     


                        {
                            this.props.tipos_opciones_producto.length > 0 ?
                                <Form.Row sm={10}>
                                    <Form.Group as={Col} >
                                        <ComboBoxComponent name="IdTipoOpcion" showClearButton={false} value={productoTipoOpcion.IdTipoOpcion} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdTipoOpcion', value: val.value } }); }} allowFiltering={true} placeholder="Tipo Opción" className="pz-input" dataSource={this.props.tipos_opciones_producto} />
                                    </Form.Group>
                                </Form.Row>
                                : ""
                        }

                   
                        {
                            this.props.tipos_seleccion.length > 0 ?
                                <Form.Row sm={10}>
                                    <Form.Group as={Col} >
                                        <ComboBoxComponent name="IdTipoSeleccion" showClearButton={false} value={productoTipoOpcion.IdTipoSeleccion} allowCustom={false} fields={this.fields1} change={(val) => { this.InputChange({ target: { name: 'IdTipoSeleccion', value: val.value } }); }} allowFiltering={true} placeholder="Tipo Selección" className="pz-input" dataSource={this.props.tipos_seleccion} />
                                    </Form.Group>
                                </Form.Row>
                                : ""
                        }
              

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
    const { mostrar_agregar_tipo_opcion, tipos_opciones_producto, tipos_seleccion, productos_tipo_opciones_agregadas} = state.productoReducer;
    return { mostrar_agregar_tipo_opcion, tipos_opciones_producto, tipos_seleccion, productos_tipo_opciones_agregadas};
};


const mapDispatchToProps = {
  
    obtener_tipo_opciones_producto: productoActions.obtener_tipo_opciones_producto,
    crear_tipo_opcion_producto: productoActions.crear_tipo_opcion_producto,
    mostrar_agregar: productoActions.mostrar_agregar,
    showMessage: alertActions.showMessage,
    obtener_tipo_opciones_producto_agregadas: productoActions.obtener_tipo_opciones_producto_agregadas,
    obtener_tipos_seleccion: productoActions.obtener_tipos_seleccion,
     
    
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TipoOpcionProducto));