import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { horarioActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';


class EditarHorario extends Component {

    constructor(props) {
        super(props);



        this.state = {
            horario: {
                IdHorario: 0,
                Dia: '',
                HoraInicial: '',
                HoraFinal: ''
            },
            dias: [
                'domingo',
                'lunes',
                'martes',
                'miercoles',
                'jueves',
                'viernes',
                'sabado'
            ]
        };



        this.InputChange = this.InputChange.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);
 

    }

    InputChange(e) {

        const { name, value } = e.target;
        const { horario } = this.state;
        this.setState({
            horario: {
                ...horario,
                [name]: value
    
            }
        });
    }




    componentDidMount() {
        loader.show();
        this.props.cargar_editar(this.props.id_horario_seleccionado, this);
        
      
  

    }


    EditSubmit(e) {
        e.preventDefault();
        const {
            horario,
            file
        } = this.state;

        if (!horario.Dia) {
            this.props.showMessage('Debes ingresar un Dia.', true, 'Información');
            return;
        } else if (!horario.HoraInicial) {
            this.props.showMessage('Debes ingresar una Hora Inicial.', true, 'Información');
            return;
        } else if (!horario.HoraFinal) {
            this.props.showMessage('Debes ingresar una Hora Final.', true, 'Información');
            return;
        }


        loader.show();

        file.append('IdHorario', horario.IdHorario);
        file.append('Dia', horario.Dia);
        file.append('HoraInicial', horario.HoraInicial);
        file.append('HoraFinal', horario.HoraFinal);
        this.props.editar_horario(file, horario.IdHorario, this);

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
                        Editar Horario
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.EditSubmit} >
                        <Form.Row sm={10}>

                            <Form.Group as={Col} >
                                <ComboBoxComponent name="Dia" showClearButton={false} value={this.state.horario.Dia} allowCustom={false} fields={this.fields} allowFiltering={true} placeholder="Selecciona el Dia" className="pz-input" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="time" name="HoraInicial" value={this.state.horario.HoraInicial} className="pz-input" onChange={this.InputChange} placeholder="Hora Inicial" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="time" name="HoraFinal" value={this.state.horario.HoraFinal} className="pz-input" onChange={this.InputChange} placeholder="Hora Final" />
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
    const { mostrar_crear, init_editar, horario_actualizado, id_horario_seleccionado } = state.horarioReducer;
    return { mostrar_crear, init_editar, horario_actualizado, id_horario_seleccionado  };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_editar: horarioActions.ver_editar,
    cargar_editar: horarioActions.cargar_editar,
    editar_horario: horarioActions.editar_horario,
    obtener_horarios: horarioActions.obtener_horarios,
    horario_seleccionado: horarioActions.horario_seleccionado




};


//------------------------------------------------------------------



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarHorario));