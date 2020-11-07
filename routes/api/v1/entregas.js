const router = require("express").Router();

const EntregaController = require("../../../controllers/EntregaController");

const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");

const { validate } = require('express-validation');
const { EntregaValidation } = require("../../../controllers/validacoes/entregaValidation");

const entregaController = new EntregaController();

router.get("/:id", auth.required, validate(EntregaValidation.show,{},{}),entregaController.show);
router.put("/:id", auth.required, LojaValidation.admin, validate(EntregaValidation.update,{},{}),entregaController.update);
router.post("/calcular", validate(EntregaValidation.calcular,{},{}),entregaController.calcular);

module.exports = router;