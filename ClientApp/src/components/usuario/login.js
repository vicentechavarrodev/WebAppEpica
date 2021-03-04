import React, { Component } from 'react';
import './styles.scss';
import { withRouter } from "react-router-dom";
import Logo from '../../imagenes/generales/logo_orders.png';
import { connect } from 'react-redux';
import { usuarioActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';

class Login extends Component {

    cmbTipoInicioRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            codigo: '',
            contrasena: '',
            codigoSede: '',
            itemSelecionado:''
        };

        this.tipoInicioData = {
            items: ['Sede', 'Empresas']
        };

        this.InputChange = this.InputChange.bind(this);
        this.LoginSubmit = this.LoginSubmit.bind(this);
        this.onCmbTipoChange = this.onCmbTipoChange.bind(this);
    }

    InputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onCmbTipoChange(e) {
        this.setState({ itemSelecionado: e.value });
        this.controlesVisibles(e.value);
    }

    controlesVisibles(valor) {
        if (valor === 'Empresas') {

            document.getElementById("codigoSede").classList.remove("visible");
            document.getElementById("codigo").classList.remove("invisible");
            document.getElementById("password").classList.remove("invisible");
            document.getElementById("btnEntrar").classList.remove("invisible");


            document.getElementById("codigo").classList.add("visible");
            document.getElementById("password").classList.add("visible");
            document.getElementById("btnEntrar").classList.add("visible");
            document.getElementById("codigoSede").classList.add("invisible");
        


        } else if (valor === 'Sede') {
            document.getElementById("codigoSede").classList.remove("invisible");
            document.getElementById("codigo").classList.remove("invisible");
            document.getElementById("password").classList.remove("invisible");
            document.getElementById("btnEntrar").classList.remove("invisible");

            document.getElementById("codigoSede").classList.add("visible");
            document.getElementById("codigo").classList.add("visible");
            document.getElementById("password").classList.add("visible");
            document.getElementById("btnEntrar").classList.add("visible");

        } else {
            document.getElementById("codigoSede").classList.remove("visible");
            document.getElementById("codigo").classList.remove("visible");
            document.getElementById("password").classList.remove("visible");
            document.getElementById("btnEntrar").classList.remove("visible");

            document.getElementById("codigoSede").classList.add("invisible");
            document.getElementById("codigo").classList.add("invisible");
            document.getElementById("password").classList.add("invisible");
            document.getElementById("btnEntrar").classList.add("invisible");
            
        }
    }
    

    componentDidMount() {
        loader.hide();
        const LsCodigoSede = localStorage.getItem('codigoSede');
        localStorage.getItem('codigoSede') ? this.controlesVisibles("Sede") :this.controlesVisibles('');

        if (LsCodigoSede !== null) {
            this.setState({ codigoSede: LsCodigoSede });
        }
    }

    async LoginSubmit(e) {
        e.preventDefault();

        const { codigo, contrasena, codigoSede } = this.state;

            if (this.state.itemSelecionado === 'Sede') {
                if (!codigoSede) {

                    this.props.showMessage('Debe ingresar el codigo de la sede.', true, 'Información');
                    return;
                }
            }

            if (!codigo) {

                this.props.showMessage('Debe ingresar el nombre de usuario.', true, 'Información');
                return;


            } else if (!contrasena) {
                this.props.showMessage('Debe ingresar una contraseña.', true, 'Información');
                return;

              }
        

        loader.show();
        this.props.login(codigo, contrasena, this.state.itemSelecionado === 'Sede' ? codigoSede : 0, this.props.history);
        

      
    }

 
    

    render() {
        const { codigo, contrasena, codigoSede } = this.state;
        const LsCodigoSede = localStorage.getItem('codigoSede');
       

        return (
            <div className="login-form"  >
                <form onSubmit={this.LoginSubmit}  >

                    <img alt="icono" className='center mb-2' src={Logo} height='100px' width='100px' />
                    {LsCodigoSede === null || LsCodigoSede ===''?
                        <div className="form-group">
                            <div className="input-group" >
                                <ComboBoxComponent id="cmbTipoInicio" showClearButton={false}  allowCustom={false} ref={this.cmbTipoInicioRef} className="pz-input" dataSource={this.tipoInicioData.items} placeholder='Tipo de Inicio' change={this.onCmbTipoChange} />
                            </div>
                        </div>
                        :
                        " "
                    }
                    
                    <div className="form-group" id="codigoSede">
                        <div className="input-group">
                            <span className="input-group-text"><i className="fa fa-hashtag"/></span>
                            <input type="text" ref='codigoSede' readOnly={LsCodigoSede === null || LsCodigoSede === ''? false : true} className="form-control  " name="codigoSede" placeholder="Codigo Sede" value={codigoSede} onChange={this.InputChange} />
                        </div>
                    </div>

                    <div className="form-group" id="codigo">
                    <div className="input-group">
                            <span className="input-group-text"><i className="fa fa-user"/></span>
                            <input type="text" ref='codigo'  className="form-control" name="codigo" placeholder="Codigo" value={codigo} onChange={this.InputChange} />
                    </div>
                    </div>
                   
               
                    <div className="form-group" id="password">
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa fa-lock"/></span>
                                <input type="password"  className="form-control" name="contrasena" placeholder="Contraseña" value={contrasena} onChange={this.InputChange} />
                            </div>
                        </div>
                        
                    
                    <div className="form-group" id="btnEntrar">
                        <button type="submit"  className="btn btn-default-pz btn-3d-style login-btn btn-block">Entrar </button>
                    </div>
                </form>
            </div>

        );
    }
}


//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return { loggingIn, user };
};


const mapDispatchToProps = {
    login: usuarioActions.login,
    showMessage: alertActions.showMessage
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));