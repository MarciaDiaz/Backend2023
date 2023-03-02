import fs from 'fs';
import productos from './data.js';

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
    const product = await this.getProduct();

    let element = product.find((x) => x.id === id);
    if (element) {
      fs.promises.appendFile(`Producto con ID ${id}: ${JSON.stringify(element)}`);
      return element;
    } else {
      return [];
    }
  }

  async getProduct() {
    try {
      const product = await fs.promises.readFile(this.#path, 'utf-8');

      return JSON.parse(product);
    } catch (e) {
      return [];
    }
  }

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

export default ProductManager;
