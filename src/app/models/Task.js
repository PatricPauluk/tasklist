import Sequelize, { Model } from "sequelize";

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        task: Sequelize.STRING,
        check: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Função que associa o Id do Usuário como chave estrangeira para usar a tasklist
  static associate(models) {
    // A chave estrangeira é user_id, e o seu "apelido" é user
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

export default Task;
