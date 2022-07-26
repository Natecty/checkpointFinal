const express = require("express");

const {
  UserController,
  CompetencesController,
  DogsController,
} = require("./controllers");

const router = express.Router();

router.get("/dogs", DogsController.browse);
router.get("/users/:id/dogs/:id", DogsController.read);
router.post("/dogs", DogsController.add);
router.delete("/dogs/:id", DogsController.delete);

router.get("/competences", CompetencesController.browse);

router.get("/users", UserController.browse);
router.get("/users/:id", UserController.read);
router.get("/users/:id/dogs", UserController.browseDogs);

module.exports = router;
