import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { cardActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search } from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Crear from './ventanas_emergentes/crear';
import Editar from './ventanas_emergentes/editar';
import DeleteIcon from '@material-ui/icons/Delete';




class Cards extends Component {

      grid = React.createRef();

    constructor(props) {
        super(props);
        
        this.searchOptions = {
            fields: ['Titulo'],
            operator: 'contains'
        };

       

        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);

        

        
    }

 

    async componentDidMount() {

        loader.hide();
        await this.props.obtener_cards();
        console.log(this.props.obtener_cards());

                  
    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre ")
    } 

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnNuevo") {

            this.props.ver_crear(true);

        } else if (e.currentTarget.id === "btnEditar") {
            if (this.props.id_card_seleccionada !== 0) {
                this.props.ver_editar(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizar") {
            loader.show();
            this.props.obtener_cards();
        }
        else if (e.currentTarget.id === "btnEliminar") {
            loader.show();
            this.props.eliminar_card(this.props.id_card_seleccionada, this);
            this.props.obtener_cards();
        }
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }

     rowSelected(e) {
        if (this.grid) {
            let card = this.grid.current.getSelectedRecords();
            this.props.card_seleccionada(card[0].IdCard);
        }
    }

    rowDeselected(e) {
        if (this.grid) {
            this.props.card_seleccionada(0);
        }
    }

     filterTemplate() {

         return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }
    

    render() {
        const { cards, mostrar_crear, mostrar_editar} = this.props;
       
       
        return (
            <div>
                <nav id="nav" className="nav-form navbar bg-light ">
                        <div className="row col-12" >
                           
                        <div className=" col-sm-12 col-md-5 col-lg-7 d-flex justify-content-center align-items-center" >
                            <h3>Cards</h3>
                                </div>

                        <div className=" col-sm-12 col-md-7 col-lg-5 d-flex justify-content-end" >
                                <ul >
                                <li>
                                    <button id="btnNuevo" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style-pz btn-block">
                                        <div>
                                            <AddIcon  />
                                        </div>
                                        </button>
                                    </li>
                                    <li >
                                    <button id="btnEditar" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style-pz btn-block">
                                      
                                        <div>
                                            <EditIcon />
                                        </div>
                                        </button>
                                    </li>
                                    <li>
                                    <button id="btnActualizar" onClick={this.MenuOptionClick}  className="btn btn-3d-style btn-metro-style-pz btn-block">
                                       
                                        <div>
                                            <UpdateIcon />
                                        </div>
                                           
                                        </button>
                                </li>
                                <li >
                                    <button id="btnEliminar" onClick={this.MenuOptionClick} className="btn btn-3d-style btn-metro-style-pz btn-block">

                                        <div>
                                            <DeleteIcon />
                                        </div>
                                    </button>
                                </li>

                                </ul>
                                </div>

                           
                    </div>
              
            </nav>

                <div className='wrap-form table-responsive container-fluid'>
                    <GridComponent dataSource={cards} ref={this.grid} rowDeselected={this.rowDeselected} rowSelected={this.rowSelected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field='Titulo' width='200' headerText='Titulos' />
                     
                        </ColumnsDirective>
                        <Inject services={[Search, Toolbar]} />
                    </GridComponent>
                </div>
                    {mostrar_crear ?
                    <Crear
                        show={mostrar_crear}
                        onHide={() => this.props.ver_crear(false)}
                    />: " "
                        
                }

                {mostrar_editar  ?
                    <Editar
                        show={mostrar_editar}
                        onHide={() => this.props.ver_editar(false)}
                    /> : " "

                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { cards, mostrar_crear, mostrar_editar, id_card_seleccionada, card_eliminada } = state.cardReducer;
    return { cards, mostrar_crear, mostrar_editar, id_card_seleccionada, card_eliminada };
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_cards: cardActions.obtener_cards,
    ver_crear: cardActions.ver_crear,
    ver_editar: cardActions.ver_editar,
    card_seleccionada: cardActions.card_seleccionada,
    eliminar_card: cardActions.eliminar_card
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cards));