/* DataBase */
const productos = [
  {
    id: 1,
    nombre: 'Auriculares Grises',
    imagen: '/assets/img/auricular.png',
    precio: 35,
    unidades: 4
  },
  {
  id: 2,
  nombre: 'Impresora EPSON',
  imagen: '/assets/img/impresora.png',
  precio: 180,
  unidades: 0
  },
  {
    id: 3,
    nombre: 'Cargador Samgsumg',
    imagen: '/assets/img/cargador.png',
    precio: 8,
    unidades: 15
  },
  {
    id: 4,
    nombre: 'Mouse Gamer RGB',
    imagen: '/assets/img/mouse.png',
    precio: 25,
    unidades: 5
  },
  {
    id: 5,
    nombre: 'Teclado Mecánico',
    imagen: '/assets/img/teclado.png',
    precio: 55,
    unidades: 3
  },
  {
    id: 6,
    nombre: 'Laptop HP',
    imagen: '/assets/img/laptop.png',
    precio: 990,
    unidades: 3
  },
  {
    id: 7,
    nombre: 'Altavoces',
    imagen: '/assets/img/altavoces.png',
    precio: 60,
    unidades: 0
  },
  {
    id: 8,
    nombre: 'Monitor 4k',
    imagen: '/assets/img/monitor.png',
    precio: 800,
    unidades: 2
  }
]

/* Productos */
const productosContenedor = document.querySelector('.products__container')

function pintarProductos () {
  let html = ''
  for (const { id, nombre, imagen, precio, unidades } of productos) {
    html += `
    <div>
    <article class="products__item">
      <div class="products__data">
        <div class="products__price">$ ${precio}</div>
        <img class="products__image" src="${imagen}" alt="${nombre}">
        <h2 class="products__title">${nombre}</h2>
        <span class="products__stock">Disponibles: ${unidades}</span>
        <div class="products__button">
          <button type="button" class="agregar button" data-id="${id}">Añadir al carrito</i></button>
        </div>
      </div>
    </article>
  </div>
    `
  }
  productosContenedor.innerHTML = html
}

pintarProductos()

/* Carrito */
let carrito = []

const articulosContenedor = document.querySelector('.cart__container .cart__list')
const contadorDeArticulos = document.getElementById('cart-count')
const totalPrecio = document.getElementById('cart-total')
const botonComprar = document.querySelector('.btn--checkout')

function pintarCarrito () {
  let html = ''

  for (const { id, cantidad } of carrito) {
    const { nombre, imagen } = productos.find(producto => producto.id === id)
    html += `
    <li class="cart__item">
    <article class="cart__article grid">
      <img class="cart__image" src="${imagen}" alt="${nombre}">

      <div class="cart__data">
        <h2 class="cart__name">${nombre}</h2>

        <div class="cart__minmax">
          <button type="button" class="cart__button btn--remove" id="cart-remove" data-id="${id}"><i class='bx bx-minus' ></i></button>
          <span id="cart-qty">${cantidad}</span>
          <button type="button" class="cart__button btn--add" id="cart-add" data-id="${id}"><i class='bx bx-plus' ></i></button>
        </div>

      </div>
      <div class="cart__delete">
        <button type="button" class="cart__button btn--delete" id="cart-delete" data-id="${id}"><i class='bx bx-trash' ></i></button>
      </div>
    </article>
  </li>
    `
  }

  articulosContenedor.innerHTML = html
  contadorDeArticulos.innerHTML = contarArticulos()
  totalPrecio.innerHTML = total()
}

function agregarAlCarrito (id) {
  const cantidad = 1

  const productoEncontrado = productos.find(producto => producto.id === id)

  if (productoEncontrado && productoEncontrado.unidades > 0) {
    
    const articuloEncontrado = carrito.find(articulo => articulo.id === id)

    if (articuloEncontrado) {

      if (checarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
        articuloEncontrado.cantidad += cantidad
      } else {
        window.alert('No queda más unidades del producto, lo sentimos 😭')
      }
    } else {
      carrito.push({ id, cantidad })
    }
  } else {
    window.alert('Mil disculpas, no tenemos unidades disponibles, por favor vuelva más tarde 😓')
  }
  pintarCarrito()
}

function checarUnidades (id, cantidad) {
  const productoEncontrado = productos.find(producto => producto.id === id)

  return productoEncontrado.unidades - cantidad >= 0
}

function removerDelCarrito (id) {
  const cantidad = 1

  const articuloEncontrado = carrito.find(articulo => articulo.id === id)

  if (articuloEncontrado && articuloEncontrado.cantidad - cantidad > 0) {
    articuloEncontrado.cantidad -= cantidad
  } else {
    carrito = carrito.filter(articulo => articulo.id !== id)
  }
  pintarCarrito()
}

function eliminarArticulo (id) {
  carrito = carrito.filter(articulo => articulo.id !== id)
  pintarCarrito()
}

function contarArticulos () {
  let suma = 0
  for (const articulo of carrito) {
    suma += articulo.cantidad
  }
  return suma
}

function total () {
  let suma = 0

  for (const articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)
    suma += articulo.cantidad * productoEncontrado.precio
  }

  return suma
}

function comprar () {
  for (const articulo of carrito) {
    const productoEncontrado = productos.find(producto => producto.id === articulo.id)

    productoEncontrado.unidades -= articulo.cantidad
  }

  window.alert('Compra realizada con exito! Muchas gracias 😍')
  carrito = []
  pintarCarrito()
  pintarProductos()
}

pintarCarrito()

productosContenedor.addEventListener('click', e => {
  if (e.target.closest('.agregar')) {
    const id = +e.target.closest('.agregar').dataset.id
    agregarAlCarrito(id)
  }
})

articulosContenedor.addEventListener('click', e => {
  if (e.target.closest('#cart-add')) {
    const id = +e.target.closest('#cart-add').dataset.id
    agregarAlCarrito(id)
  }

  if (e.target.closest('#cart-remove')) {
    const id = +e.target.closest('#cart-remove').dataset.id
    removerDelCarrito(id)
  }

  if (e.target.closest('#cart-delete')) {
    const id = +e.target.closest('#cart-delete').dataset.id
    eliminarArticulo(id)
  }
})

botonComprar.addEventListener('click', () => {
  comprar()
})