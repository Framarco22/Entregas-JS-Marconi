const listaObjetos = [];

function crearObjeto() {
    const nombre = prompt("Ingrese el nombre del producto (Si quiere finalizar la lista, ingrese Fin):");

    if (nombre.toLowerCase() === "fin") {
        return false; 
    } 

    let cantidad;
    do {
        const cantidadInput = prompt("Ingrese la cantidad o peso del producto:");
        cantidad = cantidadInput;

        if (isNaN(cantidad)) {
            alert("La cantidad debe ser expresada en números. Por favor, ingrese la cantidad nuevamente.");
        }
    } while (isNaN(cantidad) || cantidad === 0);

    const nuevoObjeto = {
        nombre: nombre,
        cantidad: cantidad
    };

    listaObjetos.push(nuevoObjeto);

    return true; 
}

while (crearObjeto()) {

}

console.log("Lista de objetos:", listaObjetos);

