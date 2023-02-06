class ProductManager {
  products = [];
  #acumulator = 0;

  //AGREGA PRODUCTOS
  addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.#acumulator,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
  }

  //METODO 1 DEVOLVER EL ARREGLO CON TODOS LOS PRODUCTOS
  getProducts() {
    return this.products;
  }

  //METODO2 BUSCAR EL QUE COINCIDA CON EL ID
  getProductById(idProduct) {
    //si no coincide "not found"
    const product = this.products.find((prod) => prod.id === idProduct);

    if (!product) {
      throw new Error(`not found`);
    }
  }
}

const manager = new ProductManager();
console.log(manager.getProducts());
