const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en zapatillas.js */
function crearTarjetasProductosIncio(){
  contenedorTarjetas.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas tarjetas
  const productos = JSON.parse(localStorage.getItem("zapatillas"));
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
      <span class="cantidad">0</span>
      <button class="button">+</button>
      </div>
      `;
      contenedorTarjetas.appendChild(nuevaZapatilla);
      
      nuevaZapatilla
        .getElementsByTagName("button")[1]
        .addEventListener("click", () => agregarAlCarrito(producto));
      nuevaZapatilla
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => {
          restarAlCarrito(producto)
          crearTarjetasProductosIncio() 
        });
    });
  }
}

crearTarjetasProductosIncio()