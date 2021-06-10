import React, { Component, createRef } from 'react';
import '../styles.scss';
import { withRouter } from "react-router-dom";
import PropTypes, { bool } from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { usuarioActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';


class CrearUsuario extends Component {

    idRef =  React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                Identificacion: '',
                FechaNacimiento: '',
                Nombres: '',
                Apellidos: '',
                Celular: '',
                Correo: '',
                Contrasena: '',
                RepetirContrasena: '',
                Codigo: '',
                IdRole: ''
            }
        };

        this.genderData = {
            items: ['Masculino', 'Femenino']
        };

        this.fields = { text: 'Nombre', value: 'IdRole' };
      
        this.InputChange = this.InputChange.bind(this);
        this.CreateUserSubmit = this.CreateUserSubmit.bind(this);
        this.GenerarCodigo = this.GenerarCodigo.bind(this);
    }

    InputChange(e) {
        
        const { name, value } = e.target;
        const { usuario } = this.state;
        this.setState({
            usuario: {
                ...usuario,
                [name]: value
            }
        });
    }

   

    componentDidMount() {
        this.props.cargar_crear_usuario();
    }


    GenerarCodigo(e) {
        const { usuario } = this.state;
        let id = this.idRef.current.value.trim();
        let Codigo = '';
        if (id !== "" && id.length >= 4) {
            Codigo = id.substring(id.length, id.length - 4);
        } 

        this.setState({
            usuario: {
                ...usuario,
                   Codigo
            }
        });
        
    }

    CreateUserSubmit(e) {
        e.preventDefault();
         const { 
             usuario
         } = this.state;

        
        if (!usuario.Identificacion) {
            this.props.showMessage('Debe ingresar una identificación.', true, 'Información');
            return;
        } else if (usuario.Identificacion.length < 4 ) {
            this.props.showMessage('Debe ingresar una identificación mayor a 4 digitos.', true, 'Información');
            return;
        } else if (!usuario.Nombres) {
            this.props.showMessage('Debe ingresar su nombre.', true, 'Información');
            return;
        } else if (!usuario.Apellidos) {
            this.props.showMessage('Debe ingresar su apellido.', true, 'Información');
            return;
        }  else if (!usuario.Celular) {
            this.props.showMessage('Debe ingresar su telefono.', true, 'Información');
            return;
        } else if (!usuario.Contrasena) {
            this.props.showMessage('Debe ingresar su contraseña.', true, 'Información');
            return;
        } else if (!usuario.RepetirContrasena) {
            this.props.showMessage('Debe confirmar su contraseña.', true, 'Información');
            return;
        } else if (usuario.Contrasena !== usuario.RepetirContrasena) {
            this.props.showMessage('Las contraseñas no coinciden.', true, 'Información');
            return;
        } else if (!usuario.IdRole) {
            this.props.showMessage('Debe seleccionar un role para el usuario.', true, 'Información');
            return;
        } else if (!usuario.Codigo) {
            this.props.showMessage('Debe existir un codigo para su ingreso a la plataforma.', true, 'Información');
            return;
        }

        loader.show();
        this.props.crear_usuario(usuario,this);
       

    }




    render() {
        const { usuario} = this.state;
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Usuario
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateUserSubmit} >
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="number" name="Identificacion" ref={this.idRef} value={usuario.Identificacion} onBlur={this.GenerarCodigo} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12) }}
                                    onChange={this.InputChange} 
                                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Identificación" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Control type="text" readOnly={true} name="Codigo" value={usuario.Codigo} onChange={this.InputChange} maxLength={50} className="pz-input" placeholder="Código" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Nombres" value={usuario.Nombres} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Primer nombre" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Control type="text" name="Apellidos" value={usuario.Apellidos} maxLength={15} className="pz-input" onChange={this.InputChange} placeholder="Segundo nombre" />
                            </Form.Group>
                        </Form.Row>
                        
                       
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="number" name="Celular" value={usuario.Celular} onChange={this.InputChange} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10) }}
                                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Celular" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Control type="email" name="Correo" value={usuario.Correo} onChange={this.InputChange} maxLength={50} className="pz-input" placeholder="Correo" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <ComboBoxComponent name="IdRole" showClearButton={false} value={usuario.IdRole} allowCustom={false} fields={this.fields} change={(val) => { this.InputChange({ target: { name: 'IdRole', value: val.value } }); }} allowFiltering={true} placeholder="Rol" className="pz-input" dataSource={this.props.init_crear_usuario.Roles} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="password" name="Contrasena" value={usuario.Contrasena} maxLength={6}
                                    onChange={this.InputChange}
                                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Contraseña" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Control type="password" name="RepetirContrasena" value={usuario.RepetirContrasena} maxLength={6}
                                    onChange={this.InputChange}
                                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} className="pz-input" placeholder="Repetir contraseña" />
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
    const { loggingIn, user, mostrar_crear_usuario, init_crear_usuario} = state.authentication;
    return { loggingIn, user, mostrar_crear_usuario, init_crear_usuario};
};


const mapDispatchToProps = {
    login: usuarioActions.login,
    showMessage: alertActions.showMessage,
    ver_crear_usuario: usuarioActions.ver_crear_usuario,
    cargar_crear_usuario: usuarioActions.cargar_crear_usuario,
    obtener_usuarios: usuarioActions.obtener_usuarios,
    crear_usuario: usuarioActions.crear_usuario
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearUsuario));