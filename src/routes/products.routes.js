import { Router } from "express";
import ProductManager from "../ProductManager.js";
//***** */
import io from "../app.js";
//**** */

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

//********************** */
productsRouter.post("/", async (req, res) => {
  try {
    const product = await productmanager.addProduct(req.body);
    if (product) {
      res.send({ product: product });
      // Emitir un evento de socket.io al crear un nuevo producto
      io.emit("new product", product);
    } else {
      res.status(400).send({ message: "Error al crear el producto" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al guardar el producto" });
  }
});
/// ******** ruta GET que renderice la vista

productsRouter.get("/home", async (req, res) => {
  // Obtener el array de productos usando el método getProducts
  const products = await productmanager.getProducts();
  // Renderizar la vista home.handlebars con el array de productos como datos
  res.render("home", { products });
});

///

export default productsRouter;
