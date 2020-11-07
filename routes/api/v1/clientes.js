const router = require("express").Router();
const ClienteController = require("../../../controllers/ClienteController");
const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const auth = require("../../auth");

const { validate } = require('express-validation');
const ClienteValidation = require("../../../controllers/validacoes/clienteValidation");

const clienteController = new ClienteController();

// ADMIN
router.get("/", auth.required, LojaValidation.admin, validate(ClienteValidation.index,{},{}), clienteController.index); // testado
router.get("/search/:search/pedidos", auth.required, LojaValidation.admin, validate(ClienteValidation.searchPedidos,{},{}),clienteController.searchPedidos); // testado 
router.get("/search/:search", auth.required, LojaValidation.admin, validate(ClienteValidation.search,{},{}) ,clienteController.search); // testado
router.get("/admin/:id", auth.required, LojaValidation.admin, validate(ClienteValidation.showAdmin,{},{}) ,clienteController.showAdmin); // testado
router.get("/admin/:id/pedidos", auth.required, LojaValidation.admin, validate(ClienteValidation.showPedidosCliente,{},{}),clienteController.showPedidosCliente); // testado

router.put("/admin/:id", auth.required, LojaValidation.admin, validate(ClienteValidation.updateAdmin,{},{}) ,clienteController.updateAdmin); // testado

router.delete("/admin/:id", auth.required, LojaValidation.admin, clienteController.removeAdmin);

// CLIENTE

router.get("/:id", auth.required, validate(ClienteValidation.show,{},{}) ,clienteController.show); // testado
router.post("/", validate(ClienteValidation.store,{},{}) ,clienteController.store); // testado
router.put("/:id", auth.required ,validate(ClienteValidation.update,{},{}), clienteController.update); // testado
router.delete("/:id", auth.required, clienteController.remove); // testado

module.exports = router;