import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import { ListGroup, Col,Row } from 'react-bootstrap';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Slider from "@material-ui/core/Slider";
import Mitad1 from '../../imagenes/generales/mitad1.png';
import Mitad2 from '../../imagenes/generales/mitad2.png';
import Toda from '../../imagenes/generales/toda1.png';

function valueLabelFormat(value) {
    return ``;
}



const marks = [
    {
        value: 0,
        label: <img src={Mitad1} alt="Epica Logo" width="16" height="16" />
        },
    {
        value: 50,
        label: <img src={Toda} alt="Epica Logo" width="16" height="16" />
    },
    {
        value: 100,
        label: <img src={Mitad2} alt="Epica Logo" width="16" height="16" />
    }
];

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

const StyledRadio = (props) => {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}



const OptionItemRdio = ({ opcion, index, CambioSeleccion, Deseleccionar }) => {
    var op = JSON.stringify(opcion)
   
    return (<div className="row-size" key={index}>
        <div className="col-7 col-radio ml-0">
            <FormControlLabel key={index} value={op}  checked={CambioSeleccion(opcion)}
                onClick={(e) => Deseleccionar(e,opcion)}
                control={<StyledRadio />} label={opcion.Opcion.NombreAlias} />
        </div>
        <div className="col-4 col-price-modal">
              {opcion.Opcion.Precio === 0 ?
                "" : `$ ${opcion.Opcion.Precio}`

            }
        </div>
    </div>)

}


const OptionItems = ({ opciones, index, HandleRadioChange, CambioSeleccion, Deseleccionar, HandleIncreChange, cantidad, AgregarAdicion,defaultValue }) => {


 

    return (
        <ListGroup.Item id={`${opciones[0].ProductoTipoOpcion.IdTipoOpcion}-item-op`} key={opciones[0].ProductoTipoOpcion.IdTipoOpcion} className={`${opciones[0].ProductoTipoOpcion.MostrarInicio ? "" : "option-show"} pl-sm-0 pr-sm-0 `}>
            <div>
                {opciones[0].ProductoTipoOpcion.IdTipoSeleccion === 1 ?
                    <div>
                       <p>{opciones[0].ProductoTipoOpcion.Encabezado}</p>
                         <RadioGroup name={opciones[0].ProductoTipoOpcion.IdTipoOpcion} onChange={HandleRadioChange} >
                        {
                            opciones.map((opcion, i) => {
                               
                                return <OptionItemRdio opcion={opcion}  CambioSeleccion={CambioSeleccion} index={i} key={i} Deseleccionar={Deseleccionar} />;
                            })
                        }
                        </RadioGroup> 
                        
                        </div>: ""
                }

                {opciones[0].ProductoTipoOpcion.IdTipoSeleccion === 2 ?
                    
                    <div className="p-1">
                        <p className="m-3">{opciones[0].ProductoTipoOpcion.Encabezado}</p>
                        <div name={opciones[0].ProductoTipoOpcion.IdTipoOpcion} >
                            {
                                opciones.map((opcion, i) => {

                                    return <div>
                                    <Row className="mt-2 mb-1">
                                        <Col className="col-4"><h6>{opcion.Opcion.NombreAlias}</h6></Col>
                                        <Col className="col-3"><h6> $ {opcion.Opcion.Precio}</h6></Col>
                                        <Col className="col-4 ">
                                            <Row>
                                                    <Col className="col-3 p-sm-0 d-flex justify-content-center align-items-center">
                                                    <a className=" btn-default btn-3d-style  btn-block " name="cant-menos" onClick={(e) => HandleIncreChange(e, opcion)} >
                                                        <RemoveIcon />
                                                    </a>
                                                </Col>
                                                <Col className="col-6 d-flex justify-content-center" id={`${opcion.IdProductoOpciones}-item-op-var`}> 0 </Col>

                                                <Col className="col-3 p-0 d-flex justify-content-center align-items-center">
                                                    <a className=" btn-default btn-3d-style  btn-block" name="cant-mas" onClick={(e) => HandleIncreChange(e, opcion)} >
                                                        <AddIcon />
                                                    </a>
                                                </Col>
                                            </Row>

                                           
                                            
                                          
                                        </Col>
                                        </Row>
                                        <Row key={opcion.IdProductoOpciones} id={`${opcion.IdProductoOpciones}-item-add`} className="option-show d-flex m-1" >
                                            <Col className="col-6 text-center "  >
                                                <h6> ¿En que parte de la pizza?</h6>
                                              
                                            </Col>
                                            <Col className="col-6"  >

                                                <Slider
                                                    onChangeCommitted={(e, value) => AgregarAdicion(e, value, opcion)}
                                                    defaultValue={50}
                                                    aria-labelledby="discrete-slider-always"
                                                    step={null}
                                                    marks={marks}
                                                    valueLabelDisplay="off"
                                                    valueLabelFormat={valueLabelFormat}
                                                />
                                            </Col>
                                          
                                        </Row>
                                        </div>

                                })
                            }
                        </div>

                    </div> : ""
                }




               
            </div>
                    
                    
                    

                    
        </ListGroup.Item>
            
            )


        


}


export const Options = {
    OptionItems,
    
};