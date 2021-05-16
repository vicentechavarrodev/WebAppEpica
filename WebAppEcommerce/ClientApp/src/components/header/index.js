import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { horarioActions } from '../horario/actions';
import { withRouter } from "react-router-dom";
import Logo from '../../imagenes/pagina/logoEpica.png';
import iconMenu from '../../imagenes/pagina/pizza-box-menu.png';
import { Link } from "react-router-dom";
import { loader } from '../helpers/loader';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

class Header extends Component {

    constructor() {
        const fecha_actual = new Date();
         super();
        this.state = {


            dias: [
                {
                    id: 0,
                    dia: 'Domingo'
                },
                 {
                    id: 1,
                    dia: 'Lunes'
                },
                  {
                    id: 2,
                    dia: 'Martes'
                },
                   {
                    id: 3,
                    dia: 'Miercoles'
                },
                    {
                    id: 4,
                    dia: 'Jueves'
                },
                     {
                    id: 5,
                    dia: 'Viernes'
                },
                 {
                    id: 6,
                    dia: 'Sabado'
                }
                       
            ] ,
            verificar: {
                dia: fecha_actual.getDay(),
                hora_inicio: '',
                hora_final:'',
           }
            
        };

        this.MostrarMenu = this.MostrarMenu.bind(this);
        this.AbrirLogin = this.AbrirLogin.bind(this);
        this.validarRango = this.validarRango.bind(this);
        this.menuVisible = this.menuVisible.bind(this);
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
    menuVisible() {

        const ocult = document.getElementById('ocult-menu');
        if (ocult.style.display = 'none') {
            ocult.style.display = 'inline';
        } 

    }

  

    ConvertirFormato12h(time) {
        let minutos = time.slice(14, -3);
        let hora = time.slice(11, -6);
        let horaFormat = (hora % 12) || 12 ;
        return horaFormat + ":" + minutos + ((hora < 12 || hora === 24) ? " AM" : " PM") ;
    }

   
    validarRango() {
       
        const obtencion = new Date();
        const { verificar } = this.state;
        const dia_semana = this.state.dias.find(element => element.id === this.state.verificar.dia);
        this.props.horarios.forEach(element => {
            if (dia_semana.dia === element.Dia) {
                const hour = obtencion.getHours();
                const minutes = obtencion.getMinutes();
                const hora_actual = hour + ":" + minutes;
                const hi = this.ConvertirFormato12h(element.HoraInicial);
                const hf = this.ConvertirFormato12h(element.HoraFinal);
                this.setState({
                    verificar: {
                        ...verificar,
                        dia: dia_semana.dia,
                        hora_inicio: hi,
                        hora_final: hf
                    }
                })
               if (hora_actual >= element.HoraInicial.slice(11, -3) && hora_actual <= element.HoraFinal.slice(11, -3)) {
                   this.props.ver_rango('true');
                  

                } else {
                    this.props.ver_rango('false');
                }
            }
        },this

        );
        
    }

    async componentDidMount() {

        loader.hide();
        await this.props.obtener_horarios();
        this.validarRango();
       
        

    }


    //---------------------------------------------------------------
    render() {
        const {
            verificar,
        } = this.state;
     
        return (

            <nav id="header" className="navbar navbar-color navbar-expand-lg fixed-top navbar-expand-sm navbar-light">
                <div className="container-fluid container-nav">

                    {
                        this.props.visiblePagina === "true" ?
                            <div className="nav-sm nav-icon">
                                <Link to="/pagina" className="navbar-brand">
                                    <img src={Logo} alt="Epica Logo"  />
                                </Link>

                                <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={this.menuVisible} data-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                 
                                  <i className="fa fa-bars" aria-hidden="true"></i>
                             </button>
                            </div>


                            :
                            <button type="button" id="sidebarCollapse" value="collapse" className="btn btn-default" onClick={this.MostrarMenu}>
                                <MenuIcon id="btncollapse" visibility={this.props.iconMenuVisible}/>
                            </button>
                   }
                        
                    <div className="collapse navbar-collapse" id="navbar">
                        <div className="ocult-menu" id="ocult-menu" data-toggle="collapse" data-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        </div>
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
                {this.props.visiblePagina === 'true' ?
                    this.props.horario_rango === 'false' ?
                        !this.verificar?
                        <div className="marquee">
                            <p>El Horario de hoy {verificar.dia} es desde las {verificar.hora_inicio} hasta las {verificar.hora_final}</p>
                            </div>
                            :
                            ""
                        :
                        ""
                    :
                    ""
                }
            </nav>

        )
    }

}

//-------------------------------Redux------------------------

const mapStateToProps = (state) => {

    const { menuLateralVisible } = state.lateralBarReducer;
    const { horarios, horario_rango} = state.horarioReducer;

    return {
        menuLateralVisible,
        horarios,
        horario_rango,
    };


};

const mapDispatchToProps = {
    lateral_bar_visible: LateralBarActions.lateral_bar_visible,
    obtener_horarios: horarioActions.obtener_horarios,
    ver_rango: horarioActions.ver_rango,
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
