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
    // Camisetas (6 productos)
    this.productos.push(
      new Producto(
        1,
        "Camiseta Urban Black",
        "Camiseta negra de algodón premium con diseño urbano exclusivo",
        45.000,
        "../imagenes/camisa 7.jpg",
        "camisetas",
      ),
      new Producto(
        2,
        "Camiseta Purple Wave",
        "Camiseta morada con estampado de onda artístico",
        60.00,
        "../imagenes/camisa 9.jpg",
        "camisetas",
      ),
      new Producto(
        3,
        "Camiseta Minimal White",
        "Camiseta blanca minimalista de corte moderno",
        55.900,
        "../imagenes/camisa 8.jpg",
        "camisetas",
      ),
      new Producto(
        4,
        "Camiseta Graphic Tee",
        "Camiseta con gráfico artístico exclusivo de la colección",
        32.00,
        "../imagenes/camisa 16.jpg",
        "camisetas",
      ),
      new Producto(
        5,
        "Camiseta Oversized",
        "Camiseta oversized de estilo streetwear premium",
        32.00,
        "../imagenes/camisa 67.jpg",
        "camisetas",
      ),
      new Producto(
        6,
        "Camiseta Vintage",
        "Camiseta con efecto vintage desgastado auténtico",
        32.00,
        "../imagenes/camisa22.jpg",
        "camisetas",
      ),
    )

    // Pantalones (6 productos)
    this.productos.push(
      new Producto(
        7,
        "Pantalón Cargo Black",
        "Pantalón cargo negro con múltiples bolsillos funcionales",
        87.00,
        "../imagenes/pantalon 1.jpg",
        "pantalones",
      ),
      new Producto(
        8,
        "Jeans Slim Fit",
        "Jeans ajustados de mezclilla premium importada",
        87.00,
        "../imagenes/pantalon 3.jpg",
        "pantalones",
      ),
      new Producto(
        9,
        "Pantalón Jogger",
        "Pantalón jogger cómodo para uso diario urbano",
        167,
        "../imagenes/pantalon 4.jpg",
        "pantalones",
      ),
      new Producto(
        10,
        "Pantalón Wide Leg",
        "Pantalón de pierna ancha estilo urbano contemporáneo",
        185,
        "../imagenes/pantalon 5.jpg",
        "pantalones",
      ),
      new Producto(
        11,
        "Pantalón Chino",
        "Pantalón chino clásico de corte moderno versátil",
        185,
        "../imagenes/pantalon 6.jpg",
        "pantalones",
      ),
      new Producto(
        12,
        "Pantalón Deportivo",
        "Pantalón deportivo con franjas laterales de diseño",
        92.00,
        "../imagenes/pantalon86.jpg",
        "pantalones",
      ),
    )

    // Buzos (6 productos)
    this.productos.push(
      new Producto(
        13,
        "Buzo Purple Hood",
        "Buzo con capucha morado de algodón suave premium",
        88.00,
        "../imagenes/camisa 10.jpg",
        "buzos",
      ),
      new Producto(
        14,
        "Buzo Oversized Black",
        "Buzo oversized negro estilo streetwear exclusivo",
        112,
        "../imagenes/camisa 17.jpg",
        "buzos",
      ),
      new Producto(
        15,
        "Buzo Zip-Up",
        "Buzo con cierre completo y bolsillos laterales",
        100,
        "../imagenes/camisa 12.jpg",
        "buzos",
      ),
      new Producto(
        16,
        "Buzo Cropped",
        "Buzo corto de estilo moderno y contemporáneo",
        157,
        "../imagenes/buzo.jpg",
        "buzos",
      ),
      new Producto(
        17,
        "Buzo Tech Fleece",
        "Buzo de material tech fleece premium de alta calidad",
        170,
        "../imagenes/buzo1.jpg",
        "buzos",
      ),
      new Producto(
        18,
        "Buzo Vintage Logo",
        "Buzo con logo vintage bordado de la marca",
        88.00,
        "../imagenes/buzo2.jpg",
        "buzos",
      ),
    )

    // Accesorios (6 productos)
    this.productos.push(
      new Producto(
        19,
        "Gorra Snapback",
        "Gorra snapback con logo bordado de alta calidad",
        85.00,
        "../imagenes/reloj.jpg",
        "accesorios",
      ),
      new Producto(
        20,
        "Mochila Urban",
        'Mochila urbana con compartimento para laptop 15"',
        25.00,
        "../imagenes/collar.jpg",
        "accesorios",
      ),
      new Producto(
        21,
        "Gafas de Sol",
        "Gafas de sol con protección UV400 premium",
        40.00,
        "../imagenes/gafas.jpg",
        "accesorios",
      ),
      new Producto(
        22,
        "Cinturón Canvas",
        "Cinturón de lona con hebilla metálica resistente",
        55.00,
        "../imagenes/gorro.jpg",
        "accesorios",
      ),
      new Producto(
        23,
        "Calcetines Pack",
        "Pack de 3 pares de calcetines premium de algodón",
        27.00,
        "../imagenes/manillas.jpg",
        "accesorios",
      ),
      new Producto(
        24,
        "Beanie Winter",
        "Gorro de invierno de lana suave y cálida",
        30.00,
        "../imagenes/Anillos.jpg",
        "accesorios",
      ),
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
