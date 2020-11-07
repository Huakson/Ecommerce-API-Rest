const router = require("express").Router();

const PedidoController = require("../../../controllers/PedidoController");

const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");

const { validate } = require('express-validation');
const PedidoValidation = require("../../../controllers/validacoes/pedidoValidation");


const pedidoController = new PedidoController();

// ADMIN

router.get("/admin", auth.required, LojaValidation.admin, validate(PedidoValidation.indexAdmin, {}, {}), pedidoController.indexAdmin); // testado
router.get("/admin/:id", auth.required, LojaValidation.admin, validate(PedidoValidation.showAdmin, {}, {}), pedidoController.showAdmin); // testado

router.delete("/admin/:id", auth.required, LojaValidation.admin, validate(PedidoValidation.removeAdmin, {}, {}), pedidoController.removeAdmin); //testado

// -- carrinho
router.get("/admin/:id/carrinho", auth.required, LojaValidation.admin, validate(PedidoValidation.showCarrinhoPedidoAdmin, {}, {}), pedidoController.showCarrinhoPedidoAdmin); // testado

// -- pagamento

// CLIENTE
router.get("/", auth.required, validate(PedidoValidation.index, {}, {}), pedidoController.index); // testado
router.get("/:id", auth.required, validate(PedidoValidation.show, {}, {}), pedidoController.show); // testado

router.post("/", auth.required, validate(PedidoValidation.store, {}, {}), pedidoController.store); // testado
router.delete("/:id", auth.required, validate(PedidoValidation.remove, {}, {}), pedidoController.remove); // testado

// -- carrinho
router.get("/:id/carrinho", auth.required, validate(PedidoValidation.showCarrinhoPedido, {}, {}), pedidoController.showCarrinhoPedido); // testado


// -- pagamento


module.exports = router;