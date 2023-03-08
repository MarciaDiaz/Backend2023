const fs = require('fs');

class ProductManager {
  #path;
  #acumalator = 0;

  constructor(path) {
    this.#path = path;
  }

  async addProducts(title, description, price, thumbnail, code, stock) {
    const product = await this.getProduct();

    let cod = product.find((x) => x.code === code);
    if (cod) {
      throw new Error(`Error the Product Code ${code} exists`);
    }
    const newProduct = {
      id: this.#acumalator,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const updateProducts = [...product, newProduct];

    await fs.promises.writeFile(this.#path, JSON.stringify(updateProducts));

    this.#acumalator++;

    return newProduct;
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

  async getProduct() {
    //OBTENER
    try {
      const product = await fs.promises.readFile(this.#path, 'utf-8');

      return JSON.parse(product);
    } catch (e) {
      return [];
    }
  }

  // UPDATE PRODUCT

  async updateProduct(id, data) {
    console.log(id, data);
    const product = await this.getProduct();

    const updatedProducts = product.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...data,
          id,
        };
      }
      return p;
    });

    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
  }

  async deleteProduct(id) {
    const product = await this.getProduct();

    const updatedProducts = product.filter((p) => {
      return p.id !== id;
    });

    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
  }
}
async function main() {
  // ACÁ PASO COMO PARAMETRO EL PATCH DEL ARCHIVO

  const manager = new ProductManager('./Productos.json');

  await manager.addProducts('alfombra', 'voladora', 145, 'sin foto', 4519, 8);
  await manager.addProducts('alfombra2', 'voladora2', 135, 'sin foto', 4547, 2);
  await manager.addProducts('lampara', 'luminosa', 135, 'sin foto', 224, 6);

  await manager.updateProduct(1, {
    title: 'actualizado',
    description: 'actualizado',
    price: 135,
    thumbnail: 'actualizado',
    code: 4547,
    stock: 2,
  });

  await manager.deleteProduct(0);
  console.log(await manager.getProduct());

  //   await manager.getProductById(0);
}
main();
