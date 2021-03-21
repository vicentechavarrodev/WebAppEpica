import React, { Component } from 'react';
import '../pagina/Style.scss';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';



class Nav_pagina extends Component {


     render() {
        return (
            <div data-spy="scroll" data-target="#navbar" data-offset="57">
                <header id="header" class="navbar navbar-color navbar-expand-lg fixed-top navbar-expand-sm navbar-light">
                    <div class="container-fluid container-nav">
                        <a class="navbar-brand" href="./index.html">
                            <img src="./assets/images/logo epica.png" alt="Epica Logo" width="80px">
                            </img>
                         </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbar">
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item mr-4">
                                        <a class="nav-link" href="#main">Novedades</a>
                                    </li>
                                    <li class="nav-item mr-4">
                                        <a class="nav-link" href="#speakers">Compañia</a>
                                    </li>
                                    <li class="nav-item mr-4">
                                        <a class="nav-link last-link" href="./pideLinea.html">Pide en Linea</a>
                                    </li>

                                </ul>
                            </div>
                          </div>
                       </header>
                    </div>
            
                
        )
    }

}

//-------------------------------Redux------------------------

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return { loggingIn, user };
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav_pagina));
