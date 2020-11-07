const router = require("express").Router();
const AvaliacaoController = require("../../../controllers/AvaliacaoController");

const auth = require("../../auth");

const { validate } = require('express-validation');
const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const AvaliacaoValidation = require("../../../controllers/validacoes/avaliacaoValidation");

const avaliacaoController = new AvaliacaoController();

// CLIENTES/VISITANTES
router.get("/", validate(AvaliacaoValidation.index, {}, {}) ,avaliacaoController.index); // testado
router.get("/:id", validate(AvaliacaoValidation.show, {}, {}) ,avaliacaoController.show); // testado
router.post("/", validate(AvaliacaoValidation.store, {}, {}) ,auth.required, avaliacaoController.store); // testado

// ADMIN
router.delete("/:id", auth.required, LojaValidation.admin, validate(AvaliacaoValidation.remove, {}, {}) ,avaliacaoController.remove); //testado

module.exports = router;