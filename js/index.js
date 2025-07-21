const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en zapatillas.js */
function crearTarjetasProductosIncio(productos){
    productos.forEach(producto => {
        const nuevaZapatilla = document.createElement("div");
        nuevaZapatilla.classList ="tarjeta-producto";
        nuevaZapatilla.innerHTML = `
        <img src= "./images/imagenes-zapatillas/${producto.id}.png">
        <h3>${producto.nombre}</h3>
        <p class= "precio">$${producto.precio}</p>
        <button>Agregar al Carrito</button>
        `
        contenedorTarjetas.appendChild(nuevaZapatilla);
        
        nuevaZapatilla.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto)) 
    })
}

crearTarjetasProductosIncio(zapatillas)
