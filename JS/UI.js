/**
 * Clase UI
 * Maneja toda la interfaz de usuario y las interacciones
 */
export class UI {
  constructor(catalogo, carrito) {
    this.catalogo = catalogo
    this.carrito = carrito
    this.seccionActual = "home"
    this.inicializarEventos()
  }

  /**
   * Inicializa todos los eventos de la UI
   */
  inicializarEventos() {
    // Renderizar productos
    this.renderizarProductos()

    // Eventos de navegación
    this.inicializarNavegacion()

    // Eventos del carrito
    document.getElementById("cartBtn").addEventListener("click", () => this.mostrarCarrito())
    document.getElementById("closeCart").addEventListener("click", () => this.ocultarCarrito())
    document.getElementById("checkoutBtn").addEventListener("click", () => this.procesarCheckout())

    // Eventos de modales de autenticación
    document.getElementById("loginBtn").addEventListener("click", () => this.mostrarModal("loginModal"))
    document.getElementById("heroRegisterBtn").addEventListener("click", () => this.mostrarModal("registroModal"))
    document.getElementById("closeLogin").addEventListener("click", () => this.ocultarModal("loginModal"))
    document.getElementById("closeRegistro").addEventListener("click", () => this.ocultarModal("registroModal"))

    // Cambiar entre login y registro
    document.getElementById("switchToRegister").addEventListener("click", (e) => {
      e.preventDefault()
      this.ocultarModal("loginModal")
      this.mostrarModal("registroModal")
    })
    document.getElementById("switchToLogin").addEventListener("click", (e) => {
      e.preventDefault()
      this.ocultarModal("registroModal")
      this.mostrarModal("loginModal")
    })

    // Cerrar modales al hacer clic fuera
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.ocultarModal(modal.id)
        }
      })
    })

    // Eventos de formularios
    document.getElementById("registroForm").addEventListener("submit", (e) => this.manejarRegistro(e))
    document.getElementById("loginForm").addEventListener("submit", (e) => this.manejarLogin(e))
    document.getElementById("contactoForm").addEventListener("submit", (e) => this.manejarContacto(e))
  }

  /**
   * Inicializa la navegación entre secciones
   */
  inicializarNavegacion() {
    // Enlaces del menú principal
    document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const seccion = link.dataset.section
        this.navegarASeccion(seccion)
      })
    })

    // Botón del hero para explorar colección
    document.querySelector(".hero-cta .btn-primary").addEventListener("click", (e) => {
      e.preventDefault()
      this.navegarASeccion("camisetas")
    })

    // Enlaces del footer
    document.querySelectorAll(".footer-section a[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const seccion = link.dataset.section
        this.navegarASeccion(seccion)
        window.scrollTo({ top: 0, behavior: "smooth" })
      })
    })
  }

  /**
   * Navega a una sección específica
   * @param {string} seccion - ID de la sección
   */
  navegarASeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll(".hero, .catalog-section, .form-section").forEach((section) => {
      section.classList.remove("section-visible")
      section.classList.add("section-hidden")
    })

    // Mostrar la sección seleccionada
    const seccionElement = document.getElementById(seccion)
    if (seccionElement) {
      seccionElement.classList.remove("section-hidden")
      seccionElement.classList.add("section-visible")
    }

    // Actualizar enlaces activos
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
      if (link.dataset.section === seccion) {
        link.classList.add("active")
      }
    })

    this.seccionActual = seccion

    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: "smooth" })
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
   * Muestra un modal
   * @param {string} modalId - ID del modal
   */
  mostrarModal(modalId) {
    document.getElementById(modalId).classList.add("active")
  }

  /**
   * Oculta un modal
   * @param {string} modalId - ID del modal
   */
  ocultarModal(modalId) {
    document.getElementById(modalId).classList.remove("active")
  }

  /**
   * Muestra el modal del carrito
   */
  mostrarCarrito() {
    const modal = document.getElementById("cartModal")
    const cartItems = document.getElementById("cartItems")
    const items = this.carrito.obtenerItems()

    if (items.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío 🛒</div>'
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
      `¡Pedido procesado exitosamente!\n\nTotal: $${pedido.total.toFixed(2)}\nProductos: ${pedido.items.length}\n\nEn producción, esto se conectará con el sistema de pagos y Java + PHP + MySQL.`,
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
    const passwordConfirm = document.getElementById("regPasswordConfirm").value

    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden")
      return
    }

    // BACKEND CONNECTION POINT:
    // Aquí se enviará la información al backend para crear el usuario
    // Endpoint: POST /api/usuarios/registro
    // Body: { nombre, correo, password }

    console.log("Datos de registro:", { nombre, correo, password })
    alert(
      `¡Registro exitoso!\n\nBienvenido ${nombre}!\n\nEn producción, esto creará tu cuenta en la base de datos con Java + PHP + MySQL.`,
    )

    e.target.reset()
    this.ocultarModal("registroModal")
  }

  /**
   * Maneja el envío del formulario de login
   * @param {Event} e - Evento del formulario
   */
  manejarLogin(e) {
    e.preventDefault()

    const correo = document.getElementById("loginCorreo").value
    const password = document.getElementById("loginPassword").value

    // BACKEND CONNECTION POINT:
    // Aquí se enviará la información al backend para autenticar
    // Endpoint: POST /api/usuarios/login
    // Body: { correo, password }

    console.log("Datos de login:", { correo, password })
    alert(
      `¡Inicio de sesión exitoso!\n\nBienvenido de nuevo!\n\nEn producción, esto autenticará tu cuenta con Java + PHP + MySQL.`,
    )

    e.target.reset()
    this.ocultarModal("loginModal")
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
    alert(
      `¡Mensaje enviado exitosamente!\n\nGracias ${nombre}, te responderemos pronto.\n\nEn producción, esto enviará tu mensaje al equipo de soporte con Java + PHP + MySQL.`,
    )

    e.target.reset()
  }
}
