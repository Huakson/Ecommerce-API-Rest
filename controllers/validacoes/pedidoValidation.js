const { Joi } = require('express-validation');
const Date = require('@hapi/joi-date');
const JoiDate = Joi.extend(Date);

const PedidoValidation = {
    indexAdmin: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required(),
            limit: Joi.number().required(),
            offset: Joi.number().required(),
        }),
    },

    showAdmin: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required(),
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required(),
        })
    },

    removeAdmin: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required(),
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required(),
        })
    },

    showCarrinhoPedidoAdmin: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required(),
        }),
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required(),
        })
    },

    index: {
        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required(),
            limit: Joi.number().required(),
            offset: Joi.number().required(),
        }),
    },

    show: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required(),
        })
    },

    remove: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required(),
        })
    },

    showCarrinhoPedido: {
        params: Joi.object({
            id: Joi.string().alphanum().length(24).required(),
        })
    },

    store: {

        query: Joi.object({
            loja: Joi.string().alphanum().length(24).required(),
        }),
        body: Joi.object({
            carrinho: Joi.array().items(Joi.object({
                produto: Joi.string().alphanum().length(24).required(),
                variacao: Joi.string().alphanum().length(24).required(),
                precoUnitario: Joi.number().required(),
                quantidade: Joi.number().required()
            })).required(),
            pagamento: Joi.object({
                valor: Joi.number().required(),
                forma: Joi.string().required(),
                parcelas: Joi.number().optional(),
                enderecoEntregaIgualCobranca: Joi.boolean().required(),
                endereco: Joi.object({
                    local: Joi.string().required(),
                    numero: Joi.string().required(),
                    complemento: Joi.string().optional(),
                    bairro: Joi.string().required(),
                    cidade: Joi.string().required(),
                    estado: Joi.string().required(),
                    CEP: Joi.string().required(),
                }).required(),
                cartao: Joi.object({
                    nomeCompleto: Joi.string().required(),
                    codigoArea: Joi.string().required(),
                    telefone: Joi.string().required(),
                    dataDeNascimento: JoiDate.date().format("DD/MM/YYYY").raw().required(),
                    credit_card_token: Joi.string().required(),
                    cpf: Joi.string().required(),
                }).optional()
            }).required(),
            entrega: Joi.object({
                custo: Joi.number().required(),
                tipo: Joi.string().required(),
                prazo: Joi.number().required(),
                endereco: Joi.object({
                    local: Joi.string().required(),
                    numero: Joi.string().required(),
                    complemento: Joi.string().optional(),
                    bairro: Joi.string().required(),
                    cidade: Joi.string().required(),
                    estado: Joi.string().required(),
                    CEP: Joi.string().required(),
                }).required()
            }).required(),

        })
    }

};

module.exports = PedidoValidation;
