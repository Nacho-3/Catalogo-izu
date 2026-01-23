const contenedor = document.getElementById("detalleProducto");

// obtener id del producto desde la url
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("id"));

fetch("data/productos.json")
  .then(res => res.json())
  .then(productos => {
    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
      contenedor.innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    contenedor.innerHTML = `
      <div class="col-md-6">
        <img src="${producto.img}" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <h3 class="precio">$${producto.precio}</h3>
        <h4>Talles disponibles:</h4>
        <p>${producto.talles.join(", ")}</p>
        <button class="mt-3">Consultar</button>
      </div>
    `;

    
  });
