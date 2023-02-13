const fs = require('fs');

class ProductManager {
  #acumalator = 0;
  #path = './Products.json';

  async addProducts(title, description, price, thumbnail, code, stock) {
    //CONSULTAR
    const newProduct = {
      id: this.#acumalator,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const product = await this.getProduct();

    //NO SE REPITA EL CODE

    let cd = product.find((x) => x.code === code);
    if (!cd) {
      fs.promises.writeFile(this.#path, JSON.stringify([...product, newProduct]));
      this.#acumalator += 1;
    } else {
      throw new Error(`Error the Product Code ${code} exists`);
    }

    const updateProducts = [...product, newProduct];
    await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));
  }

  async getProductById(id) {
    // Producto por ID

    const product = await this.getProduct();

    let element = product.find((x) => x.id === id);
    if (element) {
      fs.promises.appendFile(`Producto con ID ${id}: ${JSON.stringify(element)}`);
      return console.log(element);
    } else {
      throw new Error(`Product with id: ${id} Not Found`);
    }
  }

  //////////////////////////////////////////////

  async getProduct() {
    //OBTENER
    try {
      const product = await fs.promises.readFile(this.#path, 'utf-8');

      return JSON.parse(product);
    } catch (e) {
      return [];
    }
  }
}
async function main() {
  const manager = new ProductManager();
  console.log(await manager.getProduct());

  await manager.addProducts('alfombra', 'voladora', 145, 'sin foto', 4519, 8);
  await manager.addProducts('alfombra2', 'voladora2', 135, 'sin foto', 4547, 2);

  console.log(await manager.getProduct());

  await manager.getProductById(0);
}
main();
