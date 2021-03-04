
//Componente que permite que el icono se carga se muestre en pantalla completa 

export const loader = {
    show,
    hide
};

function show() {
    const loader_div = document.querySelector('.loader');
    return loader_div.classList.remove('loader--hide');
}

function hide() {
    const loader_div = document.querySelector('.loader');
    return loader_div.classList.add('loader--hide');
}


