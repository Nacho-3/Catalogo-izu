const contenedor = document.getElementById('producto');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('data/productos.json')
  .then(res => res.json())
  .then(productos => {
    const prod = productos.find(p => p.id == id);

    if (!prod) {
      contenedor.innerHTML = '<p>Producto no encontrado</p>';
      return;
    }

    contenedor.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      
      <h2>${prod.nombre}</h2>
      <p class="precio">$ ${prod.precio}</p>

      <p class="desc">
        Consultá disponibilidad y talles por WhatsApp.
      </p>

      <a class="btn-wsp"
         href="https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(
           `Hola! Quiero consultar por:\n${prod.nombre}\nPrecio: $${prod.precio}`
         )}"
         target="_blank">
         Consultar por WhatsApp
      </a>
    `;
  });
