
import React, { Component} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from './actions';
import { Link } from "react-router-dom";
import IconToggle from '../../imagenes/generales/arrow_right.png';
import { usuarioActions } from '../usuario/actions';
import { withRouter } from 'react-router-dom';
import { loader } from '../helpers/loader';
import { VentanaPrincipalActions } from '../ventana_principal/actions';


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
        loader.show();
        this.cargarItemsMenu();
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
       
        const { menuLateralVisible, formularios, user, esPrincipal } = this.props;
      
        
       
        return (
            <nav ref={node => this.node = node} id="sidebar" className={menuLateralVisible} >

                <div className="menu-lateral">
                    <ul className="list-unstyled components">

                        {
                            formularios.map(({ Nombre, Codigo, TieneSubItems, Subitems, URLIcono, URLFormulario }, i) => (
                                <li key={i}   >
                                    {
                                        URLFormulario !== '' ?
                                            <div onClick={this.ItemClick} >
                                                <Link to={URLFormulario} id={'itemMenu' + Codigo}  > <img alt="icono3" className='icon-l' src={require(`../../imagenes/${URLIcono}`)} />{Nombre}</Link>
                                            </div>
                                            :
                                            <a href={'#itemMenu' + Codigo} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                                <img className='icon-l' alt="icono1" src={require(`../../imagenes/${URLIcono}`)} />
                                                {Nombre} {TieneSubItems ? <img className='icon' alt="icono2" src={IconToggle} /> : ''}
                                            </a>
                                    }

                                    <ul className="collapse list-unstyled " data-parent="#sidebar" id={'itemMenu' + Codigo}>
                                        {Subitems.map((item, j) =>
                                            <li key={j} onClick={this.ItemClick}  > <Link to={item.URLFormulario} id={'itemMenu' + item.Codigo}  ><img alt="icono5" className='icon-l' src={require(`../../imagenes/${item.URLIcono}`)} />{item.Nombre}</Link> </li>)
                                        }
                                    </ul>
                                </li>

                            ))
                        }
                    </ul>

                   

                </div>
                <ul className="btn-session">
                    <li>

                        {user.IdRole === 4 || esPrincipal?
                            <button onClick={this.Logout} className="btn btn-3d-style btn-default-pz  btn-block"> Cerrar Sesión </button>:
                            <button onClick={this.BackPage} className="btn btn-3d-style btn-default-pz  btn-block"> Atras </button>
                         }
                    </li>
                </ul>
        </nav>
             
            
        );
    }
}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {
    const { esPrincipal } = state.ventanaPrincipalReducer;
    const { loggingIn, user } = state.authentication;
    return {

        menuLateralVisible: state.lateral_bar_reducers.menuLateralVisible,
        formularios: state.lateral_bar_reducers.formularios,
        esPrincipal,
        user
    };


};


const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible,
    obtener_formularios: LateralBarActions.obtener_formularios,
    logout: usuarioActions.logout,
    es_paginaprincipal: VentanaPrincipalActions.es_paginaprincipal
    
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuLateral));