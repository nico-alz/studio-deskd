/**
 * Clase UI
 * Maneja toda la interfaz de usuario y las interacciones
 */
export class UI {
  constructor(catalogo, carrito) {
    this.catalogo = catalogo
    this.carrito = carrito
    this.inicializarEventos()
  }

  /**
   * Inicializa todos los eventos de la UI
   */
  inicializarEventos() {
    // Renderizar productos
    this.renderizarProductos()

    // Eventos del carrito
    document.getElementById("cartBtn").addEventListener("click", () => this.mostrarCarrito())
    document.getElementById("closeCart").addEventListener("click", () => this.ocultarCarrito())
    document.getElementById("checkoutBtn").addEventListener("click", () => this.procesarCheckout())
    // Abrir modales
      document.getElementById("openRegistro").addEventListener("click", () => {
      document.getElementById("registroModal").classList.add("active")
      })

      document.getElementById("openLogin").addEventListener("click", () => {
      document.getElementById("loginModal").classList.add("active")
      })

    // Cerrar modales
      document.getElementById("closeRegistro").addEventListener("click", () => {
     document.getElementById("registroModal").classList.remove("active")
      })

      document.getElementById("closeLogin").addEventListener("click", () => {
      document.getElementById("loginModal").classList.remove("active")
    })

    // Cerrar modal al hacer clic fuera
    document.getElementById("cartModal").addEventListener("click", (e) => {
      if (e.target.id === "cartModal") {
        this.ocultarCarrito()
      }
    })

    // Eventos de formularios
    document.getElementById("registroForm").addEventListener("submit", (e) => this.manejarRegistro(e))
    document.getElementById("contactoForm").addEventListener("submit", (e) => this.manejarContacto(e))

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      })
    })
  }

  /**
   * Renderiza todos los productos en sus respectivas secciones
   */
  renderizarProductos() {
    const categorias = ["camisetas", "pantalones", "buzos", "accesorios"]

    categorias.forEach((categoria) => {
      const grid = document.getElementById(`${categoria}Grid`)
      const productos = this.catalogo.obtenerPorCategoria(categoria)

      grid.innerHTML = productos.map((p) => p.generarHTML()).join("")
    })

    // Agregar eventos a los botones de cantidad
    this.agregarEventosBotones()
  }

  /**
   * Agrega eventos a los botones de agregar/quitar productos
   */
  agregarEventosBotones() {
    // Botones de agregar
    document.querySelectorAll(".btn-add").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id)
        const producto = this.catalogo.obtenerPorId(id)
        if (producto) {
          this.carrito.agregarProducto(producto)
          this.actualizarUI(id)
        }
      })
    })

    // Botones de quitar
    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id)
        this.carrito.quitarProducto(id)
        this.actualizarUI(id)
      })
    })
  }

  /**
   * Actualiza la UI después de cambios en el carrito
   * @param {number} productoId - ID del producto actualizado
   */
  actualizarUI(productoId) {
    // Actualizar contador del producto
    const qtyDisplay = document.getElementById(`qty-${productoId}`)
    if (qtyDisplay) {
      qtyDisplay.textContent = this.carrito.obtenerCantidad(productoId)
    }

    // Actualizar contador del carrito
    document.getElementById("cartCount").textContent = this.carrito.obtenerTotalItems()
  }

  /**
   * Muestra el modal del carrito
   */
  mostrarCarrito() {
    const modal = document.getElementById("cartModal")
    const cartItems = document.getElementById("cartItems")
    const items = this.carrito.obtenerItems()

    if (items.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>'
    } else {
      cartItems.innerHTML = items
        .map(
          (item) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.producto.nombre}</div>
                        <div class="cart-item-price">$${item.producto.precio.toFixed(2)}</div>
                        <div class="cart-item-quantity">Cantidad: ${item.cantidad}</div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.producto.id}">Eliminar</button>
                </div>
            `,
        )
        .join("")

      // Agregar eventos a botones de eliminar
      cartItems.querySelectorAll(".cart-item-remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = Number.parseInt(e.target.dataset.id)
          this.carrito.eliminarProducto(id)
          this.actualizarUI(id)
          this.mostrarCarrito() // Refrescar el modal
        })
      })
    }

    // Actualizar total
    document.getElementById("cartTotal").textContent = this.carrito.calcularTotal().toFixed(2)

    modal.classList.add("active")
  }

  /**
   * Oculta el modal del carrito
   */
  ocultarCarrito() {
    document.getElementById("cartModal").classList.remove("active")
  }

  /**
   * Procesa el checkout del carrito
   */
  procesarCheckout() {
    if (this.carrito.obtenerTotalItems() === 0) {
      alert("Tu carrito está vacío")
      return
    }

    const pedido = this.carrito.procesarCheckout()

    // BACKEND CONNECTION POINT:
    // Aquí se enviará el pedido al backend
    // Endpoint: POST /api/pedidos/crear

    alert(
      `Pedido procesado!\nTotal: $${pedido.total.toFixed(2)}\n\nEn producción, esto se conectará con el sistema de pagos.`,
    )

    // Vaciar carrito después del checkout
    this.carrito.vaciar()
    this.actualizarTodasLasCantidades()
    this.ocultarCarrito()
  }

  /**
   * Actualiza todas las cantidades en la UI
   */
  actualizarTodasLasCantidades() {
    this.catalogo.obtenerTodos().forEach((producto) => {
      this.actualizarUI(producto.id)
    })
  }

  /**
   * Maneja el envío del formulario de registro
   * @param {Event} e - Evento del formulario
   */
  manejarRegistro(e) {
    e.preventDefault()

    const nombre = document.getElementById("regNombre").value
    const correo = document.getElementById("regCorreo").value
    const password = document.getElementById("regPassword").value

    // BACKEND CONNECTION POINT:
    // Aquí se enviará la información al backend para crear el usuario
    // Endpoint: POST /api/usuarios/registro
    // Body: { nombre, correo, password }

    console.log("Datos de registro:", { nombre, correo, password })
    alert("Registro exitoso!\n\nEn producción, esto creará tu cuenta en la base de datos.")

    e.target.reset()
  }

  /**
   * Maneja el envío del formulario de contacto
   * @param {Event} e - Evento del formulario
   */
  manejarContacto(e) {
    e.preventDefault()

    const nombre = document.getElementById("contNombre").value
    const correo = document.getElementById("contCorreo").value
    const mensaje = document.getElementById("contMensaje").value

    // BACKEND CONNECTION POINT:
    // Aquí se enviará el mensaje al backend
    // Endpoint: POST /api/contacto/enviar
    // Body: { nombre, correo, mensaje }

    console.log("Mensaje de contacto:", { nombre, correo, mensaje })
    alert("Mensaje enviado!\n\nEn producción, esto enviará tu mensaje al equipo de soporte.")

    e.target.reset()
  }
}
