import Sequelize, { Model } from "sequelize";

/* O sequelize também é importado nos models nesta API
Os métodos são diferentes, porém semelhantes quando trabalhado com Mongoose.
*/

class User extends Model{
  static init(sequelize){
    // O super chama o método init desta mesma classe.
    super.init(
      { // Campos informados pelo usuário
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      { // Passa por parâmetro o sequelize recebido em Init
        sequelize,
      }
    );
  }
}

export default User;
