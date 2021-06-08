import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bannerActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import imageCompression from 'browser-image-compression';


class EditarBanner extends Component {

    constructor(props) {
        super(props);



        this.state = {
            banner: {
                IdBanner: 0,
                Nombre: '',
                UrlImagen: '',
                Descripcion: ''
            },
            file: null
        };



        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);
        this.FileSelectChange = this.FileSelectChange.bind(this);

    }

    InputChange(e) {

        const { name, value } = e.target;
        const { banner } = this.state;
        this.setState({
            banner: {
                ...banner,
                [name]: value
    
            }
        });
    }




    componentDidMount() {
        loader.show();
        this.props.cargar_editar(this.props.id_banner_seleccionado, this);
        
      
  

    }


    EditSubmit(e) {
        e.preventDefault();
        const {
            banner,
            file
        } = this.state;

        var form = file;

        if (!banner.Nombre) {
            this.props.showMessage('Debes ingresar un nombre.', true, 'Información');
            return;
        } else if (!banner.Descripcion) {
            this.props.showMessage('Debes ingresar una descripcion.', true, 'Información');
            return;
        } 

        if (form == null) {
            form = new FormData();
        }

        loader.show();

        form.append('IdBanner', banner.IdBanner);
        form.append('Nombre', banner.Nombre);
        form.append('UrlImagen', banner.UrlImagen);
        form.append('Descripcion', banner.Descripcion);
        this.props.editar_banner(form, banner.IdBanner, this);

    }

    async FileSelectChange(e) {
        e.preventDefault();
        let form = new FormData();
        loader.show();
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
        loader.hide();
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
                        Editar Banner
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditSubmit} >
                        <Form.Row sm={10}>
                            <img id="image-preview" src={`${process.env.REACT_APP_API_URL}app-images/${this.state.banner.UrlImagen}`} alt="Imagen" />
                        </Form.Row>
                        <Form.Row sm={10}>

                            <Form.Group as={Col} >
                                <input className="pz-input" type="file" onChange={this.FileSelectChange} placeholder="Imagen" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombre" value={this.state.banner.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control rows={3} type="text" as="textarea" name="Descripcion" value={this.state.banner.Descripcion} className="pz-input" onChange={this.InputChange} placeholder="Descripcion" />
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
    const { mostrar_crear, init_editar, banner_actualizado, id_banner_seleccionado } = state.bannerReducer;
    return { mostrar_crear, init_editar, banner_actualizado, id_banner_seleccionado };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_editar: bannerActions.ver_editar,
    cargar_editar: bannerActions.cargar_editar,
    editar_banner: bannerActions.editar_banner,
    obtener_banners: bannerActions.obtener_banners,
    banner_seleccionado: bannerActions.banner_seleccionado




};


//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarBanner));