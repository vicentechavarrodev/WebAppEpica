import React, { Component } from 'react';
import MenuLateral from '../lateral_bar/index';
import Header from '../header/index';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { VentanaPrincipalActions } from '../ventana_principal/actions';
import { withRouter } from "react-router-dom";


class VentanaPrincipal extends Component {

    componentDidMount() {
        if (localStorage.getItem("usuario") === null) {
            this.props.history.push("/pagina");
        }
       
       
    }

    render() {
        return (
            <div className="wrapper ">
              <Header visiblePagina="false" />
              <MenuLateral />
                <div id="content" >
                    <div className="jumbotron container-fluid table-responsive">
                        {this.props.children}
                    </div>
               
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { esPrincipal } = state.ventanaPrincipalReducer;
    return { loggingIn, user, esPrincipal};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    es_paginaprincipal: VentanaPrincipalActions.es_paginaprincipal
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VentanaPrincipal));