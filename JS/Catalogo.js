import { Producto } from "./Producto.js"

/**
 * Clase Catalogo
 * Maneja el catálogo de productos de la tienda
 */
export class Catalogo {
  constructor() {
    this.productos = []
    this.inicializarProductos()
  }

  /**
   * Inicializa los productos del catálogo
   * BACKEND CONNECTION POINT:
   * En producción, estos datos vendrán de Java + PHP + MySQL
   * Endpoint esperado: GET /api/productos
   */
  inicializarProductos() {
    // Camisetas
    this.productos.push(
      new Producto(
        1,
        "Camiseta Urban Black",
        "Camiseta negra de algodón premium con diseño urbano",
        29.99,
        "/black-urban-t-shirt.jpg",
        "camisetas",
      ),
      new Producto(
        2,
        "Camiseta Purple Wave",
        "Camiseta morada con estampado de onda",
        34.99,
        "/purple-wave-t-shirt.jpg",
        "camisetas",
      ),
      new Producto(
        3,
        "Camiseta Minimal White",
        "Camiseta blanca minimalista de corte moderno",
        27.99,
        "/white-minimal-t-shirt.jpg",
        "camisetas",
      ),
      new Producto(
        4,
        "Camiseta Graphic Tee",
        "Camiseta con gráfico artístico exclusivo",
        32.99,
        "/graphic-art-t-shirt.jpg",
        "camisetas",
      ),
      new Producto(
        5,
        "Camiseta Oversized",
        "Camiseta oversized de estilo streetwear",
        36.99,
        "/oversized-streetwear-t-shirt.jpg",
        "camisetas",
      ),
      new Producto(
        6,
        "Camiseta Vintage",
        "Camiseta con efecto vintage desgastado",
        31.99,
        "/vintage-distressed-t-shirt.jpg",
        "camisetas",
      ),
    )

    // Pantalones
    this.productos.push(
      new Producto(
        7,
        "Pantalón Cargo Black",
        "Pantalón cargo negro con múltiples bolsillos",
        59.99,
        "/black-cargo-pants.png",
        "pantalones",
      ),
      new Producto(
        8,
        "Jeans Slim Fit",
        "Jeans ajustados de mezclilla premium",
        64.99,
        "/slim-fit-jeans.png",
        "pantalones",
      ),
      new Producto(
        9,
        "Pantalón Jogger",
        "Pantalón jogger cómodo para uso diario",
        49.99,
        "/jogger-pants.png",
        "pantalones",
      ),
      new Producto(
        10,
        "Pantalón Wide Leg",
        "Pantalón de pierna ancha estilo urbano",
        54.99,
        "/wide-leg-pants-urban.jpg",
        "pantalones",
      ),
      new Producto(
        11,
        "Pantalón Chino",
        "Pantalón chino clásico de corte moderno",
        52.99,
        "/modern-chino-pants.jpg",
        "pantalones",
      ),
      new Producto(
        12,
        "Pantalón Deportivo",
        "Pantalón deportivo con franjas laterales",
        44.99,
        "/sport-track-pants.jpg",
        "pantalones",
      ),
    )

    // Buzos
    this.productos.push(
      new Producto(
        13,
        "Buzo Purple Hood",
        "Buzo con capucha morado de algodón suave",
        69.99,
        "/purple-hoodie.png",
        "buzos",
      ),
      new Producto(
        14,
        "Buzo Oversized Black",
        "Buzo oversized negro estilo streetwear",
        74.99,
        "/oversized-black-hoodie.jpg",
        "buzos",
      ),
      new Producto(15, "Buzo Zip-Up", "Buzo con cierre completo y bolsillos", 64.99, "/zip-up-hoodie.png", "buzos"),
      new Producto(16, "Buzo Cropped", "Buzo corto de estilo moderno", 59.99, "/cropped-hoodie.png", "buzos"),
      new Producto(
        17,
        "Buzo Tech Fleece",
        "Buzo de material tech fleece premium",
        79.99,
        "/tech-fleece-hoodie.png",
        "buzos",
      ),
      new Producto(
        18,
        "Buzo Vintage Logo",
        "Buzo con logo vintage bordado",
        67.99,
        "/vintage-logo-hoodie.jpg",
        "buzos",
      ),
    )

    // Accesorios
    this.productos.push(
      new Producto(19, "Gorra Snapback", "Gorra snapback con logo bordado", 24.99, "/snapback-cap.jpg", "accesorios"),
      new Producto(
        20,
        "Mochila Urban",
        "Mochila urbana con compartimento para laptop",
        49.99,
        "/urban-backpack.png",
        "accesorios",
      ),
      new Producto(
        21,
        "Gafas de Sol",
        "Gafas de sol con protección UV",
        34.99,
        "/stylish-sunglasses.png",
        "accesorios",
      ),
      new Producto(
        22,
        "Cinturón Canvas",
        "Cinturón de lona con hebilla metálica",
        19.99,
        "/canvas-belt.jpg",
        "accesorios",
      ),
      new Producto(
        23,
        "Calcetines Pack",
        "Pack de 3 pares de calcetines premium",
        14.99,
        "/premium-socks-pack.jpg",
        "accesorios",
      ),
      new Producto(24, "Beanie Winter", "Gorro de invierno de lana suave", 22.99, "/winter-beanie.jpg", "accesorios"),
    )
  }

  /**
   * Obtiene productos por categoría
   * @param {string} categoria - Categoría de productos
   * @returns {Array<Producto>} Array de productos de la categoría
   */
  obtenerPorCategoria(categoria) {
    return this.productos.filter((p) => p.categoria === categoria)
  }

  /**
   * Obtiene un producto por ID
   * @param {number} id - ID del producto
   * @returns {Producto|null} Producto encontrado o null
   */
  obtenerPorId(id) {
    return this.productos.find((p) => p.id === id) || null
  }

  /**
   * Obtiene todos los productos
   * @returns {Array<Producto>} Array de todos los productos
   */
  obtenerTodos() {
    return this.productos
  }
}
