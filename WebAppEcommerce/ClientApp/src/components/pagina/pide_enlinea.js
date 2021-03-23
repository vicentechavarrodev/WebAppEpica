import React, { Component } from 'react';
import './styles.scss';
import { withRouter } from "react-router-dom";
import Logo from '../../imagenes/generales/logo_orders.png';
import { connect } from 'react-redux';
import { usuarioActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import Header from '../header/index';
import Footer from '../footer';
class PedidoLinea extends Component {

    cmbTipoInicioRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            codigo: '',

            contrasena: '',
            codigoSede: '',
            itemSelecionado: ''
        };

        this.tipoInicioData = {
            items: ['Sede', 'Empresas']
        };

        this.InputChange = this.InputChange.bind(this);
        this.LoginSubmit = this.LoginSubmit.bind(this);

    }

    InputChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    componentDidMount() {

        if (localStorage.getItem('usuario') != null) {
            this.props.history.push('ventana');

        }
        loader.hide();

    }

    async LoginSubmit(e) {
        e.preventDefault();
        const { codigo, contrasena } = this.state;

        if (!codigo) {

            this.props.showMessage('Debe ingresar el codigo de usuario.', true, 'Información');
            return;
        } else if (!contrasena) {
            this.props.showMessage('Debe ingresar una contraseña.', true, 'Información');
            return;

        }


        loader.show();
        this.props.login(codigo, contrasena, this.props.history);
    }

    render() {
        const { codigo, contrasena } = this.state;
        return (
            <div className="login-form"  >
                <Header visiblePagina="true" />
                <form onSubmit={this.LoginSubmit}  >
                    <div className="form-group" id="codigo">
                        <div className="input-group">
                            <span className="input-group-text"><i className="fa fa-user" /></span>
                            <input type="text" ref='codigo' className="form-control" name="codigo" placeholder="Codigo" value={codigo} onChange={this.InputChange} />
                        </div>
                    </div>
                    <div className="form-group" id="password">
                        <div className="input-group">
                            <span className="input-group-text"><i className="fa fa-lock" /></span>
                            <input type="password" className="form-control" name="contrasena" placeholder="Contraseña" value={contrasena} onChange={this.InputChange} />
                        </div>
                    </div>
                    <div className="form-group" id="btnEntrar">
                        <button type="submit" className="btn btn-default-pz btn-3d-style login-btn btn-block">Entrar </button>
                    </div>
                </form>
                <Footer  />
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PedidoLinea));