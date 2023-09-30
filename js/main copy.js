const listaObjetos = [];

function crearObjeto() {
    const nombre = prompt("Ingrese el nombre del producto (Si quiere finalizar la lista, ingrese 'Fin'):");

    if (nombre === null) {
        return;
    }

    if (nombre.toLowerCase() === "fin") {
        return;
    }

    let cantidad;
    do {
        const cantidadInput = prompt("Ingrese la cantidad o peso del producto:");
        cantidad = parseFloat(cantidadInput);

        if (isNaN(cantidad)) {
            alert("La cantidad debe ser un número. Por favor, ingrese la cantidad nuevamente.");
        }
    } while (isNaN(cantidad) || cantidad === 0);

    const nuevoObjeto = {
        nombre: nombre,
        cantidad: cantidad
    };

    listaObjetos.push(nuevoObjeto);

    alert(`Producto '${nombre}' agregado con cantidad ${cantidad}.`);
}

function mostrarTabla() {
    const objetoTabla = document.getElementById("tablaObjetos").getElementsByTagName('tbody')[0];
    objetoTabla.innerHTML = "";

    listaObjetos.forEach(function (objeto) {
        const row = document.createElement("tr");
        const cellNombre = document.createElement("td");
        const cellCantidad = document.createElement("td");

        cellNombre.textContent = objeto.nombre;
        cellCantidad.textContent = objeto.cantidad;

        row.appendChild(cellNombre);
        row.appendChild(cellCantidad);
        objetoTabla.appendChild(row);
    });
}
