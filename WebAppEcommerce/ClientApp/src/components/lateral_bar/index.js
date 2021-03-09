﻿
import React, { Component} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from './actions';
import { Link } from "react-router-dom";
import { usuarioActions } from '../usuario/actions';
import { withRouter } from 'react-router-dom';
import { loader } from '../helpers/loader';
import { VentanaPrincipalActions } from '../ventana_principal/actions';
import { Row, Col } from 'react-bootstrap';

 class MenuLateral extends Component {
   
    node = React.createRef();

    state = {
        idItemActive: '',
        esPrincipal: false
    }

    constructor(props) {
        super(props);
        this.ItemClick = this.ItemClick.bind(this);
        this.Logout = this.Logout.bind(this);
        this.BackPage = this.BackPage.bind(this);
        
     }

  


     componentDidMount() {
         loader.hide();
       
    }

      cargarItemsMenu() {
        
          this.props.obtener_formularios(this.props.user.Codigo, this.props.esPrincipal);
     }
     

     componentWillReceiveProps(nextProps) {
         if (this.props.esPrincipal !== nextProps.esPrincipal) {
             this.setState({ esPrincipal: nextProps.esPrincipal, idItemActive: '' }, () => {
                 this.cargarItemsMenu();
                
             });
         
         }

     }

    //Eventos
    //------------------------------------------------------------

    //componentWillMount(prevProps) {
    //    document.addEventListener('mousedown', this.OcultarMenuOutClick, false);

    //}
    //componentWillUnmount(prevProps) {
    //    document.removeEventListener('mousedown', this.OcultarMenuOutClick, false);
    //}


    //EVENTO PARA DETECTAR EL CLICK POR FUERA DEL ITEM DEL MENÚ LATERAL
    //OcultarMenuOutClick = e => {
    //    e.stopPropagation();
    //    e.preventDefault();

      
    //     //Evita que los hijos del elemento disparen este evento.//Puede Mejorar
    //    if (this.node.contains(e.target) || e.target.id === 'sidebarCollapse' || e.target.id === 'btncollapse') {
    //        return;
    //    }
    //    console.log(localStorage.getItem('EsMovil'));
    //    if  (localStorage.getItem('EsMovil') === 'true') {
    //        this.props.lateral_bar_visible('noActive');
    //    }
        
    //}

    Logout(e) {
        e.preventDefault();
        this.props.logout(this.props.history);
       

     }

     BackPage(e) {
         e.preventDefault();
         this.props.es_paginaprincipal(true);
         localStorage.removeItem("codigoSede");
     }
      


    ItemClick = e => {
        e.stopPropagation();
        e.preventDefault();

        if (this.state.idItemActive !== '') {

            document.getElementById(this.state.idItemActive).classList.remove("itemActive");
        }

        this.setState({ idItemActive: e.target.id });
        document.getElementById(e.target.id).classList.add("itemActive");
       

        if (localStorage.getItem('EsMovil')==='true') {
            this.props.lateral_bar_visible('noActive');
        }
    }



    

    render() {
       
        const { menuLateralVisible } = this.props;
      
        
       
        return (
            <nav id="sidebar" className={menuLateralVisible} >
                <div className="menu-lateral">
                    <ul className="list-unstyled components">
                        <li onClick={this.ItemClick} id='itemMenu1' >
                            <Link to="/usuarios" id='itemMenu1' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu1' className="justify-content-md-center"><i className='fa fa-user' id='itemMenu1' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu1'>Usuarios</Col>
                                </Row>
                            </Link>
                        </li>
                        <li onClick={this.ItemClick} id='itemMenu2' >
                            <Link to="/categorias" id='itemMenu2' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu2' className="justify-content-md-center"><i className='fa fa-cog' id='itemMenu2' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu2'>Categorias</Col>
                                </Row>
                            </Link>
                        </li>
                        <li onClick={this.ItemClick} id='itemMenu3' >
                            <Link to="/opciones" id='itemMenu3' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu3' className="justify-content-md-center"><i className='fa fa-cog' id='itemMenu3' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu3'>Opciones</Col>
                                </Row>
                            </Link>
                        </li>

                        <li onClick={this.ItemClick} id='itemMenu4' >
                            <Link to="/productos" id='itemMenu4' >
                                <Row>
                                    <Col xs={3} md={3} id='itemMenu4' className="justify-content-md-center"><i className='fa fa-cog' id='itemMenu4' aria-hidden="true"></i></Col>
                                    <Col xs={9} md={9} className="text-left" id='itemMenu4'>Productos</Col>
                                </Row>
                            </Link>
                        </li>



                    </ul>
                </div>
                <ul className="btn-session">
                    <li>

                      
                            <button onClick={this.Logout} className="btn btn-3d-style btn-default-pz  btn-block"> Cerrar Sesión </button> 
                            
                        
                    </li>
                </ul>
            </nav>
             
            
        );
    }
}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {
    const { esPrincipal } = state.ventanaPrincipalReducer;
    const { menuLateralVisible, formularios } = state.lateralBarReducer;
   
    return {
        menuLateralVisible,
        formularios,
        esPrincipal,
    };


};


const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible,
    obtener_formularios: LateralBarActions.obtener_formularios,
    logout: usuarioActions.logout,
    es_paginaprincipal: VentanaPrincipalActions.es_paginaprincipal
    
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuLateral));