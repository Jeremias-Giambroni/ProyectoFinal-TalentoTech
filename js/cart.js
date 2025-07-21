const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");


/** Crea las tarjetas de productos teniendo en cuenta la lista en zapatillas.js */
function crearTarjetasProductosCarrito(){
  contenedorTarjetas.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas tarjetas
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  if (productos && productos.length > 0) {
    productos.forEach(producto => {
      const nuevaZapatilla = document.createElement("div");
      nuevaZapatilla.classList.add("tarjeta-producto");
      nuevaZapatilla.innerHTML = `
      <img src= "./images/imagenes-zapatillas/${producto.id}.png">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <div class="cantidad-container">
      <button class="button">-</button>
      <span class="cantidad">${producto.cantidad}</span>
      <button class="button">+</button>
      </div>
      `;
      contenedorTarjetas.appendChild(nuevaZapatilla);
      
      nuevaZapatilla
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevaZapatilla
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();


/** Actualiza el total de precio y unidades de la página del carrito */

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  } 
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if (precio === 0){
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
  }
  
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
  actualizarTotales();
});

document.getElementById("comprar").addEventListener("click", () => {
  const productos = JSON.parse(localStorage.getItem("zapatillas"));
  if (productos && productos.length > 0) {
    alert("¡Gracias por tu compra! Tu carrito se ha reiniciado.");
    reiniciarCarrito(); 
    revisarMensajeVacio();
    actualizarTotales();
  } else {
    alert("Tu carrito está vacío. Agregá algún producto para poder comprar.");
  }
});


/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio(){
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos)
}