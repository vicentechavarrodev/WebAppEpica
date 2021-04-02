import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { withRouter } from "react-router-dom";
import Logo from '../../imagenes/pagina/logoEpica.png';
import iconMenu from '../../imagenes/pagina/pizza-box-menu.png';
import { Link } from "react-router-dom";
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

class Header extends Component {

    constructor() {
        super();
        this.MostrarMenu = this.MostrarMenu.bind(this);
        this.AbrirLogin = this.AbrirLogin.bind(this);
    }

    //-------------------------------Eventos------------------------

    AbrirLogin(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }
    MostrarMenu(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.menuLateralVisible === 'noActive') {
            //ABRIR MENÚ
            this.props.lateral_bar_visible('active');

        } else {
            //CERRAR MENÚ
            this.props.lateral_bar_visible('noActive');
        }

    }


    //---------------------------------------------------------------
    render() {
        let user = JSON.parse(localStorage.getItem('usuario'));

     
        return (

            <nav id="header" className="navbar navbar-color navbar-expand-lg fixed-top navbar-expand-sm navbar-light">
                <div className="container-fluid container-nav">

                    {
                        this.props.visiblePagina === "true" ?
                            <div className="nav-sm nav-icon">
                                <Link to="/pagina" className="navbar-brand">
                                    <img src={Logo} alt="Epica Logo"  />
                                </Link>
                            
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                 
                                  <i class="fa fa-bars" aria-hidden="true"></i>
                             </button>
                            </div>
                            :
                            <button type="button" id="sidebarCollapse" onClick={this.MostrarMenu} value="collapse" className="btn btn-default  ">
                                <MenuIcon id="btncollapse" visibility={this.props.iconMenuVisible} />
                            </button>
                   }
                        
                    <div className="collapse navbar-collapse" id="navbar">
                        {this.props.visiblePagina === 'true' ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item" id="novedades">
                                    <Link to="/novedades" className="nav-link">Novedades</Link>
                                </li>
                                <li className="nav-item" id='compania'>
                                    <Link to="/compania" className="nav-link">Compañia</Link>
                                </li>
                                <li className="nav-item" id='pideLinea'>
                                    <Link to="/pideLinea" className="nav-link last-link">Pide en Linea</Link>
                                    </li>
                              
                            </ul>
                             :
                           ""
                            }
                   
                
                   </div>
          
                </div>
            </nav>

        )
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {

    const { menuLateralVisible } = state.lateralBarReducer;

    return {
        menuLateralVisible
    };


};

const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
