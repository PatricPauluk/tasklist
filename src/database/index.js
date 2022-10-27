import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";

import User from "../app/models/User";

// Array que recebe os models.
const models = [User];

class Database {
  constructor(){
    this.init();
  }

  // Faz a conexão do banco de dados com os models e a aplicação.
  init(){
    // A variável connection recebe as configurações do banco de dados.
    this.connection = new Sequelize(databaseConfig);

    /* Realiza a conexão e carrega os models (função map percorre o array).
    Podem ser acessados os métodos dos models.
    A conexão do banco de dados é passada por parâmetro pelo init, como sequelize.
    */
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
