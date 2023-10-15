const listaObjetos = JSON.parse(localStorage.getItem('listaObjetos')) || [];

function crearObjeto() {
    const nombreInput = document.getElementById("nombreInput");
    const cantidadInput = document.getElementById("cantidadInput");

    const nombre = nombreInput.value.trim();
    const cantidad = parseFloat(cantidadInput.value);

    if (!nombre || isNaN(cantidad) || cantidad === 0) {
        alert("Ingrese valores válidos para nombre y cantidad.");
        return;
    }

    const nuevoObjeto = {
        nombre: nombre,
        cantidad: cantidad
    };

    listaObjetos.push(nuevoObjeto);

    localStorage.setItem('listaObjetos', JSON.stringify(listaObjetos));

    nombreInput.value = "";
    cantidadInput.value = "";

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `Producto '${nombre}' agregado con cantidad ${cantidad}.`;
}

function mostrarTabla() {
    const objetoTabla = document.getElementById("tablaObjetos").getElementsByTagName('tbody')[0];
    objetoTabla.innerHTML = "";

    listaObjetos.forEach(function (objeto, index) {
        const row = document.createElement("tr");
        const cellNombre = document.createElement("td");
        const cellCantidad = document.createElement("td");
        const cellAcciones = document.createElement("td");

        cellNombre.textContent = objeto.nombre;
        cellCantidad.textContent = objeto.cantidad;

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.addEventListener("click", function () {
            eliminarObjeto(index);
        });

        cellAcciones.appendChild(botonBorrar);

        row.appendChild(cellNombre);
        row.appendChild(cellCantidad);
        row.appendChild(cellAcciones);
        objetoTabla.appendChild(row);
    });
}

function eliminarObjeto(index) {
    listaObjetos.splice(index, 1);
    localStorage.setItem('listaObjetos', JSON.stringify(listaObjetos));
    mostrarTabla();
}
