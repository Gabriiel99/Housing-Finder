//Variables
const zona = document.querySelector('#zona');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const habitaciones = document.querySelector('#habitaciones');
const tipo = document.querySelector('#tipo');
const color = document.querySelector('#color');

//contiene los resultados
const resultado = document.querySelector('#resultado');
 

const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const DatosBusqueda ={
    zona: '',
	modelo: '',
	year: '',
	precio: '',
	habitaciones: '',
	tipo: '',
    color: ''
    
    
	
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarViviendas(viviendas);//muestra las viviendas


    //Completa las opciones de año
    llenarSelect();
})

//event listener para los select

zona.addEventListener('change' , e =>{
    DatosBusqueda.zona = e.target.value;


    filtrarVivienda();
});

year.addEventListener('change' , e =>{
    DatosBusqueda.year = parseInt(e.target.value) ;

    filtrarVivienda();
});

minimo.addEventListener('change' , e =>{
    DatosBusqueda.minimo = e.target.value;

    filtrarVivienda();
});

maximo.addEventListener('change' , e =>{
    DatosBusqueda.maximo = e.target.value;

    filtrarVivienda();

});

habitaciones.addEventListener('change' , e =>{
    DatosBusqueda.habitaciones = parseInt(e.target.value)  ;

    filtrarVivienda();

});

tipo.addEventListener('change' , e =>{
    DatosBusqueda.tipo = e.target.value ;

    filtrarVivienda();

});

color.addEventListener('change' , e =>{
    DatosBusqueda.color = e.target.value;

    filtrarVivienda();

});

//Funciones
function mostrarViviendas(viviendas) {

    limpiarHTML(); //borra el html previo

    viviendas.forEach( viviendas => {

        const {zona,modelo,year,precio,habitaciones,color,tipo} = viviendas;
        const viviendasHTML = document.createElement('p');

        viviendasHTML.textContent = `
        Zona: ${zona}  -  Estilo: ${modelo}  -  Año: ${year} -  Precio: ${precio} -  ${habitaciones} Habitaciones - Color: ${color} - Tipo: ${tipo}       
       
        `;
        

        //insertar en el HTML
        resultado.appendChild(viviendasHTML);
    })
}

//limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect(){

    for(let i = max; i>= min; i-- ){
        const opcion = document.createElement('option');
        opcion.value=i;
        opcion.textContent = i;
        year.appendChild(opcion); //Agrega las opciones al select
    }
}


//Funcion que filtra la busquesda
function filtrarVivienda(){
    const resultado = viviendas.filter(filtrarZona).filter(filtraYear).filter(filtrarMinimo).filter(filtrarMaximo)
    .filter(filtrarHabitaciones).filter(filtrarTipo).filter(filtrarColor);

    console.log(resultado);
    mostrarViviendas(resultado);

    if( resultado.length){
        mostrarViviendas(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta' , 'error');
    noResultado.textContent = 'No hay resultados, cambia tu busqueda';
    resultado.appendChild(noResultado)
}

function filtrarZona(viviendas){
    const {zona} = DatosBusqueda;
    if(zona){
        return viviendas.zona === zona;
    }
    return viviendas;
}

function filtraYear(viviendas){
    const {year} = DatosBusqueda;
    if(year){
        return viviendas.year === year;
    }
    return viviendas;
}

function filtrarMinimo(viviendas){
    const {minimo} = DatosBusqueda;
    if(minimo){
        return viviendas.precio >= minimo;
    }
    return viviendas;
}

function filtrarMaximo(viviendas){
    const {maximo} = DatosBusqueda;
    if(maximo){
        return viviendas.precio <= maximo;
    }
    return viviendas;
}

function filtrarHabitaciones(viviendas){
    const{habitaciones} = DatosBusqueda;
    if(habitaciones){
        return viviendas.habitaciones === habitaciones;
    }
    return viviendas;
}

function filtrarTipo(viviendas){
    const{tipo} = DatosBusqueda;
    if(tipo){
        return viviendas.tipo === tipo;
    }
    return viviendas;
}

function filtrarColor(viviendas){
    const{color} = DatosBusqueda;
    if(color){
        return viviendas.color === color;
    }
    return viviendas;
}