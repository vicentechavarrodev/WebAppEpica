

const Deseleccionar = async (event, opcion) => {
    event.stopPropagation();

    let check = this.state[opcion.IdProductoOpciones];

    if (check === true) {

        this.setState({ [opcion.IdProductoOpciones]: false });

        let op = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion === opcion.Opcion.IdTipoOpcion);

        if (op.length > 0 && op[0].subOpcion !== 0) {
            var id = op[0].subOpcion;

            let opciones = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion !== opcion.Opcion.IdTipoOpcion)

            while (id !== 0) {

                const sub = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === id);

                var e = document.getElementById(`${id}-item-op`);
                e.classList.remove("enable");

                if (sub !== undefined) {

                    opciones = opciones.filter(item => item.idTipoOpcion !== sub.idTipoOpcion)

                    this.setState({ [sub.idProductoOpciones]: false });

                    id = sub.subOpcion;
                } else {
                    id = 0;
                }
                await this.setState({ opcionesSeleccionadas: opciones });


            }

        } else {

            const opciones = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion !== opcion.Opcion.IdTipoOpcion)

            await this.setState({ opcionesSeleccionadas: opciones });
        }


    }

    GenerarPrecio();
}

const HandleRadioChange = async (event) => {
    event.stopPropagation();

    let option = JSON.parse(event.target.value);
    let optioncheck = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === option.Opcion.IdTipoOpcion);

    this.setState({ [option.IdProductoOpciones]: false });


    if (optioncheck === undefined) {
        this.setState({ [option.IdProductoOpciones]: true });
    } else {
        this.setState({ [optioncheck.idProductoOpciones]: false, [option.IdProductoOpciones]: true });
    }


    await ProcesarSeleccion(option);

    await GenerarPrecio();

    if (option.CambiaPrecio) {



        let optionSelected = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === option.ProductoTipoOpcionCambio.IdTipoOpcion);

        var e = document.getElementById(`${option.ProductoTipoOpcionCambio.IdTipoOpcion}-item-op`);
        var elementsPrecio = e.getElementsByClassName('col-price-modal');

        var elementsRdio = e.getElementsByTagName('input');

        let precioActual = elementsPrecio[0].innerHTML

        let precio = precioActual.substring(precioActual.indexOf("$") + 1, precioActual.length);



        if (elementsPrecio !== undefined && elementsPrecio.length > 0) {
            let total = (parseFloat(this.state.total) + parseFloat(option.Precio)) - precio;

            console.log(option.Precio + " " + parseFloat(this.state.total))



            if (optionSelected !== undefined) {
                await this.setState({
                    total: total
                });
            }

            for (let i = 0; i < elementsPrecio.length; i++) {
                elementsPrecio[i].innerHTML = "$ " + option.Precio
            }

            for (let i = 0; i < elementsRdio.length; i++) {

                let objeto = JSON.parse(elementsRdio[i].value);
                objeto.Opcion.Precio = option.Precio
                let value = JSON.stringify(objeto);

                //console.log(objeto)
                elementsRdio[i].value = value
            }
        }
    }
}

const ProcesarSeleccion = (option,context) => {



    const { opcionesSeleccionadas } = context.state;

    let IdsubOpcion = 0;

    if (option.MuestraSecundario) {
        let id = option.ProductoOpcionTipoOpciones[0].ProductoTipoOpcion.IdTipoOpcion;
        var element = document.getElementById(`${id}-item-op`);
        element.classList.add("enable");
        IdsubOpcion = id;
    } else {

        let op = this.state.opcionesSeleccionadas.filter(item => item.idTipoOpcion === option.Opcion.IdTipoOpcion);

        if (op.length > 0 && op[0].subOpcion !== 0) {
            var id = op[0].subOpcion;

            while (id !== 0) {

                const sub = this.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === id);

                var e = document.getElementById(`${id}-item-op`);
                e.classList.remove("enable");

                if (sub !== undefined) {
                    let index = this.state.opcionesSeleccionadas.findIndex(item => item.idTipoOpcion === id);

                    if (index > -1) {
                        const opciones = this.state.opcionesSeleccionadas.splice(index, 1);
                        this.setState({ opcionesSeleccionadas: opciones });
                    }

                    this.setState({ [sub.idProductoOpciones]: false });

                    id = sub.subOpcion;
                } else {
                    id = 0;
                }

            }

        }
    }

    let opcionSeleccionada = {
        idTipoOpcion: option.Opcion.IdTipoOpcion,
        nombreTipo: option.Opcion.TipoOpcion.Nombre,
        nombre: option.Opcion.Nombre,
        idProductoOpciones: option.IdProductoOpciones,
        subOpcion: IdsubOpcion,
        cantidad: 0,
        idTipoSeleccion: option.ProductoTipoOpcion.IdTipoSeleccion,
        precio: option.Opcion.Precio,
        añadir: '',
        orden: option.ProductoTipoOpcion.Orden
    };

    if (this.state.opcionesSeleccionadas.length > 0) {

        const o = context.state.opcionesSeleccionadas.find(item => item.idTipoOpcion === option.Opcion.IdTipoOpcion);

        context.setState({
            opcionesSeleccionadas: o === undefined ? [...opcionesSeleccionadas, opcionSeleccionada] : this.state.opcionesSeleccionadas.map((item, index) =>
                item.idTipoOpcion === option.Opcion.IdTipoOpcion ? { ...item, nombre: option.Opcion.Nombre, subOpcion: IdsubOpcion, idProductoOpciones: option.IdProductoOpciones, precio: option.Opcion.Precio } : item
            )
        });


    } else {
        context.setState({
            opcionesSeleccionadas: [...opcionesSeleccionadas, opcionSeleccionada]
        });
    }


}

const RdbtnSelec = async (opciones) => {


    if (opciones.length > 0) {
        if (opciones[0].ProductoTipoOpcion.EsObligatoria) {
            let TipoOpcion = opciones[0].ProductoTipoOpcion.TipoOpcion;

            let opcion = this.state.opcionesObligatorias.find(item => item.IdTipoOpcion === TipoOpcion.IdTipoOpcion);


            if (opcion === undefined) {
                await this.setState({
                    opcionesObligatorias: [...this.state.opcionesObligatorias, {
                        IdTipoOpcion: TipoOpcion.IdTipoOpcion,
                        Nombre: TipoOpcion.Nombre,
                        Orden: opciones[0].ProductoTipoOpcion.Orden
                    }]
                });

            }
        }
    }

    for (var i = 0; i < opciones.length; i++) {
        let id = opciones[i].IdProductoOpciones;
        var ids = this.state[id]
        if (ids == null) {
            this.setState({ [id]: false });
        }
    }

}



const AgregarAdicion = async (event, value, opcion) => {

    var e = document.getElementById(`${opcion.IdProductoOpciones}-item-flavor`);


    if (value === 0) {

        e.textContent = "Primer Sabor";
        await this.setState({
            opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Pmer. Sabor" } : item
            )
        });
    } else if (value === 50) {
        e.textContent = "Toda";
        await this.setState({
            opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Toda" } : item
            )
        });
    } else if (value === 100) {
        e.innerHTML = "Segundo sabor";
        await this.setState({
            opcionesSeleccionadas: this.state.opcionesSeleccionadas.map((item, index) => item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, añadir: "Sdo. Sabor" } : item
            )
        });
    }

}

const CantidadChange = async (event) => {
    let cantidad = this.state.cantidad;

    if (event.currentTarget.name === "cant-mas") {
        if (cantidad < 99) {
            cantidad = cantidad + 1;
        }
    } else if (event.currentTarget.name === "cant-menos") {
        if (cantidad > 1) {
            cantidad = cantidad - 1;
        }
    }

    await this.setState({
        cantidad
    });

    GenerarPrecio();
}

const HandleIncreChange = async (event, opcion) => {

    var element = document.getElementById(`${opcion.IdProductoOpciones}-item-op-var`);

    let cantidad = parseInt(element.innerHTML);

    if (event.currentTarget.name === "cant-mas") {
        if (cantidad < 99) {
            cantidad = cantidad + 1;
        }
    } else if (event.currentTarget.name === "cant-menos") {
        if (cantidad > 0) {
            cantidad = cantidad - 1;
        }
    }

    element.innerHTML = cantidad;

    let opcionSeleccionada = {
        idTipoOpcion: opcion.Opcion.IdTipoOpcion,
        nombreTipo: opcion.Opcion.TipoOpcion.Nombre,
        nombre: opcion.Opcion.Nombre,
        idProductoOpciones: opcion.IdProductoOpciones,
        subOpcion: 0,
        cantidad: cantidad,
        idTipoSeleccion: opcion.ProductoTipoOpcion.IdTipoSeleccion,
        precio: opcion.Opcion.Precio,
        añadir: '',
        orden: opcion.ProductoTipoOpcion.Orden
    };

    if (this.state.opcionesSeleccionadas.length > 0) {
        if (cantidad === 0) {
            let opciones = this.state.opcionesSeleccionadas.filter(item => item.idProductoOpciones !== opcion.IdProductoOpciones);
            await this.setState({ opcionesSeleccionadas: opciones });

        } else {
            const o = this.state.opcionesSeleccionadas.find(item => item.idProductoOpciones === opcion.IdProductoOpciones);

            await this.setState({
                opcionesSeleccionadas: o === undefined ? [...this.state.opcionesSeleccionadas, opcionSeleccionada] : this.state.opcionesSeleccionadas.map((item, index) =>
                    item.idProductoOpciones === opcion.IdProductoOpciones ? { ...item, nombre: opcion.Opcion.Nombre, subOpcion: 0, idProductoOpciones: opcion.IdProductoOpciones, cantidad: cantidad, precio: opcion.Opcion.Precio } : item
                )
            });
        }


    } else {

        if (cantidad !== 0) {
            await this.setState({
                opcionesSeleccionadas: [...this.state.opcionesSeleccionadas, opcionSeleccionada]
            });

        }
    }

    if (opcion.ProductoTipoOpcion.MostrarPartes) {

        var e = document.getElementById(`${opcion.IdProductoOpciones}-item-add`);
        if (e != null) {
            var child = e.getElementsByTagName('input')[0];

            if (cantidad === 1) {
                e.classList.add("enable");

                await AgregarAdicion(event, parseInt(child.value), opcion)
            } else if (cantidad === 0) {
                e.classList.remove("enable");
            }

        }
    }

    GenerarPrecio();
}

const GenerarPrecio = async () => {
    let total = 0;



    if (this.state.opcionesSeleccionadas.length > 0) {

        for (var i = 0; i < this.state.opcionesSeleccionadas.length; i++) {
            let opcion = this.state.opcionesSeleccionadas[i];

            if (opcion.idTipoSeleccion === 1) {
                total = total + opcion.precio;

            } else {
                total = total + (opcion.precio * opcion.cantidad);
            }


        }

        await this.setState({
            total: (total * this.state.cantidad + (this.props.opciones_producto.EsVariable ? 0 : (this.props.opciones_producto.Precio * this.state.cantidad)))
        });
    } else {


        await this.setState({ total: 0 + (this.props.opciones_producto.EsVariable ? 0 : (this.props.opciones_producto.Precio * this.state.cantidad)) });
    }






}


export const Events = {
    Deseleccionar,
    HandleRadioChange,
    ProcesarSeleccion,
    RdbtnSelec,
    AgregarAdicion,
    CantidadChange,
    HandleIncreChange,
    GenerarPrecio
};