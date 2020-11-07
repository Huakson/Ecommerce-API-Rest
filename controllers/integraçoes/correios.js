
const config = require("../../config/correios"),
    { calcBox } = require("../../helpers/calcBox");

const { calcularPrecoPrazo } = require("correios-brasil");

const calcularFrete = async ({ cep, produtos }) => {

    const _produtos = produtos.map(item => ({
        pesoKg: item.variacao.entrega.pesoKg,
        profundidadeCm: item.variacao.entrega.dimensoes.profundidadeCm,
        alturaCm: item.variacao.entrega.dimensoes.alturaCm,
        larguraCm: item.variacao.entrega.dimensoes.larguraCm,
        quantidade: item.quantidade,
        preco: item.precoUnitario
    }));

    const caixa = calcBox(_produtos);
    const pesoTotal = _produtos.reduce((all, item) => all + (item.pesoKg * item.quantidade), 0);
    const valorFinal = _produtos.reduce((all, item) => all + (item.preco * item.quantidade), 0);

    try {
        const resultados = await Promise.all(
            config.nCdServico.split(',').map(async (servico) => {

                let args = {
                    nCdServico: servico,
                    sCepOrigem: config.sCepOrigem,
                    sCepDestino: cep,
                    nVlPeso: pesoTotal,
                    nCdFormato: 1,
                    nVlComprimento: caixa.comprimento,
                    nVlAltura: caixa.altura,
                    nVlLargura: caixa.largura,
                    nVlDiamentro: 0,
                    nVlValorDeclarado: valorFinal < 20.5 ? 20.5 : valorFinal
                }

                const resultado = await calcularPrecoPrazo(args);
                return { ...resultado };
            })
        );
        return resultados;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { calcularFrete };