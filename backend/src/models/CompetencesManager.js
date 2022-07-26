const AbstractManager = require("./AbstractManager");

class CompetencesManager extends AbstractManager {
  static table = "competence";

  findAll() {
    return this.connection.query(`SELECT * FROM competences`);
  }

  insert(competence) {
    return this.connection.query(
      `insert into ${CompetencesManager.table} (title) values (?)`,
      [competence.title]
    );
  }

  update(competence) {
    return this.connection.query(
      `update ${CompetencesManager.table} set title = ? where id = ?`,
      [competence.title, competence.id]
    );
  }
}

module.exports = CompetencesManager;
