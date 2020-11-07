const { Joi } = require('express-validation');

const CategoriaValidation = {

    index: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        })
    },

    indexDisponiveis: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        })
    },

    show: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },

    store: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            nome: Joi.string().required(),
            codigo: Joi.string().required()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            nome: Joi.string().optional(),
            codigo: Joi.string().optional(),
            disponibilidade: Joi.boolean().optional(),
            produtos: Joi.array().items(Joi.string().alphanum().length(24).optional())
        })
    },

    remove: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },

    showProdutos: {
        query: Joi.object({
            limit: Joi.number().optional(),
            offset: Joi.number().optional(),
            loja: Joi.string().alphanum().length(24).required()

        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        })
    },

    updateProdutos: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required()
        }),
        body: Joi.object({
            produtos: Joi.array().items(Joi.string().alphanum().length(24).optional()).optional() 
        })
    }
};
module.exports = CategoriaValidation; 