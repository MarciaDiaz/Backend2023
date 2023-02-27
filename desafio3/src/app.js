import express from 'express';
import productos from './data.js';
import ProductManager from './productManager.js';

const app = express();
app.get('/', (req, res) => {
  res.send('<h1>Hola!</h1>');
});
app.get('/products', (req, res) => {
  res.send(productos);
});

let manager = new ProductManager();
app.get('/products/:id', async (req, res) => {
  let num = parseInt(req.params.id);
  res.send(manager.getProductById(num));
});

app.get('/products', (req, res) => {
  let { limit } = req.query;
  res.send(productos.filter((x) => x.id < limit));
});

//lista de max 3 items
app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const prods = await item.getProducts();
  if (!limit) {
    await res.send(prods);
  }
  //envia el filtrado de el numero de datos
  const filtered = prods.splice(0, limit);
  await res.send(filtered);
});

//segun el id
app.get('/products/:id', async (req, res) => {
  const prodId = await Number(req.params.id);
  const result = await item.getProductById(prodId);
  await res.send(result);
});

app.listen(8080, () => console.log(`Server listening to port 8080`));
