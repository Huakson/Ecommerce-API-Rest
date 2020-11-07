const router = require("express").Router();

const PagamentoController = require("../../../controllers/PagamentoController");

const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");

const pagamentoController = new PagamentoController();
const { PagamentoValidation } = require("../../../controllers/validacoes/pagamentoValidation");

const { validate } = require('express-validation');

// TESTE 
if (process.env.NODE_ENV !== "production") {
    router.get("/tokens", (req, res) => res.render("pagseguro/index"));
} 

// PAGSEGURO
router.post("/notificacao", pagamentoController.verNotificacao);
router.get("/session", pagamentoController.getSessionId);

// CLIENTES
router.get("/:id", auth.required, validate(PagamentoValidation.show, {}, {}), pagamentoController.show);
router.post("/pagar/:id", auth.required, validate(PagamentoValidation.pagar, {}, {}),pagamentoController.pagar);

// ADMIN
router.put("/:id", auth.required, LojaValidation.admin, validate(PagamentoValidation.update, {}, {}),pagamentoController.update);

module.exports = router;