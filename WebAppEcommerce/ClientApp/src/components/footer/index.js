import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import './styles.scss';
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.abrirPideLinea = this.abrirPideLinea.bind(this);
    }

    async componentDidMount() {
        await this.props.obtenerCategorias(this);

    }
    abrirPideLinea(e) {
        this.props.history.push({
            pathname: '/pideLinea',
            Id_categoria_seleccionada: e.currentTarget.id,
        });
    
    }

    render() {
      
        return (
           <>
            <section id="footer" className="pt-md-5 border-top">
         
                    <div className="row ml-lg-5 mr-0">
                        <div className="col-lg-4 footer-section col-md pl-5 border-right">
                        <h5>Epica Pizzeria Artesanal</h5>
                            <p className="d-block mb-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate distinctio velit deleniti earum ullam temporibus! Incidunt cupiditate, consectetur ipsam repellat rem similique assumenda corporis accusantium, soluta, aspernatur ex exercitationem quasi!</p>
                    </div>
                        <div className="col-lg-4 fo col-sm-6 col-md col-xs-12 border-right">
                            <ul className="list-unstyled text-small">
                                <h5>Categorias</h5>
                                {this.props.categorias.map((item) =>
                                    <li key={item.IdCategoria}>
                                        <button className="link-secondary" type="button" className="btn btn-link" id={item.IdCategoria} onClick={this.abrirPideLinea}>{item.Nombre}</button></li>
                                 )}
                              
                         
                        </ul>

                    </div>
                        <div className="col-lg-3 col-sm-6 col-md pl-lg-5 pr-0">
                            <div className="container">
                                <h5 className="text">Encuentranos</h5>
                                <div className="row fo-icons pt-3">
                                    <a className="link-secondary icons-social" href="#">
                                        <span className="fa fa-facebook"></span>
                                </a>
                                    <a className="link-secondary icons-social" href="#">
                                        <span className="fa fa-instagram"></span>
                                </a>
                                    <a className="link-secondary icons-social" href="#">
                                        <span className="fa fa-whatsapp"></span>
                                </a>
                                    <div className="col-sm-12">
                                        <div className="container col-copy">
                                            <div className="row">

                                                &copy; 2021 Línea de Código
                                                
                          </div>
                                        </div>
                            </div>

                        </div>
                    </div>
                       
                    </div>

                    </div>
</section>
</>
        );
    }
}
function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    const { productos_categoria, id_producto_seleccionado} = state.productoReducer;
    return { loggingIn, user, categorias, productos_categoria, id_producto_seleccionado};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    productos_por_categoria: productoActions.productos_por_categoria,
 
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));