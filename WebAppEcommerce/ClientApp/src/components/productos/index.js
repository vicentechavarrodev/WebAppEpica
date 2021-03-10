import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { productoActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, Group } from '@syncfusion/ej2-react-grids';
import AddIcon from '@material-ui/icons/AddSharp';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Crear from './ventanas_emergentes/crear';
import Editar from './ventanas_emergentes/editar';
import PostAddIcon from '@material-ui/icons/PostAdd';




class Productos extends Component {

    grid = React.createRef();

    details = React.createRef();

    constructor(props) {
        super(props);
        
        this.searchOptions = {
            fields: ['Nombre'],
            operator: 'contains'
        };

        this.groupOptions = {
            columns: ['tipoOpcion.Nombre'],
            showDropArea: false
           
        };

       

        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.rowDeselected = this.rowDeselected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.MenuOptionClick = this.MenuOptionClick.bind(this);
        this.template = this.gridTemplate.bind(this);; 
        this.showDetails = this.showDetails.bind(this);
        

        
    }

 

    componentDidMount() {

        loader.hide();
        this.props.obtener_productos();
        
    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre ")
    } 

    MenuOptionClick(e) {
        if (e.currentTarget.id === "btnNuevo") {

            this.props.ver_crear(true);

        } else if (e.currentTarget.id === "btnEditar") {
            if (this.props.id_producto_seleccionado !== 0) {
                this.props.ver_editar(true);
            } else {
                this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
            }
        } else if (e.currentTarget.id === "btnActualizar") {
            loader.show();
            this.props.obtener_productos();
        }
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }

    showDetails(e) {
        if (e.currentTarget.id !== 0) {
            this.props.history.push({ pathname: '/details', IdProducto: e.currentTarget.id });
        } else {
            this.props.showMessage('Debe seleccionar un item de la rejilla.', true, 'Información');
        }


      
      
    }

     rowSelected(e) {
        if (this.grid) {
            let producto = this.grid.current.getSelectedRecords();
            this.props.producto_seleccionado(producto[0].IdProducto);
        }
    }

    rowDeselected(e) {
        if (this.grid) {
            this.props.producto_seleccionado(0);
        }
    }

     filterTemplate() {

         return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }

    gridTemplate(props) {
        
        return (
            <button type="submit" ref={this.details} id={props.IdProducto} onClick={this.showDetails} className="btn btn-default-pz btn-3d-style  btn-block"> <PostAddIcon /> </button>
           
        );

    }
    

    render() {
        const { productos, mostrar_crear, mostrar_editar} = this.props;
       
       
        return (
            <div>

                <nav id="nav" className="nav-form navbar bg-light ">
                        <div className="row col-12" >
                           
                        <div className=" col-sm-12 col-md-5 col-lg-7 d-flex justify-content-center align-items-center" >
                            <h3>Productos</h3>
                                </div>

                        <div className=" col-sm-12 col-md-7 col-lg-5 d-flex center-element" >
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

                                </ul>
                                </div>

                           
                    </div>
              
            </nav>

                <div className='wrap-form table-responsive container-fluid'>
                    <GridComponent dataSource={productos} ref={this.grid}  rowDeselected={this.rowDeselected} rowSelected={this.rowSelected} toolbar={this.toolbarOptions} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                        <ColumnsDirective>
                            <ColumnDirective field='Nombre' width='200' headerText='Nombre' />
                            <ColumnDirective field='Precio' width='200' headerText='Precio' />
                            <ColumnDirective width='70' template={this.template} textAlign='Center' />
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


                {mostrar_editar ?
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
    const { productos, mostrar_crear, mostrar_editar, id_producto_seleccionado } = state.productoReducer;
    return { productos, mostrar_crear, mostrar_editar, id_producto_seleccionado };
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_productos: productoActions.obtener_productos,
    ver_crear: productoActions.ver_crear,
    ver_editar: productoActions.ver_editar,
    producto_seleccionado: productoActions.producto_seleccionado
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Productos));