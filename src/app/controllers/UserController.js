import User from "../models/User";

class UserController {
  // Cadastro de usuários
  async store(req, res) {
    // Realiza a verificação, se já existe um usuário com o email enviado.
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    // Caso exista, o usuário não é inserido.
    if (userExists) {
      return res.status(400).json({ error: "Usuário já existente." });
    }

    // Cria os dados enviados pelo insomnia no banco, e envia os selecionados para as variáveis.
    const { id, name, email } = await User.create(req.body);

    // Retorna o usuário cadastrado para o frontend.
    return res.json({
      id,
      name,
      email,
    });
  }

  // Atualizar dados de usuário
  async update(req, res) {
    /* O token do usuário é inserido em Bearer Auth no Insomnia, para realizar a atualização.

    A variável req foi manipulada no middleware auth.js para a validação de atualização dos dados
    do usuário.

    Mesmo sendo manipulada em outro arquivo, ela pode ser utilizada neste controller:
    console.log(req.userId);

    Dados no Insomnia:
    {
      "name": "",
      "email": "",
      "oldPassword": "",
      "password": ""
    }
    */

    // Captura email e password antigo no Insomnia
    const { email, oldPassword } = req.body;

    // Busca o usuário a atualizar no banco pelo seu Id (recebido pelo middleware auth).
    const user = await User.findByPk(req.userId);

    // Se o email foi diferente do email do usuário atualmente logado...
    if (email !== user.email) {
      // Busca se o email informoado já existe (de outro usuário)
      const userExists = await User.findOne({
        where: { email },
      });

      // Se houver um usuário com o email já informado...
      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe." });
      }
    }

    // Se a senha antiga foi informada E é diferente da atual...
    if (oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Realiza as alterações e recebe o id e nome do usuário
    const { id, name } = await user.update(req.body);

    // Retorna o usuário atualizado no insomnia
    return res.json({
      id,
      name,
      email,
    });

    return res.json({ ok: true });
  }
}

export default new UserController();
