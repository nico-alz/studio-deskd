/**
 * Clase Carrito
 * Maneja la lógica del carrito de compras
 */
export class Carrito {
  constructor() {
    this.items = new Map() // Map<productoId, {producto, cantidad}>
  }

  /**
   * Agrega un producto al carrito
   * @param {Producto} producto - Producto a agregar
   */
  agregarProducto(producto) {
    if (this.items.has(producto.id)) {
      const item = this.items.get(producto.id)
      item.cantidad++
    } else {
      this.items.set(producto.id, {
        producto: producto,
        cantidad: 1,
      })
    }
    this.actualizarStorage()
  }

  /**
   * Quita una unidad de un producto del carrito
   * @param {number} productoId - ID del producto
   */
  quitarProducto(productoId) {
    if (this.items.has(productoId)) {
      const item = this.items.get(productoId)
      item.cantidad--

      if (item.cantidad <= 0) {
        this.items.delete(productoId)
      }
    }
    this.actualizarStorage()
  }

  /**
   * Elimina completamente un producto del carrito
   * @param {number} productoId - ID del producto
   */
  eliminarProducto(productoId) {
    this.items.delete(productoId)
    this.actualizarStorage()
  }

  /**
   * Obtiene la cantidad de un producto en el carrito
   * @param {number} productoId - ID del producto
   * @returns {number} Cantidad del producto
   */
  obtenerCantidad(productoId) {
    if (this.items.has(productoId)) {
      return this.items.get(productoId).cantidad
    }
    return 0
  }

  /**
   * Calcula el total del carrito
   * @returns {number} Total del carrito
   */
  calcularTotal() {
    let total = 0
    this.items.forEach((item) => {
      total += item.producto.precio * item.cantidad
    })
    return total
  }

  /**
   * Obtiene el número total de items en el carrito
   * @returns {number} Número total de items
   */
  obtenerTotalItems() {
    let total = 0
    this.items.forEach((item) => {
      total += item.cantidad
    })
    return total
  }

  /**
   * Obtiene todos los items del carrito
   * @returns {Array} Array de items del carrito
   */
  obtenerItems() {
    return Array.from(this.items.values())
  }

  /**
   * Vacía el carrito
   */
  vaciar() {
    this.items.clear()
    this.actualizarStorage()
  }

  /**
   * Actualiza el localStorage (simulación de persistencia)
   */
  actualizarStorage() {
    // Por ahora solo en memoria, pero preparado para persistencia
    // BACKEND CONNECTION POINT:
    // Aquí se conectará con Java + PHP + MySQL para guardar el carrito del usuario
    // Endpoint esperado: POST /api/carrito/actualizar
  }

  /**
   * Procesa el checkout del carrito
   * @returns {Object} Datos del pedido
   */
  procesarCheckout() {
    const pedido = {
      items: this.obtenerItems().map((item) => ({
        productoId: item.producto.id,
        nombre: item.producto.nombre,
        precio: item.producto.precio,
        cantidad: item.cantidad,
      })),
      total: this.calcularTotal(),
      fecha: new Date().toISOString(),
    }

    // BACKEND CONNECTION POINT:
    // Aquí se conectará con Java + PHP + MySQL para crear el pedido
    // Endpoint esperado: POST /api/pedidos/crear
    // Body: pedido (objeto con items, total, fecha)

    console.log("Pedido a procesar:", pedido)
    return pedido
  }
}
