import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { productoActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import {  CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import Image from '../../../imagenes/generales/not_image.png';
import imageCompression from 'browser-image-compression';
import '../styles.scss';

class CrearProducto extends Component {

    idRef =  React.createRef();

    constructor(props) {
        super(props);

      

        this.state = {
            producto: {
                IdProducto:0,
                Nombre: '',
                UrlImagen: '',
                Precio: '',
                IdCategoria: 0,
                Descripcion: '',
                Activo:true
            },
            file: null
        };

     

        this.fields = { text: 'Nombre', value: 'IdCategoria' };
      
        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);
   
    }

    InputChange(e) {
       
        const { name, value } = e.target;
        const { producto } = this.state;
        this.setState({
            producto: {
                ...producto,
                [name]: value
            }
        });
    }

   

    componentDidMount() {
        loader.show();
        this.props.cargar_crear();
    }


 

     CreateSubmit(e) {
        e.preventDefault();
         const { 
             producto,
             file
         } = this.state;

         if (file == null || file.get("Imagen") == null) {
            this.props.showMessage('Debes seleccionar una imagén', true, 'Información');
            return;
        }else if (!producto.Nombre) {
            this.props.showMessage('Debes ingresar un nombre.', true, 'Información');
            return;
        } else if (!producto.Precio) {
            this.props.showMessage('Debes ingresar un precio.', true, 'Información');
            return;
        } else if (producto.IdCategoria === 0) {
            this.props.showMessage('Debes seleccionar un categoría.', true, 'Información');
            return;
        }

        loader.show();

        file.append('IdProducto', producto.IdProducto);
        file.append('Nombre', producto.Nombre);
        file.append('UrlImagen', producto.UrlImagen);
        file.append('Precio', producto.Precio);
        file.append('IdCategoria', producto.IdCategoria);
        file.append('Descripcion', producto.Descripcion);
        file.append('Activo', producto.Activo);
       
        this.props.crear_producto(file, this);
       

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
                img.setAttribute( 'src', e.target.result);
               
          }
         reader.readAsDataURL(compressedFile);
         form.append('Imagen', compressedFile);
         this.setState({ file: form });
    }


    async  handleImageUpload(event) {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        console.log(compressedFile); // write your own logic
    } catch (error) {
        console.log(error);
    }

}



    render() {
        const { producto } = this.state;
        return (


            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Producto
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubmit} >
                        <Form.Row sm={10}>
                            <img id="image-preview" src={Image} alt="Imagen" />
                        </Form.Row>
                        <Form.Row sm={10}>
                           
                            <Form.Group as={Col} >
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />
                            </Form.Group>
                        </Form.Row>
                            
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={producto.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" as="textarea" name="Descripcion" rows={3} value={producto.Descripcion}  className="pz-input" onChange={this.InputChange} placeholder="Descripcion" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={12}>
                            <Form.Group as={Col} >
                                <Form.Group as={Col} >
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                        <Form.Control type="number" name="Precio" value={producto.Precio}

                                            onChange={this.InputChange}
                                            className="pz-input" placeholder="Precio" />
                                    </div>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}   >
                                <CheckBoxComponent label='Activo' checked={this.state.producto.Activo} change={(val) => { this.InputChange({ target: { name: 'Activo', value: val.checked } }); }} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <ComboBoxComponent name="IdCategoria" showClearButton={false} value={producto.IdCategoria} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdCategoria', value: val.value } }); }} allowFiltering={true} placeholder="Categoría" className="pz-input" dataSource={this.props.init_crear.Categorias} />
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
    const { productos, mostrar_crear, init_crear } = state.productoReducer;
    return { productos, mostrar_crear, init_crear};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: productoActions.ver_crear,
    cargar_crear: productoActions.cargar_crear,
    crear_producto: productoActions.crear_producto,
    obtener_productos: productoActions.obtener_productos,
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearProducto));