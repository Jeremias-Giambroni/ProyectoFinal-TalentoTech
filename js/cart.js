const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");

/** Crea las tarjetas de productos teniendo en cuenta la lista en zapatillas.js */
function crearTarjetasProductosIncio(){
  contenedorTarjetas.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas tarjetas
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  console.log(productos);
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
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
      nuevaZapatilla
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto)
          crearTarjetasProductosIncio() 
          actualizarTotales();
        });
    });
  }
}

crearTarjetasProductosIncio()
actualizarTotales

function actualizarTotales(){
  const productos = JSON.parse(localStorage.getItem("zapatillas"));
  let unidades = 0;
  let precio = 0;
  if(productos && productos.length > 0) {
    productos.forEach(producto => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    })
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio
  }
}

function revisarMensajeVacio(){
  const productos = JSON.parse(localStorage.getItem("zapatillas"));
  carritoVacioElement.classList.toggle("escondido",productos && productos.length > 0);
  totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
}

revisarMensajeVacio();


reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito(){
  localStorage.removeItem("zapatillas");
  actualizarTotales();
  crearTarjetasProductosIncio();
}