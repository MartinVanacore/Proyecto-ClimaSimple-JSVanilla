const formulario = document.querySelector('#formulario');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');
const resultado = document.querySelector('#resultado');

formulario.addEventListener('submit', obtenerClima);

function obtenerClima(e) {
    e.preventDefault();
    limpiarHtml();
    if(ciudad.value === '' || pais.value === '') {
        console.log(ciudad.value)
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    };
    
    datosAPI(ciudad.value, pais.value);
    
};

function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.rep');
    

    if(!alerta) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700','px-3', 'py-4', 'rounded', 'mt-6', 'text-center', 'rep');
        alerta.textContent = mensaje;
        formulario.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
        }, 2000);
    };
};
function datosAPI(ciudad, pais) {
    
    const appID = 'd1d5024dee9dfc410f240f063da4ebbc';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
    
    spinner();

    fetch(url)
        .then(resp => resp.json())
        .then(datos => {
            if(datos.cod === '404') {
                mostrarAlerta('Ciudad no encontrada, Intenta de nuevo')
            }
            limpiarHtml();
            mostrarClima(datos);
        });
};
function mostrarClima(datos) {
    
    const {name, sys: {country}, main: {temp, temp_max, temp_min}} = datos;
    const centigrados = converter(temp);
    const max = converter(temp_max);
    const min = converter(temp_min);

    const region = document.createElement('p');
    region.innerHTML = `${name}, ${country}`;
    region.classList.add('text-3xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const maxima = document.createElement('p');
    maxima.innerHTML = `Maxima: ${max}&#8451;`
    maxima.classList.add('text-xl');

    const minima = document.createElement('p');
    minima.innerHTML = `Minima: ${min}&#8451;`
    minima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(region);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxima);
    resultadoDiv.appendChild(minima);

    resultado.appendChild(resultadoDiv);
};
function limpiarHtml() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
const converter = grados => parseInt(grados - 273.15);

function spinner() {
    limpiarHtml();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}