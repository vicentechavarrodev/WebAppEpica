import React, { Component } from 'react';
import './styles.scss';

class Footer extends Component {
    render() {
      
        return (
           <>
            <section id="footer" className="pt-md-5 border-top">
         
                    <div className="row ml-lg-5 mr-0">
                        <div className="col-lg-4 footer-section col-md pl-5 border-right">
                        <h5>Epica Pizzeria Artesanal</h5>
                            <p className="d-block mb-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate distinctio velit deleniti earum ullam temporibus! Incidunt cupiditate, consectetur ipsam repellat rem similique assumenda corporis accusantium, soluta, aspernatur ex exercitationem quasi!</p>
                    </div>
                        <div className="col-lg-4 fo col-sm-6 col-md pl-5 ml-lg-5 col-xs-12 border-right">
                            <ul className="list-unstyled text-small">
                            <h5>Categorias</h5>
                                <li><a className="link-secondary" href="#">Cool stuff</a></li>
                                <li><a className="link-secondary" href="#">Random feature</a></li>
                                <li><a className="link-secondary" href="#">Team feature</a></li>
                                <li><a className="link-secondary" href="#">Stuff for developers</a></li>
                                <li><a className="link-secondary" href="#">Another one</a></li>
                                <li><a className="link-secondary" href="#">Last time</a></li>
                        </ul>

                    </div>
                        <div className="col-lg-3 col-sm-6 col-md pl-5 pr-0">
                            <div className="container">
                                <h5 className="text">Encuentranos</h5>
                                <div className="row fo pt-3">
                                    <a className="link-secondary" href="#">
                                        <span className="fab fa-facebook-square"></span>
                                </a>
                                    <a className="link-secondary" href="#">
                                        <span className="fa fa-instagram"></span>
                                </a>
                                    <a className="link-secondary" href="#">
                                        <span className="fab fa-whatsapp-square"></span>
                                </a>

                            </div>

                        </div>
                    </div>
                        <div className="col-sm-12">
                            <div className="container col-copy">
                                <div className="row">

                                &copy; 2021 Línea de Código
                                
                          </div>
                        </div>
                    </div>

                    </div>
</section>
</>
        );
    }
}

export default Footer;