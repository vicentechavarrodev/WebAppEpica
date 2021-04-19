import React, { Component } from 'react';
import '../styles.scss';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { productoActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import {  CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import '../styles.scss';
import imageCompression from 'browser-image-compression';

class EditarProducto extends Component {

    constructor(props) {
        super(props);



        this.state = {
            producto: {
                IdProducto: 0,
                Nombre: '',
                UrlImagen: '',
                Precio: '',
                IdCategoria: 0,
                Descripcion: '',
                Activo: false,
                PrecioVariable: false,
                TieneOpciones:false
            },
            file: null
        };



        this.fields = { text: 'Nombre', value: 'IdCategoria' };

        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);

    }

    InputChange(e) {

        const { name, value } = e.target;
        const { producto } = this.state;
        this.setState({
            producto: {
                ...producto,
                [name]: value,
                Precio: (name === "PrecioVariable" && value && name !== "Precio") ? 0 : this.state.Precio
            }
        });
    }




    componentDidMount() {
        loader.show();
        this.props.cargar_editar(this.props.id_producto_seleccionado, this);
        
    }


    EditSubmit(e) {
        e.preventDefault();
        const {
            producto,
            file
        } = this.state;

        var form = file;

       if (!producto.Nombre) {
            this.props.showMessage('Debes ingresar un nombre.', true, 'Información');
           return;
       } else if (!producto.Precio && !producto.PrecioVariable) {
            this.props.showMessage('Debes ingresar un precio.', true, 'Información');
            return;
        } else if (producto.IdCategoria === 0) {
            this.props.showMessage('Debes seleccionar un categoría.', true, 'Información');
            return;
        }

        if (form == null) {
            form = new FormData();
        }

        loader.show();

        form.append('IdProducto', producto.IdProducto);
        form.append('Nombre', producto.Nombre);
        form.append('UrlImagen', producto.UrlImagen);
        form.append('Precio', producto.Precio);
        form.append('IdCategoria', producto.IdCategoria);
        form.append('Descripcion', producto.Descripcion);
        form.append('Activo', producto.Activo);
        form.append('PrecioVariable', producto.PrecioVariable);
        form.append('TieneOpciones', producto.TieneOpciones);
        this.props.editar_producto(form, producto.IdProducto, this);

    }

    async FileSelectChange(e) {
        e.preventDefault();
        let form = new FormData();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }

        var img = document.getElementById('image-preview');

        const imageFile = e.target.files[0];

        const compressedFile = await imageCompression(imageFile, options);
        var reader = new FileReader();
        reader.onload = function (e) {
            img.setAttribute('src', e.target.result);

        }
        reader.readAsDataURL(compressedFile);
        form.append('Imagen', compressedFile);
        this.setState({ file: form });
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
                        Editar Producto
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditSubmit} >
                        <Form.Row sm={10}>
                            <img id="image-preview" src={`${process.env.REACT_APP_API_URL }app-images/${this.state.producto.UrlImagen}`} alt="Imagen" />
                        </Form.Row>
                        <Form.Row sm={10}>

                            <Form.Group as={Col} >
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={this.state.producto.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control rows={3} type="text" as="textarea" name="Descripcion" value={this.state.producto.Descripcion}  className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>

                        </Form.Row>
                       
                        <Form.Row sm={10}>
                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='Activo' checked={this.state.producto.Activo} change={(val) => { this.InputChange({ target: { name: 'Activo', value: val.checked } }); }} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <CheckBoxComponent label='¿Su precio es variable?' checked={this.state.producto.PrecioVariable} change={(val) => { this.InputChange({ target: { name: 'PrecioVariable', value: val.checked } }); }} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={12}>
                            {!this.state.producto.PrecioVariable ?
                                <Form.Group as={Col} >

                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                        <Form.Control type="number" name="Precio" value={this.state.producto.Precio}
                                            onChange={this.InputChange}
                                            className="pz-input" placeholder="Precio" />
                                    </div>

                                </Form.Group>
                                : ""

                            }
                            
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <ComboBoxComponent name="IdCategoria" showClearButton={false} value={this.state.producto.IdCategoria} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdCategoria', value: val.value } }); }} allowFiltering={true} placeholder="Categoría" className="pz-input" dataSource={this.props.init_editar.Categorias} />
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
    const { mostrar_crear, init_editar, producto_actualizado, id_producto_seleccionado} = state.productoReducer;
    return { mostrar_crear, init_editar, producto_actualizado, id_producto_seleccionado };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_editar: productoActions.ver_editar,
    cargar_editar: productoActions.cargar_editar,
    editar_producto: productoActions.editar_producto,
    obtener_productos: productoActions.obtener_productos,
    producto_seleccionado: productoActions.producto_seleccionado

    
    

};


//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarProducto));