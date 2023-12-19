import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();
const PORT = 8080;

//configuracion carpeta public
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//motor handlebars
app.engine("handlebars", handlebars.engine());
//vista
app.set("views", "src/views");
//seleccion de motor
app.set("view engine", "handlebars");
//
app.get("/", (req, res) => {
  res.render("index");
});
//-----
const httpServer = app.listen(PORT, () => {
  console.log(`Backend project server runnning by ${PORT} port `);
});

const socketIo = new Server(httpServer);

//-----
//array para mensaje de conexion
const messages = [];

// Evento de conexion de cliente
socketIo.on("connection", (socket) => {
  console.log(`New Client connected through socket ${PORT}`);
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${PORT}`);
// });

export default socketIo;
