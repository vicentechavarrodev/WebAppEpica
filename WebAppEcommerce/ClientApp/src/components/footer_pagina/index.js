import React, { Component } from 'react';
import '../pagina/Style.scss';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';



class Footer_pagina extends Component {


    render() {
        return (
            <footer id="footer" class="pt-md-5 border-top">
                <div class="row ml-lg-5 mr-0">
                    <div class="col-lg-4 footer-section col-md pl-5 border-right">
                        <h5>Epica Pizzeria Artesanal</h5>
                        <p class="d-block mb-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate distinctio velit deleniti earum ullam temporibus! Incidunt cupiditate, consectetur ipsam repellat rem similique assumenda corporis accusantium, soluta, aspernatur ex exercitationem quasi!</p>
                    </div>
                    <div class="col-lg-4 fo col-sm-6 col-md pl-5 ml-lg-5 col-xs-12 border-right">
                        <ul class="list-unstyled text-small">
                            <h5>Categorias</h5>
                            <li><a class="link-secondary" href="#">Cool stuff</a></li>
                            <li><a class="link-secondary" href="#">Random feature</a></li>
                            <li><a class="link-secondary" href="#">Team feature</a></li>
                            <li><a class="link-secondary" href="#">Stuff for developers</a></li>
                            <li><a class="link-secondary" href="#">Another one</a></li>
                            <li><a class="link-secondary" href="#">Last time</a></li>
                        </ul>

                    </div>
                    <div class="col-lg-3 col-sm-6 col-md pl-5 pr-0">
                        <div class="container">
                            <h5 class="text">Encuentranos</h5>
                            <div class="row fo pt-3">
                                <a class="link-secondary" href="#">
                                    <span class="fab fa-facebook-square"></span>
                                </a>
                                <a class="link-secondary" href="#">
                                    <span class="fab fa-instagram-square"></span>
                                </a>
                                <a class="link-secondary" href="#">
                                    <span class="fab fa-whatsapp-square"></span>
                                </a>

                            </div>

                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="container col-copy">
                            <div class="row">

                                &copy; 2021 Línea de Código
                                
                                     </div>
                        </div>
                    </div>

                </div>
                        </footer>


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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer_pagina));
