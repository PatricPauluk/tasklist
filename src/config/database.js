// Dados de configuração do banco
// Configuração de forma antiga para scan do sequelize

module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "9XqwBgWn",
  database: "tasklist",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

/* Explicações do define:

timestamps:
Cria campos created at e updated at para dados inseridos.

underscored:
Caso seja criado um model User, será criado uma tabela user_id.

underscoredAll:
Faz o mesmo mas não só com o nome da tabela, também com os relacionamentos.
*/
