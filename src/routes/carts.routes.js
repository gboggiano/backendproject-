import { Router } from "express";
import CartManager from "../CartManager.js";

const cartmanager = new CartManager("./Cart.json");

const cartsRouter = Router();

cartsRouter.get("/", async (req, res) => {
  const carts = await cartmanager.getCarts();
  res.send(carts);
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartById = await cartmanager.getCartById(cid);
  if (!cartById) {
    return res.status(400).send({ message: "cart not found" });
  }
  res.send(cartById);
});

cartsRouter.post("/", async (req, res) => {
  const cartAdded = await cartmanager.addCart();
  if (!cartAdded) {
    return res.status(400).send({ message: "Error, cart not added" });
  }
  res.send({ message: "cart added" });
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const productAddedToCart = await cartmanager.addProdcutToCart(pid, cid);
  if (!productAddedToCart) {
    return res.status(400).send({ message: "error: product not added" });
  }
  res.send({ message: "product added to cart" });
});

export default cartsRouter;
