import React, { Component } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { alertActions } from '../alerts_message/actions';
import { withRouter } from "react-router-dom";
import { categoriaActions } from '../categorias/actions';
import { productoActions } from '../productos/actions';
import { Modal, ListGroup} from 'react-bootstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { opcionActions } from '../opciones/actions';

class ProductoModal extends Component {

    constructor(props) {
        super(props);
        this.state={
            total:0
        }
    
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

   async componentDidMount() {

       await this.props.obtener_opciones_producto(this.props.id_producto_seleccionado,true, this);
      
              
    }

    handleRadioChange(event) {
        var option = JSON.parse(event.target.value);
        if (option.MuestraSecundario) {

            let id = option.ProductoOpcionTipoOpciones[0].IdTipoOpcion;
        } 
        
    }
    render() {

        const useStyles = makeStyles({
            root: {
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            },
            icon: {
                borderRadius: '50%',
                width: 20,
                height: 20,
                boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
                backgroundColor: '#f5f8fa',
                backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))'
               
            },
            checkedIcon: {
                backgroundColor: '#b3191f',
                backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))'
            
            },
        });

        const StyledRadio = (props) =>  {
            const classes = useStyles();

            return (
                <Radio
                    className={classes.root}
                    disableRipple
                    color="default"
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    {...props}
                />
            );
        }

        const OptionItem = ({ opcion, index }) => {
            var op = JSON.stringify(opcion)
            console.log(opcion);
           return (<div className="row-size">
                    <div className="col-8 col-radio">
                       <FormControlLabel key={index} value={op} control={<StyledRadio />} label={opcion.Opcion.NombreAlias} />
                    </div>
                    <div className="col-3 col-price-modal">
                        {opcion.Opcion.Precio}
                    </div>
                </div>)

        }


        const OptionItems = ({ opciones, index }) => {
          
            return (
                <ListGroup.Item key={index} className=" pl-0 pr-0">
                    <div>
                        <p>Elige el tamaño que deseas </p>
                        <RadioGroup defaultValue="1" name="customized-radios" onChange={this.handleRadioChange}>
                            {
                                opciones.map((opcion,i ) => {

                                    return <OptionItem opcion={opcion} index={i} key={i} />;
                                })
                            }
                         </RadioGroup>
                    </div>

                </ListGroup.Item>

            )
           

        }
   

        return (

           
            
            <Modal
                show={this.props.show}
                onHide={() => this.props.ver_crear(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                
            >        
                 
                 <div>
                      
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{this.props.opciones_producto.Nombre}</h5>
                             <button type="button" onClick={this.props.onHide} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div className="modal-body">
                        <div className="container-scroll p-1 ">
                                    <div className="row row-modal">
                                        <div className="col-lg-6 col-12 col-image">
                                            <img className="image-add" src={`${process.env.REACT_APP_API_URL}app-images/${this.props.opciones_producto.UrlImagen}`} alt="producto" />
                                        </div>
                                        <div className="col-lg-6 col-12">
                                        <p>{this.props.opciones_producto.Descripcion}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-size p-0 scroll-content">
                                {this.props.opciones_producto.VistaProductoOpciones != null && this.props.opciones_producto.VistaProductoOpciones.length > 0?
                                    <ListGroup variant="flush" >
                                        {
                                            
                                            this.props.opciones_producto.VistaProductoOpcionesGroup.map(function (opciones,index) {
                                              
                                                return <OptionItems opciones={opciones} index={index} /> 

                                            })
                                        }

                                       
                                        
                                    </ListGroup>
                                    :""

                                }
                       


                            </div>
                        </div>
                       
                    </div>
                 
                </div>
                 
                <div className="modal-footer">
                    <div className="container container-footer">
                        <div className="row row-footer ">
                            <div className="col-sm-12 col-lg-6">

                                <div className="row h-100 p-1">
                                    <div className="col-4 col-cantidad align-items-center">
                                        <a className="btn btn-default btn-3d-style  btn-block" >
                                            <RemoveIcon />
                                        </a>
                                    </div>
                                    <div className="col-4 d-flex align-items-center mt-2 mb-2 justify-content-center ">
                                        1
                                              </div>
                                    <div className="col-4 col-cantidad">
                                        <a className="btn btn-default btn-3d-style  btn-block" >
                                            <AddIcon />
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-3 col-value  d-flex align-items-center justify-content-center font-weight-bold">
                                {this.state.total}
                            </div>
                            <div className="col-sm-12 col-lg-3 p-1 ">
                                <a className="btn btn-default btn-3d-style  btn-block" >
                                    <i className="fa fa-cart-plus"></i>
                                            Agregar
                                 </a>

                            </div>
                        </div>
                    </div>
                </div>
               
            </Modal>

           
           

                          



        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    const { categorias } = state.categoriaReducer;
    const { opciones_producto, id_producto_seleccionado } = state.productoReducer;
    const { mostrar_opciones } = state.opcionesReducer;
    return { loggingIn, user, categorias, opciones_producto, id_producto_seleccionado, mostrar_opciones};
};


const mapDispatchToProps = {
    showMessage: alertActions.showMessage,
    obtenerCategorias: categoriaActions.obtener_categorias,
    obtener_opciones_producto: productoActions.obtener_opciones_producto,
    ver_crear: productoActions.ver_crear,
    ver_opciones: opcionActions.ver_opciones
    
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductoModal));