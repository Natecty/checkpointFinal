const AbstractManager = require("./AbstractManager");

class DogsManager extends AbstractManager {
  static table = "dog";

  findAll() {
    return this.connection.query(
      `SELECT * FROM dogs INNER JOIN user ON dogs.userId = user.id`
    );
  }

  findDog(dog) {
    return this.connection.query(
      `SELECT * FROM dogs INNER JOIN user ON dogs.userId = user.id
      WHERE dogs.dogId = ? `,
      [dog.id]
    );
  }

  insert(dog) {
    return this.connection.query(
      `INSERT INTO dogs (name,race, alive, age, level,userId) VALUES (?,?,?,?,?,?)`,
      [dog.name, dog.race, dog.alive, dog.age, dog.level, dog.userId]
    );
  }

  update(dog) {
    return this.connection.query(
      `update ${DogsManager.table} set title = ? where id = ?`,
      [dog.title, dog.id]
    );
  }

  delete(dog) {
    return this.connection.query(`DELETE FROM dogs WHERE dogs.dogId = ?`, [
      dog.id,
    ]);
  }
}

module.exports = DogsManager;
