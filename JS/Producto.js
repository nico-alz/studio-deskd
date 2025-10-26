/**
 * Clase Producto
 * Representa un producto individual en la tienda
 */
export class Producto {
  constructor(id, nombre, descripcion, precio, imagen, categoria) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.precio = precio
    this.imagen = imagen
    this.categoria = categoria
  }

  /**
   * Genera el HTML para mostrar el producto
   * @returns {string} HTML del producto
   */
  generarHTML() {
    return `
            <div class="product-card" data-id="${this.id}">
                <img src="${this.imagen}" alt="${this.nombre}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${this.nombre}</h3>
                    <p class="product-description">${this.descripcion}</p>
                    <p class="product-price">$${this.precio.toFixed(2)}</p>
                    <div class="product-actions">
                        <div class="product-quantity">
                            <button class="quantity-btn btn-remove" data-id="${this.id}">−</button>
                            <span class="quantity-display" id="qty-${this.id}">0</span>
                            <button class="quantity-btn btn-add" data-id="${this.id}">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `
  }

  /**
   * Convierte el producto a un objeto simple para el carrito
   * @returns {Object} Objeto con datos del producto
   */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: this.imagen,
      categoria: this.categoria,
    }
  }
}

// BACKEND CONNECTION POINT:
// En el futuro, esta clase se conectará con Java + PHP + MySQL
// para obtener los productos desde la base de datos
// Endpoint esperado: GET /api/productos
// Respuesta esperada: JSON con array de productos
