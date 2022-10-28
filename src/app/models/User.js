import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

/* O sequelize também é importado nos models nesta API
Os métodos são diferentes, porém semelhantes quando trabalhado com Mongoose.
*/

class User extends Model {
  static init(sequelize) {
    // O super chama o método init desta mesma classe.
    super.init(
      {
        // Campos informados pelo usuário
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // Campo virtual para receber a senha que será criptografada.
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        // Passa por parâmetro o sequelize recebido em Init.
        sequelize,
      }
    );

    // Antes do usuário ser criado, é chamado esta função.
    this.addHook("beforeSave", async (user) => {
      // Se for enviado um password no insomnia, realiza o processo de criptografia com o encrypt
      if (user.password) {
        // 8 no bcrypt significa a força da criptografia
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // Retorna o init.
    return this;
  }
}

export default User;
