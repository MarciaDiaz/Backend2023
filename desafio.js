class ProductManager {
  products = [];
  #acumulator = 0;

  //AGREGA PRODUCTOS
  addProduct(title, description, price, thumbnail, code, stock) {
    /*Acá vamos a verificar que el codigo que ingreso yo como usuario 
    no haya sido guardado con anterioridad, usamos find (encontrar)
  */
    const product = this.products.find((prod) => prod.code === code);
    if (!product) {
      /* acá creamos un objeto que va a ser guardado en el 
      array products*/
      const newProduct = {
        /* acá le estamos dando el valor del acumulador al id,
       por eso no lo vamos a pasar como parametro en el método */
        id: this.#acumulator,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      /*Acá le estás pasando las propiedades de newProduct al array products */
      this.products = [...this.products, newProduct];
      this.#acumulator++;
    } else {
      /* ¿Esto qué quiere decir? 
    Ya existe un producto con el codigo que estás entregando o sea la 
    negación de arriba que dice no hay producto en el find me dio un false o 
    sea si hay producto, encontré algo con ese codigo
    */
      throw new Error(`Error the Product Code ${code} exists`);
    }
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

// instancio la clase
const manager = new ProductManager();
// acá estñas llamando al método, está muy bien, muestra en consola
console.log(manager.getProducts());

//Ahora vamos a entregarle los valores que solicita el metodo para que realice el proceso

manager.addProduct('Botella', 'Botella de agua en vidrio', 25, 'sin imagen', 'codigo123', 15);

manager.addProduct('Jarro', 'Jarro de decoracion', 40, 'sin imagen', 'codigo124', 10);

manager.addProduct('Alfombra', 'Alfombra de bienvenida', 30, 'sin imagen', 'codigo345', 7);

// vuelvo a llamar al metodo a ver que me entrega, al principio era un array vacio

console.log(manager.getProducts());

/* Acá voy a probar el metodo que va a verificar si existe un producto con id que yo quiera probar */

console.log(manager.getProductById(10));
