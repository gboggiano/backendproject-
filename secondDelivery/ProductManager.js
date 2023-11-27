// La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

//--------------------------------------
// Debe guardar objetos con el siguiente formato:
// id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// code (código identificador)
// stock (número de piezas disponibles)
//--------------------------------------
// Aspectos a incluir
// Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
//--------------------------------------------------
// Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
//--------------------------------------
// Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato
// objeto

//--------------------------------------
// Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo.
// NO DEBE BORRARSE SU ID
// Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
// Formato del entregable
//--------------------------------------

const fs = require("fs");
const { parse } = require("path");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  static id = 0;

  async addProducts(product) {
    // product = JSON.parse(product);
    if (
      typeof product.title == undefined ||
      typeof product.description == undefined ||
      typeof product.price == undefined ||
      typeof product.code == undefined ||
      typeof product.stock == undefined
    ) {
      return console.log(
        " please complete : title, description, price, thumbnail (optional), code, stock "
      );
    }

    ProductManager.id++;

    const products = {
      id: ProductManager.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail || "",
      code: product.code,
      stock: product.stock,
    };

    // verificar si el archivo existe, sino crear el array vacio leer el archivo, convertirlo a un array, agregar el objeto products al final del array, y luego escribir el array en el archivo.

    try {
      const file = fs.existsSync(this.path);
      let parseData;
      if (file) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        parseData = JSON.parse(data);
      } else {
        parseData = [];
      }

      parseData.push(products);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(parseData),
        "utf-8"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const datos = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(datos);
      return parseData;
    } catch (error) {
      console.log("no hay datos de productos");
      return [];
    }
  }

  async getProductById(id) {
    try {
      const datos = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(datos);
      const product = parseData.find((prod) => {
        prod.id === id;
      });
      return product;
    } catch (error) {
      console.log("error");
    }
  }

  // recibe el prodcuto como parametro , busca por id, valida  con ?? si los datos validos y escribe en el documento

  async updateProduct(id, product) {
    try {
      const datos = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(datos);
      const prod = parseData.find((prod) => {
        return prod.id === id;
      });
      if (prod.id === id) {
        prod.title = prod.title ?? prod.title;
        prod.description = prod.description ?? prod.description;
        prod.price = prod.price ?? prod.price;
        prod.stock = prod.stock ?? prod.stock;
        prod.code = prod.code ?? prod.code;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(parseData));
    } catch (error) {
      console.log("error al actualizar");
    }
  }

  // leer datos, convertir en array, buscar el indice,, si es valido o existe borrarlo

  async deleteProduct(id) {
    const datos = await fs.promises.readFile(this.path, "utf-8");
    const parseData = JSON.parce(datos);
    const index = parseData.findIndex((prod) => {
      prod.id == id;
    });
    if (index >= 0) {
      parseData.splice(index, 1);
    }
    await fs.promises.writeFile(this.path, JSON.stringify(parseData));

    try {
    } catch (error) {
      console.log("no se puede borrar el error");
    }
  }
}

const test = async () => {
  const productmanager = new ProductManager("./Productos.json");
  let datas = await productmanager.getProducts();
  console.log(datas);

  const prod1 = {
    title: "arroz",
    description: "arroz integral",
    price: 1500,
    thumbnail: "https://thisisatest.com",
    code: 4455,
    stock: 20,
  };

  await productmanager.addProducts(prod1);
  datas = await productmanager.getProducts();
  console.log(datas);
};

test();
