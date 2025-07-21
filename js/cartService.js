const keyLocalstorage = "zapatillas"

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  let cuenta = 0;
  if(!memoria){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem(keyLocalstorage, JSON.stringify([nuevoProducto]));
    cuenta = 1;
  } else {
    const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id);
    console.log(indiceProducto);
    const nuevaMemoria = memoria;
    if(indiceProducto === -1){
      nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
      cuenta = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cuenta = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem(keyLocalstorage, JSON.stringify(nuevaMemoria)); 
    return cuenta;
  }
  actualizarNumeroCarrito();
  return cuenta;
}  

/** Toma un objeto producto o un objeto con al menos un ID y lo resta del carrito */
function restarAlCarrito(producto){
  const memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
  if(memoria[indiceProducto].cantidad === 1){
    memoria.splice(indiceProducto,1);
  } else {
    memoria[indiceProducto].cantidad --;
  }
  localStorage.setItem(keyLocalstorage,JSON.stringify(memoria));
  actualizarNumeroCarrito();

}

/**Toma un Producto, le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
  const memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  if(memoria && memoria.length > 0){
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0 );
    cuentaCarritoElement.innerText = cuenta;
  }else {
    cuentaCarritoElement.innerText = 0;
  }
  
} 

actualizarNumeroCarrito();