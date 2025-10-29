export class UI {
  constructor(catalogo, carrito) {
    this.catalogo = catalogo;
    this.carrito = carrito;
    this.seccionActual = "home";

    this.inicializarEventos();
    this.actualizarUIUsuario();
  }

  inicializarEventos() {
    // Renderizar productos
    this.renderizarProductos();

    // Navegación
    this.inicializarNavegacion();

    // Eventos carrito
    document.getElementById("cartBtn").addEventListener("click", () => this.mostrarCarrito());
    document.getElementById("closeCart").addEventListener("click", () => this.ocultarCarrito());
    document.getElementById("checkoutBtn").addEventListener("click", () => this.procesarCheckout());

    // Modales autenticación
    document.getElementById("loginBtn").addEventListener("click", () => this.mostrarModal("loginModal"));
    document.getElementById("heroRegisterBtn").addEventListener("click", () => this.mostrarModal("registroModal"));
    document.getElementById("closeLogin").addEventListener("click", () => this.ocultarModal("loginModal"));
    document.getElementById("closeRegistro").addEventListener("click", () => this.ocultarModal("registroModal"));

    // Modal pago
    document.getElementById("closePayment").addEventListener("click", () => this.ocultarModal("paymentModal"));
    document.getElementById("paymentForm").addEventListener("submit", (e) => this.manejarPago(e));

    // Cambiar entre login y registro
    document.getElementById("switchToRegister").addEventListener("click", (e) => {
      e.preventDefault();
      this.ocultarModal("loginModal");
      this.mostrarModal("registroModal");
    });
    document.getElementById("switchToLogin").addEventListener("click", (e) => {
      e.preventDefault();
      this.ocultarModal("registroModal");
      this.mostrarModal("loginModal");
    });

    // Cerrar modales clic fuera
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.ocultarModal(modal.id);
        }
      });
    });

    // Formularios
    document.getElementById("registroForm").addEventListener("submit", (e) => this.manejarRegistro(e));
    document.getElementById("loginForm").addEventListener("submit", (e) => this.manejarLogin(e));
    document.getElementById("contactoForm").addEventListener("submit", (e) => this.manejarContacto(e));

    // Cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuario");
      this.actualizarUIUsuario();
    });
  }

  manejarPago(e) {
    e.preventDefault();
    const numTarjeta = document.getElementById("cardNumber").value.trim();
    const expired = document.getElementById("cardExpiry").value.trim();
    const cvc = document.getElementById("cardCVC").value.trim();

    if (!numTarjeta || !expired || !cvc) {
      alert("Por favor complete todos los campos del formulario de pago.");
      return;
    }

    alert("¡Pago realizado con éxito!");
    this.carrito.vaciar();
    this.actualizarTodasLasCantidades();
    this.ocultarModal("paymentModal");
    this.ocultarModal("cartModal");
  }

  procesarCheckout() {
    if (this.carrito.obtenerTotalItems() === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    this.mostrarModal("paymentModal");
  }

  actualizarUIUsuario() {
    const usuario = localStorage.getItem("usuario");
    const userGreeting = document.getElementById("userGreeting");
    const userNameDisplay = document.getElementById("userNameDisplay");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");

    if (usuario) {
      userGreeting.style.display = "inline";
      userNameDisplay.textContent = usuario;
      logoutBtn.style.display = "inline-block";
      loginBtn.style.display = "none";
    } else {
      userGreeting.style.display = "none";
      logoutBtn.style.display = "none";
      loginBtn.style.display = "inline-block";
    }
  }

  manejarLogin(e) {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value;
    const nombreUsuario = correo.split("@")[0];

    localStorage.setItem("usuario", nombreUsuario);
    alert(`¡Inicio de sesión exitoso! Bienvenido de nuevo ${nombreUsuario}!`);
    this.ocultarModal("loginModal");
    this.actualizarUIUsuario();
    e.target.reset();
  }

  manejarRegistro(e) {
    e.preventDefault();

    const nombre = document.getElementById("regNombre").value;
    const correo = document.getElementById("regCorreo").value;
    const password = document.getElementById("regPassword").value;
    const passwordConfirm = document.getElementById("regPasswordConfirm").value;

    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    localStorage.setItem("usuario", nombre);
    alert(`¡Registro exitoso! Bienvenido ${nombre}!`);
    this.ocultarModal("registroModal");
    this.actualizarUIUsuario();
    e.target.reset();
  }

  inicializarNavegacion() {
    document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const seccion = link.dataset.section;
        this.navegarASeccion(seccion);
      });
    });
    document.querySelector(".hero-cta .btn-primary").addEventListener("click", (e) => {
      e.preventDefault();
      this.navegarASeccion("camisetas");
    });
    document.querySelectorAll(".footer-section a[data-section]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const seccion = link.dataset.section;
        this.navegarASeccion(seccion);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  navegarASeccion(seccion) {
    document.querySelectorAll(".hero, .catalog-section, .form-section").forEach((section) => {
      section.classList.remove("section-visible");
      section.classList.add("section-hidden");
    });
    const seccionElement = document.getElementById(seccion);
    if (seccionElement) {
      seccionElement.classList.remove("section-hidden");
      seccionElement.classList.add("section-visible");
    }
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.section === seccion) {
        link.classList.add("active");
      }
    });
    this.seccionActual = seccion;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderizarProductos() {
    const categorias = ["camisetas", "pantalones", "buzos", "accesorios"];
    categorias.forEach((categoria) => {
      const grid = document.getElementById(`${categoria}Grid`);
      const productos = this.catalogo.obtenerPorCategoria(categoria);
      grid.innerHTML = productos.map((p) => p.generarHTML()).join("");
    });
    this.agregarEventosBotones();
  }

  agregarEventosBotones() {
    document.querySelectorAll(".btn-add").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id);
        const producto = this.catalogo.obtenerPorId(id);
        if (producto) {
          this.carrito.agregarProducto(producto);
          this.actualizarUI(id);
        }
      });
    });
    document.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number.parseInt(e.target.dataset.id);
        this.carrito.quitarProducto(id);
        this.actualizarUI(id);
      });
    });
  }

  actualizarUI(productoId) {
    const qtyDisplay = document.getElementById(`qty-${productoId}`);
    if (qtyDisplay) {
      qtyDisplay.textContent = this.carrito.obtenerCantidad(productoId);
    }
    document.getElementById("cartCount").textContent = this.carrito.obtenerTotalItems();
  }

  mostrarModal(modalId) {
    document.getElementById(modalId).classList.add("active");
  }

  ocultarModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
  }

  mostrarCarrito() {
    const modal = document.getElementById("cartModal");
    const cartItems = document.getElementById("cartItems");
    const items = this.carrito.obtenerItems();
    if (items.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío 🛒</div>';
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
          `
        )
        .join("");
      cartItems.querySelectorAll(".cart-item-remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = Number.parseInt(e.target.dataset.id);
          this.carrito.eliminarProducto(id);
          this.actualizarUI(id);
          this.mostrarCarrito();
        });
      });
    }
    document.getElementById("cartTotal").textContent = this.carrito.calcularTotal().toFixed(2);
    modal.classList.add("active");
  }

  ocultarCarrito() {
    document.getElementById("cartModal").classList.remove("active");
  }

  actualizarTodasLasCantidades() {
    this.catalogo.obtenerTodos().forEach((producto) => {
      this.actualizarUI(producto.id);
    });
  }

  manejarRegistro(e) {
    e.preventDefault();
    const nombre = document.getElementById("regNombre").value;
    const correo = document.getElementById("regCorreo").value;
    const password = document.getElementById("regPassword").value;
    const passwordConfirm = document.getElementById("regPasswordConfirm").value;
    if (password !== passwordConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    localStorage.setItem("usuario", nombre);
    alert(`¡Registro exitoso! Bienvenido ${nombre}!`);
    this.ocultarModal("registroModal");
    this.actualizarUIUsuario();
    e.target.reset();
  }

  manejarLogin(e) {
    e.preventDefault();
    const correo = document.getElementById("loginCorreo").value;
    const nombreUsuario = correo.split("@")[0];
    localStorage.setItem("usuario", nombreUsuario);
    alert(`¡Inicio de sesión exitoso! Bienvenido de nuevo ${nombreUsuario}!`);
    this.ocultarModal("loginModal");
    this.actualizarUIUsuario();
    e.target.reset();
  }

  manejarContacto(e) {
    e.preventDefault();
    const nombre = document.getElementById("contNombre").value;
    const correo = document.getElementById("contCorreo").value;
    const mensaje = document.getElementById("contMensaje").value;
    alert(`¡Mensaje enviado exitosamente! Gracias ${nombre}, te responderemos pronto.`);
    e.target.reset();
  }
}
