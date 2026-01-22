const grid = document.getElementById('gridProductos');

fetch('data/productos.json')
  .then(res => res.json())
  .then(productos => {
    renderProductos(productos);
  })
  .catch(err => {
    console.error('Error cargando productos', err);
  });

function renderProductos(lista) {
  grid.innerHTML = '';

  lista.forEach(p => {
    grid.innerHTML += `
      <a href="producto.html?id=${p.id}" class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="precio">$ ${p.precio}</p>
        <span>Ver producto</span>
      </a>
    `;
  });
}
