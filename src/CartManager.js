import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === +cartId);
      if (!cart) {
        return false;
      }
      return cart;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
      carts.push({
        id: carts.length + 1,
        products: [],
      });

      await fs.promises.writeFile(this.path, JSON.stringify(carts), "utf-8");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async addProdcutToCart(pid, cid) {
    try {
      const carts = await this.getCarts();
      const updatedCarts = carts.map((cart) => {
        if (cart.id == +cid) {
          const existingProduct = cart.products.find((p) => p.id === +pid);
          if (existingProduct) {
            existingProduct.qantity++;
          } else {
            cart.products = [...cart.products, { id: pid, quantity: 1 }];
          }
        }
        return cart;
      });
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(updatedCarts),
        "utf-8"
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default CartManager;
