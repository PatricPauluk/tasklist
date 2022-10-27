import express from "express";
import routes from "./routes";

// Importando nossa database (o index não precisa ser especificado pois é chamado automaticamente).
import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
