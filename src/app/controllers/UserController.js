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
    // O token do usuário é inserido em Bearer Auth no Insomnia, para realizar a atualização
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
