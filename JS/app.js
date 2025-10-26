/**
 * Archivo principal de la aplicación
 * Inicializa todas las clases y arranca la aplicación
 */

// Importar las clases necesarias
import { Catalogo } from "./Catalogo.js"
import { Carrito } from "./Carrito.js"
import { UI } from "./UI.js"

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Crear instancias de las clases principales
  const catalogo = new Catalogo()
  const carrito = new Carrito()
  const ui = new UI(catalogo, carrito)

  // Log de inicio
  console.log("🛍️ STUDIO DESKD - Tienda Virtual Iniciada")
  console.log("📦 Productos cargados:", catalogo.obtenerTodos().length)
  console.log("📂 Productos por categoría:")
  console.log("  - Camisetas:", catalogo.obtenerPorCategoria("camisetas").length)
  console.log("  - Pantalones:", catalogo.obtenerPorCategoria("pantalones").length)
  console.log("  - Buzos:", catalogo.obtenerPorCategoria("buzos").length)
  console.log("  - Accesorios:", catalogo.obtenerPorCategoria("accesorios").length)

  // BACKEND CONNECTION POINTS SUMMARY:
  // 1. GET /api/productos - Obtener productos desde la base de datos
  // 2. POST /api/usuarios/registro - Registrar nuevo usuario
  // 3. POST /api/usuarios/login - Autenticar usuario
  // 4. POST /api/contacto/enviar - Enviar mensaje de contacto
  // 5. POST /api/carrito/actualizar - Actualizar carrito del usuario
  // 6. POST /api/pedidos/crear - Crear nuevo pedido

  console.log(
    "⚠️ Nota: Los endpoints del backend están marcados en el código para integración futura con Java + PHP + MySQL",
  )
})
