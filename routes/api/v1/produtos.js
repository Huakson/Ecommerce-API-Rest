const router = require("express").Router();
const ProdutoController = require("../../../controllers/ProdutoController");
const auth = require("../../auth");
const upload = require("../../../config/multer");

const { validate } = require('express-validation');
const LojaValidation = require("../../../controllers/validacoes/lojaValidation");
const ProdutoValidation = require("../../../controllers/validacoes/produtoValidation");


const produtoController = new ProdutoController();

// ADMIN

router.post("/", auth.required, LojaValidation.admin, validate(ProdutoValidation.store, {}, {}), produtoController.store); // testado
router.put("/:id", auth.required, LojaValidation.admin, validate(ProdutoValidation.update, {}, {}), produtoController.update); // testado
router.put("/images/:id", auth.required, LojaValidation.admin, validate(ProdutoValidation.updateImages, {}, {}), upload.array("files", 4), produtoController.updateImages); // testado
router.delete("/:id", auth.required, LojaValidation.admin, validate(ProdutoValidation.remove, {}, {}), produtoController.remove); // testado

// CLIENTE/VISITANTES

router.get("/", validate(ProdutoValidation.index, {}, {}), produtoController.index); // testado 
router.get("/disponiveis", validate(ProdutoValidation.indexDisponiveis, {}, {}), produtoController.indexDisponiveis); // testado
router.get("/search/:search", validate(ProdutoValidation.search, {}, {}), produtoController.search); // testado
router.get("/:id", validate(ProdutoValidation.show, {}, {}), produtoController.show); // testado

// VARIACOES
router.get("/:id/variacoes",  validate(ProdutoValidation.showVariacoes, {}, {}) ,produtoController.showVariacoes);  // testado

// AVALIACOES
router.get("/:id/avaliacoes",  validate(ProdutoValidation.showAvaliacoes, {}, {}) ,produtoController.showAvaliacoes); // testado

module.exports = router; 