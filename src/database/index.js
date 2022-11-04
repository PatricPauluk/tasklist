import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";

import User from "../app/models/User";
import Task from "../app/models/Task";

// Array que recebe os models.
const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  // Faz a conexão do banco de dados com os models e a aplicação.
  init() {
    // A variável connection recebe as configurações do banco de dados.
    this.connection = new Sequelize(databaseConfig);

    /* Realiza a conexão e carrega os models (função map percorre o array).
    Podem ser acessados os métodos dos models.
    A conexão do banco de dados é passada por parâmetro pelo init, como sequelize.

    Antigo:
    models.map((model) => model.init(this.connection));

    Na criação e atualização de usuários o código acima funcionava normalmente, porém
    na criação do model Task foi necessário acrescentar mais um map devido ao associate.
    O outro map percorre todos os models buscando associate e faz a conexão deles.
    */
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
