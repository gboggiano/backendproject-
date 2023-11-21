class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //Validacion de no repeticion campo code
    if (this.products.some((prod) => prod.code === code)) {
      console.log("this product exist");
    }
    //validacion de campos obligatorios
    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      console.log("all fields are mandatories");
    }

    ProductManager.id++;
    const product = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
  }

  /////// metodo busqueda por id
  getProductById(productId) {
    const product = this.products.find((prod) => prod.id === productId);
    if (product === undefined) {
      console.log("************  Not Found  ***********");
    }
    return product;
  }

  ///
  addNewProduct(productId, title, description, price, code, stock) {
    this.addProduct(productId, title, description, price, code, stock);
  }
}

///
const productmanager = new ProductManager();
productmanager.addNewProduct(
  "papa",
  "esto es una prueba",
  100,
  "https://example.com/papa.jpg",
  3245,
  20
);
const prodID = productmanager.getProductById(1);
console.log(productmanager.products);
