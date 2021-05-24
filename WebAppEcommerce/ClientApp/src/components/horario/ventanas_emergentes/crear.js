import React, { Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { horarioActions } from '../actions';
import { loader } from '../../helpers/loader';
import { alertActions } from '../../alerts_message/actions';
import { Modal, Form, Col } from 'react-bootstrap';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';




class CrearHorario extends Component {

    idRef = React.createRef();


    constructor(props) {
        super(props);

    
 
        this.state = {
           
            horario: {
                IdHorario: 0,
                Dia: '',
                HoraInicial: new Date(),
                HoraFinal: new Date(),
                FraseDia:''
            },
            dias: [
                'Domingo',
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
                'Sabado'
                  ]
        };



        this.InputChange = this.InputChange.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
        this.InputChangeDia = this.InputChangeDia.bind(this);

  

  
    

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
    InputChangeDia(e) {
        const {
            horario,

        } = this.state;
        horario.Dia = e.itemData.value;
    }



    componentDidMount() {

       
    }




    CreateSubmit(e) {
        e.preventDefault();
        const {
            horario,
            
        } = this.state;
      
        if (!horario.Dia) {
            this.props.showMessage('Debes ingresar un nombre del día.', true, 'Información');
            return;
        } else if (!horario.HoraInicial) {
            this.props.showMessage('Debes ingresar una Hora Inicial.', true, 'Información');
            return;
        } else if (!horario.HoraFinal) {
            this.props.showMessage('Debes ingresar una Hora Final.', true, 'Información');
            return;
        } else if (!horario.FraseDia) {
            this.props.showMessage('Debes ingresar una frase para el día.', true, 'Información');
            return;
        }

 
        loader.show();
        this.props.crear_horario(horario, this);


    }




    render() {
    
        const { dias} = this.state;
      
        return (
           

            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear Horario
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.CreateSubmit} >
                        <Form.Row sm={10}>

                            <Form.Group as={Col} >
                                <ComboBoxComponent name="Dia" change={this.InputChangeDia} dataSource={dias} placeholder="Selecciona el Dia" className="pz-input" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="time" id="HoraInicial" name="HoraInicial"  className="pz-input" onChange={this.InputChange} placeholder="Hora Inicial" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control type="time" name="HoraFinal"  className="pz-input" onChange={this.InputChange} placeholder="Hora Final" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row sm={10}>
                            <Form.Group as={Col} >
                                <Form.Control as="textarea" rows="3" name="FraseDia" className="pz-input" onChange={this.InputChange} placeholder="Frase" />
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
    const { horarios, mostrar_crear, init_crear } = state.horarioReducer;
    return { horarios, mostrar_crear, init_crear };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    ver_crear: horarioActions.ver_crear,
    cargar_crear: horarioActions.cargar_crear,
    crear_horario: horarioActions.crear_horario,
    obtener_horarios: horarioActions.obtener_horarios,
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CrearHorario));