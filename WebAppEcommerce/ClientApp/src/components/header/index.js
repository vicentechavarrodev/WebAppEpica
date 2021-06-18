import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { LateralBarActions } from '.././lateral_bar/actions';
import MenuIcon from '@material-ui/icons/Menu';
import { horarioActions } from '../horario/actions';
import { withRouter } from "react-router-dom";
import Logo from '../../imagenes/pagina/logoEpica.webp';
import { Link } from "react-router-dom";
import { loader } from '../helpers/loader';


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
                       dia: 'Miércoles'
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
                    dia: 'Sábado'
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
        return horaFormat + ":" + minutos + ((hora < 12 || hora === 24) ? "AM" : " PM") ;
    }

   
    validarRango() {
       
        const obtencion = new Date();
        const { verificar } = this.state;
        const dia_semana = this.state.dias.find(element => element.id === this.state.verificar.dia);
        const verificar_dia = this.props.horarios.find(element => element.Dia === dia_semana.dia);
        if (verificar_dia == undefined) {
            this.props.ver_rango('dia');
        } else {
            this.props.horarios.forEach(element => {

                if (dia_semana.dia === element.Dia) {
                    const hour = obtencion.getHours();
                    const minutes = obtencion.getMinutes();
                    const hora_actual = hour + ":" + minutes;
                    const hi =this.ConvertirFormato12h(element.HoraInicial);
                    const hf = this.ConvertirFormato12h(element.HoraFinal);
                    this.setState({
                        verificar: {
                            ...verificar,
                            dia: dia_semana.dia,
                            hora_inicio: hi,
                            hora_final: hf
                        }
                    })
                                  
                    if (element.HoraFinal.slice(11, -6) == '00') {
                         element.HoraFinal = "2021-06-08T24:00:00";
                    }
                    if (hora_actual >= element.HoraInicial.slice(11, -3) && hora_actual <= element.HoraFinal.slice(11, -3)) {
                        console.log('entra')
                        this.props.ver_rango('true');
                        return;

                    } else {
                        this.props.ver_rango('false');

                    }
                }




            }, this

            );
           
            

        }
        console.log(this.props.horario_rango);
    
     
     
        
      
      
        
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
                            <div className="nav-sm ml-lg-5">
                                <Link to="/pagina" className="navbar-brand">
                                    <img src={Logo} alt="Epica Logo" width="100%" height="100%" />
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
                                    <Link to="/pizzerias-abiertas-hoy" className="nav-link">Novedades</Link>
                                </li>
                                <li className="nav-item" id='compania'>
                                    <Link to="/pizza-de-hornos" className="nav-link">Compañia</Link>
                                </li>
                                <li className="nav-item" id='pideLinea'>
                                    <Link to="/pizza-artesanal-neiva" className="nav-link last-link">Pide en Linea</Link>
                                 </li>
                              
                            </ul>
                           :
                           ""
                            }
                   
                
                    </div>
                  
          
                </div>
                {this.props.visiblePagina === 'true' ?

                    this.props.horario_rango === 'false' ?
            
                        <div className="marquee">
                            {typeof verificar.dia === 'string'?

                                <p>El Horario de hoy {verificar.dia} es de {verificar.hora_inicio} a {verificar.hora_final}</p>
                                :
                                ""
                             }
                   </div>
                            :
                            

                    this.props.horario_rango === 'dia' ?
                       <div className="marquee">
                         <p>No tenemos servicio el dia de hoy, te esperamos pronto!</p>
                       </div>
                    :
                    this.props.horario_rango === 'true' ?""
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
