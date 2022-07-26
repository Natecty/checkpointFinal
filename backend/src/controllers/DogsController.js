const models = require("../models");

class DogsController {
  static browse = (req, res) => {
    models.dog
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    const dog = req.body;
    dog.id = parseInt(req.params.id, 10);
    models.dog
      .findDog(dog)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const dog = req.body;

    // TODO validations (length, format...)

    dog.id = parseInt(req.params.id, 10);

    models.dog
      .update(dog)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const dog = req.body;

    // TODO validations (length, format...)

    models.dog
      .insert(dog)
      .then(([result]) => {
        res.status(201).send({ ...dog, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    const dog = req.body;
    dog.id = parseInt(req.params.id, 10);
    models.dog
      .delete(dog)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = DogsController;
