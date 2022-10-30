// Importação de módulos sempre vem antes de importação de arquivos.
import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    // Recebe o login do body (Insomnia).
    const { email, password } = req.body;

    /* Verifica se o email existe no banco.
    No where o email é informado apenas uma vez, pois a variável tem o mesmo nome da coluna no banco.
    */
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Usuário não existe." });
    }

    // Verifica se a senha coincide.
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const { id, name } = user;

    // Retorna o usuário na sessão.
    return res.json({
      user: {
        id,
        name,
        email,
      },
      /* Token JWT criando assinatura:
      Primeiro parâmetro (payload): id do usuário,
      Segundo parâmetro senha secreta (secret): patricpauluk em hash,
      Terceiro parâmetro (expiresIn): Tempo de expirar o token.

      -------------------------------------------------------------
      Código antigo:

      token: jwt.sign({ id }, "58de53383ac39b41917259413a4e3f1a", {
        expiresIn: "7d",
      }),

      O segundo e terceiro parâmetro foram passados para config > auth.js
      O código continua o mesmo.
      -------------------------------------------------------------

      O primeiro retorno no Insominia foi:
      {
        "user": {
          "id": 5,
          "name": "Patric",
          "email": "patric3@pauluk.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjY3MDk4MTcxLCJleHAiOjE2Njc3MDI5NzF9.xRKkqN6y1B6oVK3KJ6KNN38LOmoo4Y_GcxHtxtje0Qg"
      }
      */
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
