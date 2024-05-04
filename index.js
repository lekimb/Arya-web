// Datos
const personas = [
    { nombre: 'Tywin Lannister', completado: true },
    { nombre: 'Melisandre', completado: false },
    { nombre: 'Beric Dondarrion', completado: false },
];

let etiquetaActiva = 'pendientes';

// Elementos del DOM
const formulario = document.getElementById('formularioNombre');
const listaNombres = document.getElementsByClassName('nombres')[0];
const etiquetaTodos = document.getElementById('etiqueta-todos');
const etiquetaPendientes = document.getElementById('etiqueta-pendientes');
const etiquetaCompletados = document.getElementById('etiqueta-completados');

// Event listeners
window.addEventListener('load', renderizadoGeneral);
formulario.addEventListener('submit', añadirNombre);
listaNombres.addEventListener('click', toggleCompletado);
etiquetaTodos.addEventListener('click', () => seleccionarEtiqueta('todos'));
etiquetaPendientes.addEventListener('click', () => seleccionarEtiqueta('pendientes'));
etiquetaCompletados.addEventListener(
    'click', () => 
    seleccionarEtiqueta('completados')
);

// Funciones
function añadirNombre(evento) {
    evento.preventDefault();
    const input = document.getElementById('inputNombre');
    let inputValue = input.value;
    if (inputValue === '') return;

    const personaNueva = { nombre: inputValue, completado: false };
    personas.push(personaNueva);

    renderizarPersona(personaNueva);
    renderizarContadores();
    input.value = '';
}

function renderizadoGeneral() {
    listaNombres.innerHTML = '';
    let personasFiltradas = personas;
    if (etiquetaActiva === 'pendientes') {
        personasFiltradas = personas.filter((persona) => {
            return !persona.completado;
        });
    }
    if (etiquetaActiva === 'completados') {
        personasFiltradas = personas.filter((persona) => {
            return persona.completado;
        });
    }
    
    personasFiltradas.forEach((persona) => {
        renderizarPersona(persona);
    });
    renderizarContadores();
}

function renderizarPersona(persona) {
    listaNombres.innerHTML += `<li>
    <label class="${persona.completado && 'nombre-seleccionado'} nombre-item"
        >${persona.nombre}
        <input class="checkbox" type="checkbox" hidden ${
            persona.completado && 'checked'
        }
    /></label>
    <img src="${persona.completado ? 'Check.svg' : 'Check-empty.svg'}" alt="" />
</li>`;
}

function renderizarContadores() {
    document.getElementById('etiqueta-todos').firstElementChild.innerHTML =
        personas.length;
    document.getElementById('etiqueta-pendientes').firstElementChild.innerHTML =
        personas.filter((persona) => {
            return !persona.completado;
        }).length;
    document.getElementById(
        'etiqueta-completados'
    ).firstElementChild.innerHTML = personas.filter((persona) => {
        return persona.completado;
    }).length;
}

function toggleCompletado(evento) {
    const nombre = getNombre(evento);

    if (nombre === undefined) return;

    const persona = personas.find((persona) => {
        return persona.nombre === nombre;
    });

    persona.completado = !persona.completado; // Mutar objeto persona

    renderizadoGeneral();
}

function getNombre(evento) {
    if (evento.target.tagName === 'LI') {
        return evento.target
            .getElementsByClassName('nombre-item')[0]
            .textContent.trim();
    }

    if (evento.target.tagName === 'LABEL') {
        return evento.target.textContent.trim();
    }

    if (evento.target.tagName === 'IMG') {
        return evento.target.parentNode
            .getElementsByClassName('nombre-item')[0]
            .textContent.trim();
    }
}

function seleccionarEtiqueta(etiqueta) {
    etiquetaActiva = etiqueta;
    renderizadoGeneral();
    renderizarEtiquetaActiva();
}

function renderizarEtiquetaActiva() {
    limpiarEtiquetasSelecciondas();
    document
        .getElementById(`etiqueta-${etiquetaActiva}`)
        .classList.add('etiqueta-activa');
}

function limpiarEtiquetasSelecciondas() {
    const etiquetas = document.getElementsByClassName('etiqueta');
    for (let etiqueta of etiquetas) {
        etiqueta.classList.remove('etiqueta-activa');
    }
}
