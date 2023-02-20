class Products {
  constructor(id, title, description, price, thumbnail, code, stock) {
    (this.id = id), (this.title = title), (this.description = description), (this.price = price), (this.thumbnail = thumbnail), (this.code = code), (this.stock = stock);
  }
}

let productos = [
  new Products(0, 'Alfombra', 'blanca voladora', 50, 'Sin imagen', '001', 20),
  new Products(1, 'Jarron', 'Gigante de piedra', 80, 'Sin imagen', '002', 12),
  new Products(2, 'Florero', 'Verde marfil', 100, 'Sin imagen', '003', 25),
  new Products(3, 'Cinturon', 'cuero negro', 40, 'Sin imagen', '004', 52),
  new Products(4, 'Mantel', 'Bordado', 120, 'Sin imagen', '005', 14),
  new Products(5, 'Cortina', 'Colores variados', 35, 'Sin imagen', '006', 20),
  new Products(6, 'Cuadro', 'Artesanal', 75, 'Sin imagen', '007', 8),
  new Products(7, 'Lampara', 'De pie azul', 50, 'Sin imagen', '008', 7),
  new Products(8, 'Mesa', 'Ratona', 45, 'Sin imagen', '009', 28),
  new Products(9, 'Perchero', 'De pared', 60, 'Sin imagen', '010', 16),
];
export default productos;
