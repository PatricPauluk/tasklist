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
}

export default new TaskController();
