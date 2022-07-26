const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  findAll() {
    return this.connection.query(`SELECT * FROM user`);
  }

  findByUserId(user) {
    return this.connection.query(
      `SELECT * FROM dogs 
      WHERE userId = ?`,
      [user.id]
    );
  }

  findUser(user) {
    return this.connection.query(
      `SELECT * FROM user
      WHERE user.id = ? `,
      [user.id]
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (title) values (?)`,
      [user.title]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${UserManager.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }
}

module.exports = UserManager;
