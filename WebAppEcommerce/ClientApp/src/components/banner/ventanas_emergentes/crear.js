import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bannerActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import Image from '../../../imagenes/generales/not_image.png';
import imageCompression from 'browser-image-compression';



class CrearBanner extends Component {

    idRef = React.createRef();

    constructor(props) {
        super(props);



        this.state = {
            banner: {
                IdProducto: 0,
                Nombre: '',
                UrlImagen: '',
                Descripcion: ''
            },
            file: null
        };



        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
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
       
       
    }




    CreateSubmit(e) {
        e.preventDefault();
        const {
            banner,
            file
        } = this.state;

        if (file == null || file.get("Imagen") == null) {
            this.props.showMessage('Debes seleccionar una imagén', true, 'Información');
            return;
        } else if (!banner.Nombre) {
            this.props.showMessage('Debes ingresar un nombre.', true, 'Información');
            return;
        } else if (!banner.Descripcion) {
            this.props.showMessage('Debes ingresar una descripcion.', true, 'Información');
            return;
        } 
        

        loader.show();

        file.append('IdBanner', banner.IdBanner);
        file.append('Nombre', banner.Nombre);
        file.append('UrlImagen', banner.UrlImagen);
        file.append('Descripcion', banner.Descripcion);

       
        this.props.crear_banner(file, this);


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
        const { banner } = this.state;
        return (


            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Banner
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
                                <Form.Control type="text" name="Nombre" value={banner.Nombre} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Nombre" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" as="textarea" name="Descripcion" rows={3} value={banner.Descripcion} className="pz-input" onChange={this.InputChange} placeholder="Descripcion" />
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
    const { banners, mostrar_crear, init_crear } = state.bannerReducer;
    return { banners, mostrar_crear, init_crear };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: bannerActions.ver_crear,
    cargar_crear: bannerActions.cargar_crear,
    crear_banner: bannerActions.crear_banner,
    obtener_banners: bannerActions.obtener_banners,
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearBanner));