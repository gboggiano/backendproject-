import express from "express";
import ProductManager from "./ProductManager.js";

const PORT = 8080;
const app = express();

const productmanager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  try {
    const products = await productmanager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      // si hay un límite, devolver sólo los primeros productos según el límite
      res.json({ products: products.slice(0, limit) });
    } else {
      // si no hay límite, devolver todos los productos
      res.json({ products: products });
    }
  } catch (error) {
    // si hay un error, enviar un mensaje de error con el código 500
    res.status(500).json({ message: "Error al leer los productos" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productmanager.getProductById(pid);
    if (product) {
      // si el producto existe, devolverlo en un objeto
      res.json({ product: product });
    } else {
      // si el producto no existe, enviar un mensaje de error con el código 404
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    // si hay un error, enviar un mensaje de error con el código 500
    res.status(500).json({ message: "Error al buscar el producto" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
