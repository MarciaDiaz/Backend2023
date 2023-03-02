import express from 'express';
import ProductManager from './productManager.js';

const app = express();
let manager = new ProductManager('./src/Products.json');

app.get('/', async (req, res) => {
  res.send('<h1>Hola! funciona?</h1>');
});

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const prods = await manager.getProduct();
  if (!limit) {
    await res.send(prods);
  }
  //envia el filtrado de el numero de datos
  const filtered = prods.splice(0, limit);
  await res.send(filtered);
});

app.get('/products/:id', async (req, res) => {
  let num = parseInt(req.params.id);
  const product = await manager.getProductById(num);

  if (product.length === 0) {
    res.send({ message: `producto no encontrado` });
  }

  res.send(product);
});

app.listen(8080, () => console.log(`Server listening to port 8080`));
