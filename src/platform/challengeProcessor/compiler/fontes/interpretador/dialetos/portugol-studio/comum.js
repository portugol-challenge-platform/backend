"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitarExpressaoLeiaComum = void 0;
const declaracoes_1 = require("../../../declaracoes");
/**
 * Execução da leitura de valores da entrada configurada no
 * início da aplicação.
 * @param expressao Expressão do tipo Leia
 * @returns Promise com o resultado da leitura.
 */
async function visitarExpressaoLeiaComum(interfaceEntradaSaida, pilhaEscoposExecucao, expressao) {
    const mensagem = '> ';
    for (let argumento of expressao.argumentos) {
        const promessaLeitura = () => new Promise((resolucao) => interfaceEntradaSaida.question(mensagem, (resposta) => {
            resolucao(resposta);
        }));
        const valorLido = await promessaLeitura();
        const simbolo = argumento instanceof declaracoes_1.Expressao
            ? argumento.expressao.simbolo
            : argumento.simbolo;
        pilhaEscoposExecucao.definirVariavel(simbolo.lexema, valorLido);
    }
}
exports.visitarExpressaoLeiaComum = visitarExpressaoLeiaComum;
//# sourceMappingURL=comum.js.map