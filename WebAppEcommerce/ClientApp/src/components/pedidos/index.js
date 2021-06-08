import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { pedidosActions } from './actions';
import { loader } from '../helpers/loader';
import { alertActions } from '../alerts_message/actions';
import { ColumnDirective, ColumnsDirective, GridComponent, Toolbar, Inject, Search, Page } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Tabs from 'react-responsive-tabs';
import './style.scss';
import Detalle from './detalle';


class Pedidos extends Component {

    grid = React.createRef();

    constructor(props) {
        super(props);

        this.searchOptions = {
            fields: ['Solicitante'],
            operator: 'contains'
        };

        this.state = {
            tabs: [
                { name: 'Todos', id: 0 },
                { name: 'Recibidos', id: 1 },
                { name: 'Preparación', id: 2 },
                { name: 'Enviados', id: 3},
            ],
           
            idEstado:0

        }
        this.toolbarOptions = ['Search'];
        this.rowSelected = this.rowSelected.bind(this);
        this.filterTemplate = this.filterTemplate.bind(this);
        this.change = this.change.bind(this);




    }

    async componentDidMount() {


        setInterval(async () => {
            await  this.props.obtener_pedidos(this.state.idEstado, this);
            this.agregarBurbuja();
        }, 5000);
       
        loader.hide();
       
      await  this.props.obtener_pedidos(this.state.idEstado, this);
       
    }

    audioNotification() {
        var audio = document.getElementById("audio");
        audio.play();
    }

    agregarBurbuja() {

        const tab1 = document.getElementById("tab-1");
        const tab2 = document.getElementById("tab-2");
        const tab3 = document.getElementById("tab-3");

        const b1 = document.getElementById("b-1");
        const b2 = document.getElementById("b-2");
        const b3 = document.getElementById("b-3");

        let content1="", content2 = "", content3 = "";
       
       
        if (b1 != null && b2 != null &&  b3 != null) {
            
            b1.remove();
            b2.remove();
            b3.remove();
        }

        content1 = `<span id='b-1' > <span class='burbuja1 estado-recibido   fa fa-circle'></span> (${this.props.recibidos})</span>`;
        content2 = `<span id='b-2' > <span class='burbuja2 estado-pendiente fa fa-circle'></span> (${this.props.pendientes})</span>`;
        content3 = `<span id='b-3' > <span class='burbuja3 estado-enviado fa fa-circle'></span> (${this.props.enviados})</span>`;

        if (tab1 != null && tab2 != null && tab3 != null) {

            tab1.innerHTML += content1;
            tab2.innerHTML += content2;
            tab3.innerHTML += content3;
        }

       
    }

    created(args) {
        document.getElementsByClassName("e-search")[0].getElementsByClassName("e-input")[0].setAttribute("placeholder", "Buscar por  Nombre ");
    }

    clearFilter(e) {
        this.grid.current.clearFiltering();
    }

    rowSelected(e) {
        if (this.grid) {
            let pedido = this.grid.getSelectedRecords();
            this.props.seleccionar_pedido(pedido[0].IdPedido);
            this.props.mostrar_detalle_pedido(true);
          
        }
    }

    rowDataBound(args) {
        if (args.row) {
            if (args.data.IdEstado === 1) {
                args.row.classList.add('estado-recibido');
            } else if (args.data.IdEstado === 2) {
                args.row.classList.add('estado-pendiente');
            } else if (args.data.IdEstado === 3) {
                args.row.classList.add('estado-enviado');
            }
            
        }
    }


 

    filterTemplate() {
        return (<ButtonComponent onClick={this.clearFilter.bind(this)} ></ButtonComponent>);
    }

    onLoad() {
        if (this.grid.current) {
            const rowHeight = this.grid.current.getRowHeight();
            const gridHeight = this.grid.current.height;
            const pageSize = this.grid.current.pageSettings.pageSize ;
            const pageResize = (gridHeight - (pageSize * rowHeight)) / rowHeight;
            this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
        }
    }

    getTabs() {
     
        const contend = (idEstado, index) => {
         this.agregarBurbuja();
         return   <div id="grid-pedidos" className='wrap-form table-responsive container-fluid'>
             <GridComponent dataSource={this.props.pedidos} rowDataBound={this.rowDataBound} ref={grid => this.grid = grid} allowPaging={true} toolbar={this.toolbarOptions}  rowSelected={this.rowSelected} searchSettings={this.searchOptions} created={this.created.bind(this)} >
                 <ColumnsDirective>
                     <ColumnDirective field='Solicitante' width='200' headerText='Solicitante' />
                     <ColumnDirective field='FechaHoraPedido' headerText='Hora Pedido' type="datetime" format='MM/dd/yyyy HH:mm:ss' width='170'></ColumnDirective> 
                    </ColumnsDirective>
                    <Inject services={[Search, Toolbar, Page]} />
                </GridComponent>
            </div>

        };

        return this.state.tabs.map((tabPedido, index) => ({
            title: tabPedido.name,
            getContent: () => contend(tabPedido.id,index),
            key: index,
            tabClassName: 'tab',
            panelClassName: 'panel',
        }));
    }

    async change(e) {
        this.setState({ idEstado: e });
        await this.props.obtener_pedidos(e, this);  
    }



    render() {
        return (
            <div>
                <nav id="nav" className="nav-form navbar bg-light ">
                    <div className="row col-12" >
                        <div className=" col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center" >
                            <h3>Pedidos</h3>
                        </div>
                    </div>
                </nav>
                <Tabs items={this.getTabs()} onChange={this.change} />


                {
                    this.props.mostrar_detalle ?
                        <Detalle
                            IdEstado={this.state.idEstado}
                        show={this.props.mostrar_detalle}
                        onHide={() => this.props.mostrar_detalle_pedido(false)}
                    /> : " "

                }

           
    
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { pedidos, mostrar_detalle, pendientes, recibidos, enviados } = state.pedidosReducer;
    return { pedidos, mostrar_detalle, pendientes, recibidos, enviados};
}


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtener_pedidos: pedidosActions.obtener_pedidos,
    mostrar_detalle_pedido: pedidosActions.mostrar_detalle_pedido,
    seleccionar_pedido: pedidosActions.seleccionar_pedido,
    cambiar_estado_pendiente: pedidosActions.cambiar_estado_pendiente,
    cambiar_estado_recibido: pedidosActions.cambiar_estado_recibido,
    cambiar_estado_enviado: pedidosActions.cambiar_estado_enviado,
    
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pedidos));