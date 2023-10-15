const listaObjetos = JSON.parse(localStorage.getItem('listaObjetos')) || [];

function crearObjeto(nombre, cantidad) {
    return new Promise((resolve, reject) => {
        const listaObjetos = JSON.parse(localStorage.getItem('listaObjetos')) || [];

        const nuevoObjeto = {
            nombre: nombre,
            cantidad: cantidad
        };

        listaObjetos.push(nuevoObjeto);

        localStorage.setItem('listaObjetos', JSON.stringify(listaObjetos));

        Swal.fire('Producto Agregado', `Producto '${nuevoObjeto.nombre}' agregado con cantidad ${nuevoObjeto.cantidad}.`, 'success');
        resolve(nuevoObjeto);
    });
}

function mostrarTabla() {
    const objetoTabla = document.getElementById("tablaObjetos").getElementsByTagName('tbody')[0];
    objetoTabla.innerHTML = "";

    const productos = JSON.parse(localStorage.getItem('listaObjetos')) || [];

    productos.forEach(function (objeto, index) {
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
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este producto será eliminado de la lista.',
        icon: 'warning',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            listaObjetos.splice(index, 1);
            localStorage.setItem('listaObjetos', JSON.stringify(listaObjetos));
            mostrarTabla();
            Swal.fire('Producto Eliminado', 'El producto ha sido eliminado de la lista.');
        }
    });
}

document.getElementById("agregarBtn").addEventListener("click", function () {
    const nombreInput = document.getElementById("nombreInput");
    const cantidadInput = document.getElementById("cantidadInput");

    const nombre = nombreInput.value.trim();
    const cantidad = parseFloat(cantidadInput.value);

    if (!nombre || isNaN(cantidad) || cantidad === 0) {
        Swal.fire('Error', 'Ingrese valores válidos para nombre y cantidad.', 'error');
        return;
    }
    

    crearObjeto(nombre, cantidad)
        .then(nuevoObjeto => {
            nombreInput.value = "";
            cantidadInput.value = "";

            const resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = `Producto '${nuevoObjeto.nombre}' agregado con cantidad ${nuevoObjeto.cantidad}.`;
        })
        .catch(error => {
            console.error("Error al crear objeto:", error);
        });
});

document.getElementById("mostrarBtn").addEventListener("click", mostrarTabla);