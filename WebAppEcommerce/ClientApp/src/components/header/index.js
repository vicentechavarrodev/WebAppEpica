import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { withRouter } from "react-router-dom";
import Logo from '../../imagenes/pagina/logo.png';

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
            <nav className="navbar-header navbar-expand-sm navbar-dark fixed-top ">
                <div className="row">
                   <div className="col-4 col-sm-4 ">

                        {this.props.iconMenuVisible === "hidden" ?

                            <p ><img src={Logo} alt="logo" />  Pazzi Orders</p>
                            :
                            <button type="button" id="sidebarCollapse" onClick={this.MostrarMenu} value="collapse" className="btn btn-default-pz ">
                                <MenuIcon id="btncollapse" visibility={this.props.iconMenuVisible} />
                            </button>
                        }
                      
                   
                  </div>
                  <div className="col-5 col-sm-4 justify-content-center">
                        <p>   {user !== null ? ("Epica  - " + user.Nombres ) : ""}</p>
                   </div>
                   <div className="col-3 col-sm-4" style={{ 'textAlign': 'right' }} >
                        {this.props.iconMenuVisible === 'hidden' ? 
                            <button type="button" onClick={this.AbrirLogin} value="collapse"  className="btn btn-default-pz ">
                                <PersonIcon id="btncollapse"  />
                            </button>
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
