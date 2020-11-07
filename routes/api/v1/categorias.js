const router = require("express").Router();
const CategoriaController = require("../../../controllers/CategoriaController");

const auth = require("../../auth");

const { validate } = require('express-validation');
const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const CategoriaValidation = require("../../../controllers/validacoes/categoriaValidation");

const categoriaController = new CategoriaController();

router.get("/", validate(CategoriaValidation.index, {}, {}), categoriaController.index); // testado
router.get("/disponiveis", validate(CategoriaValidation.indexDisponiveis, {}, {}), categoriaController.indexDisponiveis); // testado
router.get("/:id", validate(CategoriaValidation.show, {}, {}), categoriaController.show); // testado

router.post("/", auth.required, LojaValidation.admin, validate(CategoriaValidation.store, {}, {}), categoriaController.store); // testado
router.put("/:id", auth.required, LojaValidation.admin, validate(CategoriaValidation.update, {}, {}), categoriaController.update); // testado
router.delete("/:id", auth.required, LojaValidation.admin, validate(CategoriaValidation.remove, {}, {}), categoriaController.remove);

// Rotas ao produto
router.get("/:id/produtos", validate(CategoriaValidation.showProdutos, {}, {}), categoriaController.showProdutos); // testado
router.put("/:id/produtos", auth.required, LojaValidation.admin, validate(CategoriaValidation.updateProdutos, {}, {}), categoriaController.updateProdutos); // testado

module.exports = router;