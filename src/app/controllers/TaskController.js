import * as Yup from "yup";
import Task from "../models/Task";

class TaskController {
  // Lista as tasks cadastradas
  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId, check: false },
    });
    return res.json(tasks);
  }

  // Cadastra uma nova task
  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha ao cadastrar." });
    }

    const { task } = req.body;

    const tasks = await Task.create({
      // Lembrando que o user_id é capturado no authMiddleware antes de acessar a rota
      user_id: req.userId,
      task,
    });

    return res.json(tasks);
  }

  // Finaliza a task
  async update(req, res) {
    /* Recebe o ID da task por parâmetro na URL
    O parâmetro poderia ser referenciado como: req.params.task_id
    */
    const { task_id } = req.params;

    // Busca a task no banco
    const task = await Task.findByPk(task_id);

    // Verifica se foi encontrada uma task
    if (!task) {
      return res.status(400).json({ error: "Tarefa não encontrada." });
    }

    // Verifica se o usuário é o autor da task para poder marca-la
    if (task.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "Você não pode marcar uma task que não é sua." });
    }

    // Atualiza conforme as informações passadas no body
    await task.update(req.body);

    return res.json(task);
  }

  // Deleta a task
  async delete(req, res) {
    const { task_id } = req.params;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: "Tarefa não encontrada." });
    }

    if (task.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "Você não pode deletar uma tarefa que não é sua." });
    }

    // Deleta a task
    await task.destroy();

    return res.send();
  }
}

export default new TaskController();
