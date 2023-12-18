import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const { parse } = require("path");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // static id = 0;

  async addProduct(product) {
    let parseData;
    if (
      product.title === undefined ||
      product.description === undefined ||
      product.price === undefined ||
      product.code === undefined ||
      product.stock === undefined
    ) {
      return console.log(
        "Por favor complete los campos: título, descripción, precio, código, stock"
      );
    }

    // ProductManager.id++;

    // const products = {
    //   id:
    //     parseData.length === 0
    //       ? 1
    //       : Math.max(...parseData.map((prod) => prod.id)) + 1,
    //   title: product.title,
    //   description: product.description,
    //   price: product.price,
    //   thumbnail: product.thumbnail || "",
    //   code: product.code,
    //   stock: product.stock,
    // };

    // verificar si el archivo existe, sino crear el array vacio leer el archivo, convertirlo a un array, agregar el objeto products al final del array, y luego escribir el array en el archivo.

    try {
      const file = fs.existsSync(this.path);
      // let parseData;
      if (file) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        parseData = JSON.parse(data);
      } else {
        parseData = [];
      }
    } catch (error) {
      console.log(error);
    }

    const products = {
      id:
        parseData.length === 0
          ? 1
          : Math.max(...parseData.map((prod) => prod.id)) + 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail || "",
      code: product.code,
      stock: product.stock,
    };

    // Usar la variable parseData solo cuando tenga un valor
    if (parseData) {
      parseData.push(products);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(parseData),
        "utf-8"
      );
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
        return prod.id === Number(id);
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
        return prod.id === Number(id);
      });
      if (prod.id === Number(id)) {
        prod.title === prod.title ?? prod.title;
        prod.description === prod.description ?? prod.description;
        prod.price === prod.price ?? prod.price;
        prod.stock === prod.stock ?? prod.stock;
        prod.code === prod.code ?? prod.code;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(parseData));
    } catch (error) {
      console.log("error al actualizar");
    }
  }

  // leer datos, convertir en array, buscar el indice,, si es valido o existe borrarlo

  async deleteProduct(id) {
    const datos = await fs.promises.readFile(this.path, "utf-8");
    const parseData = JSON.parse(datos);
    const index = parseData.findIndex((prod) => {
      prod.id === Number(id);
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
  const productmanager = new ProductManager("./products.json");
  let datas = await productmanager.getProducts();
  console.log(datas);

  const prod1 = {
    title: "EL SEÑOR DE LOS ANILLOS: RIVENDEL",
    description:
      "Rinde homenaje a la emblemática saga de películas con el nuevo y extraordinario set El Señor de los Anillos: Rivendel de LEGO® Icons. Con 15 minifiguras de personajes y detalles de gran autenticidad que aparecen conforme construyes, este fantástico set te permite recrear tus escenas favoritas e interpretar nuevas historias.",
    price: 150,
    thumbnail:
      "https://www.lego.com/cdn/cs/set/assets/bltec012c948c003fba/10316_alt16.png?format=webply&fit=bounds&quality=60&width=800&height=800&dpr=2",
    code: 4455,
    stock: 20,
  };
  const prod2 = {
    title: "Aragorn™ y Arwen",
    description:
      "Evoca la escena de la boda de Aragorn™ y Arwen™ en El Señor de los Anillos: El Retorno del Rey con estas figuras LEGO® BrickHeadz™ coleccionables (40632).",
    price: 2000,
    thumbnail:
      "https://www.lego.com/cdn/cs/set/assets/blta84e06d436db4688/40632.png?format=webply&fit=bounds&quality=60&width=800&height=800&dpr=2",
    code: 4566,
    stock: 45,
  };

  const prod3 = {
    title: "Fortaleza Eldorado",
    description:
      "Vuelven los bucaneros y los chaquetas azules para rendir homenaje a una leyenda de los piratas LEGO® con el set Fortaleza tropical de LEGO Icons.",
    price: 4000,
    thumbnail:
      "https://www.lego.com/es-ar/product/eldorado-fortress-10320?icmp=HP-SHCC-Standard-IC_CC_Block_10320_Project_Reboot_Product_HP-PR-IC-2B0O6890GD",
    code: 7895,
    stock: 15,
  };
  // await productmanager.addProduct(prod1);
  // await productmanager.addProduct(prod2);
  // await productmanager.addProduct(prod3);
  // datas = await productmanager.getProducts();
  // console.log(datas);
};

// test();

export default ProductManager;
