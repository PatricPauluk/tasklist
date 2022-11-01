// Middleware para verificar a integridade da autenticação, passado nas rotas

import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (req, res, next) => {
  // Captura o token no header/bearer do Insomnia
  const authHeader = req.headers.authorization;

  // Verifica se o token foi informado
  if (!authHeader) {
    return res.status(401).json({ error: "Token não existe" });
  }

  /* Trata a string do token, removendo o 'Bearer' do inicio.
  Em javascript, quando quer descartar a primeira posição do array, passa apenas uma vírgula.
  */
  const [, token] = authHeader.split(" ");

  // Realiza a autenticação do usuário
  try {
    /* Passa por parâmetro o token do usuário e o secret.
    O decoded recebe o payload (o id do usuário).

    Sobre o modo de verificação: const decoded = jwt.verify();
    A função verify utiliza o modo callback antigo de Javascript.
    Por isso, utilizamos o promisify para transformar uma função callback em async await.
    */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log(decoded); // Exemplo: { id: 5, iat: 1667260328, exp: 1667865128 } id e timestamp

    // Cria uma variável dentro de req que recebe o id do usuário logado
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
};
