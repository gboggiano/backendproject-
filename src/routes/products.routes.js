import { Router } from "express";
import ProductManager from "../ProductManager.js";
const productmanager = new ProductManager("./products.json");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productmanager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      // si hay un límite, devolver sólo los primeros productos según el límite
      res.send({ products: products.slice(0, limit) });
    } else {
      // si no hay límite, devolver todos los productos
      res.send({ products: products });
    }
  } catch (error) {
    // si hay un error, enviar un mensaje de error con el código 500
    res.status(500).send({ message: "Error al leer los productos" });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productmanager.getProductById(pid);
    if (product) {
      // si el producto existe, devolverlo en un objeto
      res.send({ product: product });
    } else {
      // si el producto no existe, enviar un mensaje de error con el código 404
      res.status(404).send({ message: "Producto no encontrado" });
    }
  } catch (error) {
    // si hay un error, enviar un mensaje de error con el código 500
    res.status(500).send({ message: "Error al buscar el producto" });
  }
});

export default productsRouter;
